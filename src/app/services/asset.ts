import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from '../models/asset';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssetService {

  private apiUrl =
    `${environment.apiUrl}/devum/demo/getAssestsDetails`;

  constructor(private http: HttpClient) {

    console.log('Asset API:', this.apiUrl);
  }

  getAssetsList(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiUrl);
  }
}