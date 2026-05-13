import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { forkJoin } from 'rxjs';

import { LocationService } from '../../services/location-service';
import { AssetService } from '../../services/asset';

@Component({
  selector: 'app-location-details',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './location-details.html',
  styleUrl: './location-details.css',
})
export class LocationDetails implements OnInit {
  locations: any[] = [];
  assets: any[] = [];

  constructor(
    private location: LocationService,
    private assetService: AssetService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
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
        } else if (loc.mapAsset) {
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
      console.log('ASSET ALREADY EXISTS IN THIS LOCATION');

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
}
