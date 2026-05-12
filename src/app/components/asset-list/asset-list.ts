import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
 
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
 
  constructor(
    private assetList: AssetService,
    private cdr: ChangeDetectorRef
  ) {}
 
  ngOnInit(): void {
    this.assetList.getAssetsList().subscribe((res) => {
      this.assets = res;
 
      
      this.cdr.detectChanges();
    });
  }
}
 