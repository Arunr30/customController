import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';

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

  assets$!: Observable<Asset[]>;

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {

    console.log('ASSET COMPONENT INIT');

    this.assets$ = this.assetService.getAssetsList();

    this.assets$.subscribe((res) => {

      console.log('ASSET RESPONSE:', res);

    });
  }
}