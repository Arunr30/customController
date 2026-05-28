import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
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
  allLocations: Location[] = [];
  @Input() isDragging = false;
  constructor(private locationService: LocationService) {}
  
  ngOnInit(): void {
    this.loadInitialData();
  }
  loadInitialData(): void {
    this.locations$ = this.locationService.getLocation().pipe(
      map((res: Location[]) => {
        const mappedLocations = res.map((loc: Location) => {
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
          return {
            ...loc,
            assignedAssets,
          };
        });
        this.allLocations = mappedLocations;
        console.log('Stored Locations:', this.allLocations);
        return mappedLocations;
      }),
      shareReplay(1),
    );
  }
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  drop(event: DragEvent, location: Location): void {
    event.preventDefault();
    event.stopPropagation();
    const assetData = event.dataTransfer?.getData('application/drop-event-data');

    if (!assetData) {
      return;
    }

    console.log('Dragged Asset Data:', assetData);
    const parsedData = JSON.parse(assetData);
    const draggedItem = Array.isArray(parsedData) ? parsedData[0] : parsedData;
    const assetNameField = draggedItem.data?.find((x: any) => x.fieldName.includes('assetName'));

    const draggedAsset: Asset = {
      id: draggedItem.id,
      assetName: assetNameField?.value,
    };

    const alreadyAllocated = this.allLocations.some((loc: Location) =>
      (loc.assignedAssets || []).some(
        (a: Asset) => a.id === draggedAsset.id && loc.locationId !== location.locationId,
      ),
    );
    if (alreadyAllocated) {
      alert('Asset is already allocated to another location. Please remove it from there first.');
      return;
    }
    if (!(location.assignedAssets || []).some((a: Asset) => a.id === draggedAsset.id)) {
      // Local UI update first
      location.assignedAssets = [...(location.assignedAssets || []), draggedAsset];
      location.assignedAssets.sort((a: Asset, b: Asset) => a.assetName.localeCompare(b.assetName));
      // Backend payload
      const payload = {
        locationId: location.locationId,
        id: draggedAsset.id,
      };
      console.log('Map Payload:', payload);
      // API call
      this.locationService.mapAssetToLocation(payload).subscribe({
        next: (res) => {
          console.log('Asset mapped successfully', res);
        },
        error: (err) => {
          console.error('Mapping failed', err);
          // Rollback UI if API fails
          location.assignedAssets = location.assignedAssets.filter(
            (a: Asset) => a.id !== draggedAsset.id,
          );
        },
      });
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
