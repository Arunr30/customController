import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
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
    private locationService: LocationService,
    private assetService: AssetService,
  ) {}
  ngOnInit(): void {
    this.loadInitialData();
  }
  loadInitialData(): void {
    forkJoin({
      locations: this.locationService.getLocation(),
      assets: this.assetService.getAssetsList(),
    }).subscribe((res: { locations: Location[]; assets: Asset[] }) => {
      this.assets = res.assets;
      this.locations = res.locations.map((loc: Location) => {
        const assignedAssets: Asset[] = [];
        if (loc.mapAsset) {
          const ids = loc.mapAsset.split(',').map((id: string) => id.trim());

          ids.forEach((id: string) => {
            const matchedAsset = this.assets.find((asset: Asset) => asset.id === id);
            if (matchedAsset) {
              assignedAssets.push(matchedAsset);
            }
          });
        }
        assignedAssets.sort((a: Asset, b: Asset) => a.assetName.localeCompare(b.assetName));
        return { ...loc, assignedAssets };
      });
    });
  }
  drop(event: CdkDragDrop<Asset[]>, location: Location): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      return;
    }
    const draggedAsset: Asset = event.item.data;
    const alreadyAllocated = this.locations.some((loc: Location) =>
      loc.assignedAssets?.some((asset: Asset) => asset.id === draggedAsset.id),
    );
    if (alreadyAllocated) {
      return;
    }
    const copiedAsset: Asset = event.previousContainer.data[event.previousIndex];
    location.assignedAssets = [...(location.assignedAssets || []), copiedAsset];
    location.assignedAssets.sort((a: Asset, b: Asset) => a.assetName.localeCompare(b.assetName));
    const payload = {
      locationId: location.locationId,
      id: draggedAsset.id,
    };
    this.locationService.mapAssetToLocation(payload).subscribe({
      error: () => {
        location.assignedAssets = location.assignedAssets.filter(
          (a: Asset) => a.id !== copiedAsset.id,
        );
      },
    });
  }
  removeAsset(location: Location, asset: Asset): void {
    location.assignedAssets = location.assignedAssets.filter((a: Asset) => a.id !== asset.id);
    const payload = {
      locationId: location.locationId,
      id: asset.id,
    };
    this.locationService.removeAssetFromLocation(payload).subscribe({
      error: () => {
        location.assignedAssets = [...location.assignedAssets, asset];
        location.assignedAssets.sort((a: Asset, b: Asset) =>
          a.assetName.localeCompare(b.assetName),
        );
      },
    });
  }
}
