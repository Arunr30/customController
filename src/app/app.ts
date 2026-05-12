import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AssetList } from "./components/asset-list/asset-list";

@Component({
  selector: 'app-root',
  imports: [AssetList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('customController');
}
