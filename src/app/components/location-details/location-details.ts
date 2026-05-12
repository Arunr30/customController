import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CdkDragDrop,
  DragDropModule,
  transferArrayItem
} from '@angular/cdk/drag-drop';

import { LocationService } from '../../services/location-service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-location-details',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './location-details.html',
  styleUrls: ['./location-details.css'],
})
export class LocationDetails {

  locations$;


  locationIds: string[] = [];

  constructor(private locationService: LocationService) {

    this.locations$ = this.locationService.getLocation().pipe(
      map((res: any[]) => {

        const mapped = res.map(loc => ({
          ...loc,
          assignedAssets: loc.assignedAssets ?? []
        }));

     
        this.locationIds = mapped.map(l => l.locationId);

        return mapped;
      })
    );
  }

  drop(event: CdkDragDrop<any[]>) {

    if (event.previousContainer === event.container) return;

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}