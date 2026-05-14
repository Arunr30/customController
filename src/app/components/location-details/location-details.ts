// location-details.ts

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
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

      this.locations = res.locations.map((loc: any) => {
        const assignedAssets: Asset[] = [];

        if (loc.mapAsset) {
          const ids = loc.mapAsset
            .split(',')
            .map((id: string) => id.trim());

          ids.forEach((id: string) => {
            const matchedAsset = this.assets.find(
              (asset: Asset) =>
                asset.assetId.toString() === id,
            );

            if (matchedAsset) {
              assignedAssets.push(matchedAsset);
            }
          });

          assignedAssets.sort((a: Asset, b: Asset) =>
            a.assetName.localeCompare(b.assetName),
          );
        }

        return {
          ...loc,
          assignedAssets,
        };
      });

      this.cdr.detectChanges();
    });
  }

  drop(event: CdkDragDrop<Asset[]>, location: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      return;
    }

    const draggedAsset: Asset = event.item.data;

    const alreadyExists = this.locations.some((loc: any) =>
      loc.assignedAssets?.some(
        (asset: Asset) =>
          asset.assetId === draggedAsset.assetId,
      ),
    );

    if (alreadyExists) {
      return;
    }

    const copiedAsset =
      event.previousContainer.data[event.previousIndex];

    event.container.data.push(copiedAsset);

    event.container.data.sort((a: Asset, b: Asset) =>
      a.assetName.localeCompare(b.assetName),
    );

    const payload = {
      locationId: location.locationId,
      assetId: draggedAsset.assetId,
    };

    this.location.mapAssetToLocation(payload).subscribe({
      next: (res: any) => {
        console.log('MAPPED SUCCESS', res);
      },

      error: (err: any) => {
        console.log('API ERROR', err);

        location.assignedAssets =
          location.assignedAssets.filter(
            (asset: Asset) =>
              asset.assetId !== draggedAsset.assetId,
          );
      },
    });
  }

  removeAsset(location: any, asset: Asset) {
    const backup = [...location.assignedAssets];

    location.assignedAssets =
      location.assignedAssets.filter(
        (a: Asset) =>
          a.assetId !== asset.assetId,
      );

    const payload = {
      locationId: location.locationId,
      assetId: asset.assetId,
    };

    this.location.removeAssetFromLocation(payload).subscribe({
      next: (res: any) => {
        console.log('DELETE SUCCESS', res);
      },

      error: (err: any) => {
        console.log('DELETE ERROR', err);

        location.assignedAssets = backup;
      },
    });
  }
}