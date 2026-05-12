import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = "/api/devum/practice/getLocationDetails"

  constructor(private http : HttpClient) {}

  getLocation() {
    return this.http.get(this.apiUrl)

  }
}
