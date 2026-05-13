import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { forkJoin } from 'rxjs';

import { LocationService } from './location-service';
import { AssetService } from '../../services/asset';
import { Location } from '../../models/locationModel';
import { Asset } from '../../models/asset';

@Component({
  selector: 'app-location-details',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './location-details.html',
  styleUrl: './location-details.css',
})
export class LocationDetails implements OnInit {
  locations: Location[] = [];
  assets: Asset[] = [];

  constructor(
    private location: LocationService,
    private assetService: AssetService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  public loadInitialData() {
    forkJoin({
      locations: this.location.getLocation(),
      assets: this.assetService.getAssetsList(),
    }).subscribe((res: any) => {
      this.assets = res.assets;
      const saved = localStorage.getItem('locations');
      const localData = saved ? JSON.parse(saved) : [];
      this.locations = res.locations.map((loc: any) => {
        let assignedAssets: any[] = [];
        const storedLoc = localData.find((l: any) => l.locationId === loc.locationId);
        if (storedLoc?.assignedAssets?.length) {
          assignedAssets = storedLoc.assignedAssets;
        }
        else if (loc.mapAsset) {
          const ids = loc.mapAsset.split(',').map((id: string) => id.trim());
          ids.forEach((id: string) => {
            const matchedAsset = this.assets.find((asset: any) => asset.id.toString() === id);
            if (matchedAsset) {
              assignedAssets.push(matchedAsset);
            }
          });
        }
        return {
          ...loc,
          assignedAssets,
        };
      });
      this.cdr.detectChanges();
    });  
  }

  drop(event: CdkDragDrop<any[]>, location: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      localStorage.setItem('locations', JSON.stringify(this.locations));
      return;
    }
    const draggedAsset = event.item.data;
    const alreadyExists = location.assignedAssets.some(
      (asset: any) => asset.id === draggedAsset.id,
    );

    if (alreadyExists) {
      return;
    }
    copyArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );

    const payload = {
      locationId: location.locationId,
      assetId: draggedAsset.id,
    };

    this.location.mapAssetToLocation(payload).subscribe({
      next: (res: any) => {
        console.log('MAPPED SUCCESS', res);

        localStorage.setItem('locations', JSON.stringify(this.locations));
      },

      error: (err) => {
        console.log('API ERROR', err);
        location.assignedAssets.splice(event.currentIndex, 1);
      },
    });
  }

  // UNMAP ASSET FROM LOCATION
  removeAsset(location: any, asset: any) {
    const backup = [...location.assignedAssets];
    location.assignedAssets = location.assignedAssets.filter((a: any) => a.id !== asset.id);
    localStorage.setItem('locations', JSON.stringify(this.locations));
    const payload = {
      locationId: location.locationId,
      assetId: asset.id,
    };
    this.location.removeAssetFromLocation(payload).subscribe({
      next: (res: any) => {
        console.log('DELETE SUCCESS', res);
      },

      error: (err) => {
        console.log('DELETE ERROR', err);
        location.assignedAssets = backup;
      },
    });
  }

  ngOnDestroy() {
    localStorage.removeItem('locations');
  }
}
