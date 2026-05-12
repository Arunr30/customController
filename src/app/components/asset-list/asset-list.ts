import { Component, OnInit } from '@angular/core';
import { Asset } from '../../models/asset';
import { AssetService } from '../../services/asset';

@Component({
  selector: 'app-asset-list',
  imports: [],
  templateUrl: './asset-list.html',
  styleUrl: './asset-list.css',
})
export class AssetList implements OnInit{
  assets: Asset[] = []

  constructor(private assetList: AssetService){}

  ngOnInit(): void {
    this.getAssets()
  }

  getAssets() {
    this.assetList.getAssetsList().subscribe((res: any) => {
      console.log(res);
      
      this.assets = res
    })
  }
}
