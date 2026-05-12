import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Asset } from '../../models/asset';
import { AssetService } from '../../services/asset';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asset-list.html',
  styleUrls: ['./asset-list.css'],
})
export class AssetList implements OnInit {

  assets$!: Observable<Asset[]>;

  constructor(private assetList: AssetService) {}

  ngOnInit(): void {
    this.assets$ = this.assetList.getAssetsList();
  }
}