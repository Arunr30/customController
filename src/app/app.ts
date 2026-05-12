import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AssetList } from "./components/asset-list/asset-list";
import { LocationDetails } from './components/location-details/location-details';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  imports: [AssetList, LocationDetails, DragDropModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('customController');
}
