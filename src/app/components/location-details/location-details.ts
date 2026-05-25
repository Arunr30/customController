import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Asset } from '../../models/asset';
import { Location } from '../../models/locationModel';
import { LocationService } from './location-service';

@Component({
  selector: 'app-location-details',
  imports: [CommonModule],
  templateUrl: './location-details.html',
  styleUrls: ['./location-details.css'],
})
export class LocationDetails implements OnInit {
  locations$!: Observable<Location[]>;
  @Input() isDragging = false;
  constructor(private locationService: LocationService) {}
  ngOnInit(): void {
    this.loadInitialData();
  }
  loadInitialData(): void {
    this.locations$ = this.locationService.getLocation().pipe(
      map((res: Location[]) => {
        console.log('Locations:', res);
        return res.map((loc: Location) => {
          const assignedAssets: Asset[] = [];
          if (loc.mapAsset) {
            const ids = loc.mapAsset.split(',').map((id: string) => id.trim());
            assignedAssets.push(
              ...ids.map(
                (id: string) =>
                  ({
                    id,
                    assetName: id,
                  }) as Asset,
              ),
            );
          }
          assignedAssets.sort((a: Asset, b: Asset) => a.assetName.localeCompare(b.assetName));
          return { ...loc, assignedAssets };
        });
      }),
      shareReplay(1),
    );
  }
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  drop(event: DragEvent, location: Location): void {
    event.preventDefault();
    event.stopPropagation();

    if (!event.dataTransfer) {
      return;
    }

    let draggedAsset: Asset | null = null;
    const assetData = event.dataTransfer.getData('application/drop-event-data');

    if (assetData) {
      console.log('Dragged Asset Data:', assetData);
      draggedAsset = JSON.parse(assetData);
    }

    if (!draggedAsset) {
      return;
    }

    // Add to target location
    if (!location.assignedAssets.some((a: Asset) => a.id === draggedAsset!.id)) {
      location.assignedAssets = [...(location.assignedAssets || []), draggedAsset];
      location.assignedAssets.sort((a: Asset, b: Asset) => a.assetName.localeCompare(b.assetName));
    }

    console.log('Asset dropped:', draggedAsset, 'Location:', location);
  }

  onDragStart(event: DragEvent, item: any): void {
    this.isDragging = true;
    const mapperPayload = {
      value: {
        id: null,
        dsName: null,
        data: [
          {
            fieldName: 'is_drag_active',
            originalValue: true,
            value: true,
            uom: {},
            referenceData: {},
          },
        ],
        fks: [],
        isWsResult: false,
        _isDirectValue: false,
        dataStateType: 'INSERT',
      },
    };

    console.log('onEventDataMapperResolved dragstart', mapperPayload);
    event.dataTransfer?.setData(
      'application/drop-event-data',
      JSON.stringify({
        id: item.id,
        assetName: item.label,
      }),
    );

    event.dataTransfer!.effectAllowed = 'move';
  }

  onDragEnd(): void {
    this.isDragging = false;
    const mapperPayload = {
      value: {
        data: [
          {
            fieldName: 'is_drag_active',
            originalValue: false,
            value: false,
            uom: {},
            referenceData: {},
          },
        ],
      },
    };

    console.log('onEventDataMapperResolved dragend', mapperPayload);
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
