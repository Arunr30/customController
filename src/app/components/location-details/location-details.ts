import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/locationModel';
import { LocationService } from '../../services/location-service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-details',
  imports: [CommonModule],
  templateUrl: './location-details.html',
  styleUrl: './location-details.css',
})
export class LocationDetails implements OnInit {
  location$!: Observable<Location[]>;

  constructor(private location : LocationService){}

  ngOnInit(): void {
    this.location$ = this.location.getLocation()
  }
}
