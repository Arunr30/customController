import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/locationModel';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = "/api/devum/practice/getLocationDetails"

  constructor(private http : HttpClient) {}

  getLocation(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl)

  }
}
