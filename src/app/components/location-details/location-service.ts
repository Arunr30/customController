import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../../models/locationModel';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = '/api/devum/practice/getLocationDetails';

  private mapApi = '/api/devum/practice/mapAssestsToLocation';

  private removeAssetApi = 'api/devum/practice/deleteAssetsService';

  constructor(private http: HttpClient) {}

  // GET LOCATIONS

  getLocation(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);
  }

  // SAVE ASSET TO LOCATION

  mapAssetToLocation(payload: any): Observable<any> {
    return this.http.post(this.mapApi, payload);
  }

  removeAssetFromLocation(payload: any): Observable<any> {
    return this.http.post(this.removeAssetApi, payload);
  }
}
