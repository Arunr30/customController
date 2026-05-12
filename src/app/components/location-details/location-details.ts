import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, copyArrayItem } from '@angular/cdk/drag-drop';
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
      const localData = saved ? JSON.parse(saved) : null;
 
      this.locations = res.locations.map((loc: any) => {
 
        let assignedAssets: any[] = [];
        const storedLoc = localData?.find((l: any) => l.locationId === loc.locationId);
 
        if (storedLoc?.assignedAssets) {
          assignedAssets = storedLoc.assignedAssets;
        }
        else if (loc.mapAsset) {
 
          const ids = loc.mapAsset.split(',');
 
          ids.forEach((id: string) => {
            const matchedAsset = this.assets.find((asset: any) => asset.id === id);
 
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
 
  drop(
    event: CdkDragDrop<any[]>,
    location: any,
  ) {
    if (event.previousContainer !== event.container) {

      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const draggedAsset = event.previousContainer.data[event.previousIndex];
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
        },
      });
    }
  }
}
 