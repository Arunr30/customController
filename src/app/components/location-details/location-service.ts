import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../../models/locationModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = `${environment.apiUrl}/devum/theraphy/getLocationDetails`;
  private mapApi = `${environment.apiUrl}/devum/theraphy/MapAssetToLocation`;
  private removeAssetApi = `${environment.apiUrl}/devum/theraphy/deleteAssetsService`;
  
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
