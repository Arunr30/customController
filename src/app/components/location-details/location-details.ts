import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CdkDragDrop,
  DragDropModule,
  transferArrayItem
} from '@angular/cdk/drag-drop';

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

  constructor(private location: LocationService) {}

  ngOnInit(): void {

    this.location.getLocation().subscribe((res: any) => {

      this.locations = res.map((loc: any) => ({
        ...loc,
        assignedAssets: []
      }));

    });

  }

  drop(event: CdkDragDrop<any[]>) {

    if (event.previousContainer !== event.container) {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

    }

  }

}