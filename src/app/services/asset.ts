import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from '../models/asset';

@Injectable({
  providedIn: 'root',
})
export class AssetService {

  private apiUrl = '/api/devum/practice/getAssestsDetails';

  constructor(private http: HttpClient) {}

  getAssetsList(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiUrl);
  }
}