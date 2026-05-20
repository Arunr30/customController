import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../../models/locationModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = `${environment.apiUrl}/devum/demo/getLocationDetails`;

  private mapApi = `${environment.apiUrl}/devum/demo/mapAssestsToLocation`;

  private removeAssetApi = `${environment.apiUrl}/devum/demo/deleteAssetsService`;

  constructor(private http: HttpClient) {}

  getLocation(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);
  }

  mapAssetToLocation(payload: any): Observable<any> {
    return this.http.post(this.mapApi, payload);
  }

  removeAssetFromLocation(payload: any): Observable<any> {
    return this.http.post(this.removeAssetApi, payload);
  }
}
