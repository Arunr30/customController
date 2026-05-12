import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AssetService {

  private apiUrl = "/api/devum/practice/getAssestsDetails"

  constructor(private http: HttpClient) { }

  getAssetsList() {
    return this.http.get(this.apiUrl);
  }

}