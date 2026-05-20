import { Component, signal } from '@angular/core';
import { AssetList } from "./components/asset-list/asset-list";
import { LocationDetails } from './components/location-details/location-details';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {ExternalCoreHelper} from "dist-controller"

@Component({
  selector: 'app-root',
  imports: [AssetList, LocationDetails, DragDropModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
 
}