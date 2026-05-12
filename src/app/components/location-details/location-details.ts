import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CdkDragDrop, DragDropModule, copyArrayItem } from '@angular/cdk/drag-drop';

import { LocationService } from '../../services/location-service';

@Component({
  selector: 'app-location-details',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './location-details.html',
  styleUrl: './location-details.css',
})
export class LocationDetails implements OnInit {
  locations: any[] = [];

  constructor(
    private location: LocationService,
    // private cdr: ChangeDetectorRef,
  ) {}

 ngOnInit(): void {
  const saved = localStorage.getItem('locations');

  if (saved) {
    this.locations = JSON.parse(saved);
  } else {
    this.location.getLocation().subscribe((res: any) => {
      this.locations = res.map((loc: any) => ({
        ...loc,
        assignedAssets: [],
      }));
    });
  }
}

  // DRAG DROP
drop(event: CdkDragDrop<any[]>, location: any) {
  if (event.previousContainer !== event.container) {
    const asset = event.previousContainer.data[event.previousIndex];

    // prevent undefined array crash
    if (!location.assignedAssets) {
      location.assignedAssets = [];
    }

    // add asset
    location.assignedAssets.push(asset);
    localStorage.setItem('locations', JSON.stringify(this.locations));
  }
}

//   saveToStorage() {
//   localStorage.setItem('locations', JSON.stringify(this.locations));
// }
}
