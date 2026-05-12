import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Asset } from '../../models/asset';
import { AssetService } from '../../services/asset';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './asset-list.html',
  styleUrls: ['./asset-list.css'],
})
export class AssetList implements OnInit {
  assets: Asset[] = [];

  locationIds: string[] = [];

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {
    this.assetService.getAssetsList().subscribe((res) => {
      this.assets = res ?? [];
    });
  }

  drop(event: CdkDragDrop<Asset[]>) {
    moveItemInArray(this.assets, event.previousIndex, event.currentIndex);
  }

  trackByAsset(index: number, item: Asset) {
    return item.assestId;
  }
}
