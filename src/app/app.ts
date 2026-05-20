import { Component, inject, Injector, Input, Output } from '@angular/core';
import { AssetList } from './components/asset-list/asset-list';
import { LocationDetails } from './components/location-details/location-details';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ExternalCoreHelper, ExternalCoreSimpleControl } from 'dist-controller';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AssetList, LocationDetails, DragDropModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements ExternalCoreSimpleControl {
  private injector = inject(Injector);

  private externalHelper = new ExternalCoreHelper(this.injector);

  constructor() {
    console.log('APP COMPONENT CREATED');
  }

  @Input()
  setControlInstance = (instance: any) => {
    console.log('SET CONTROL INSTANCE');
    console.log(instance);
  };

  @Input()
  applyPropertyDefinitions = (properties: any) => {
    console.log('PROPERTY DEFINITIONS');

    console.log(properties);
  };

  @Input()
  applyConfigurationAttributes = (attributes: any) => {
    console.log('CONFIG ATTRIBUTES');

    console.log(attributes);
  };

  @Input()
  onDatasourceResolved = (datasource: any) => {
    console.log('DATASOURCE');

    console.log(datasource);
  };

  @Output()
  onEventDataMapperResolved = (eventDataMapper: any) => {
    console.log('EVENT DATA MAPPER');
  }
}
