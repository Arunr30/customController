import { Component, inject, Injector, Input } from '@angular/core';
import { AssetList } from './components/asset-list/asset-list';
import { LocationDetails } from './components/location-details/location-details';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DsResult, ExternalCoreHelper, ExternalCoreSimpleControl, RtOption, } from 'dist-controller';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AssetList, LocationDetails, DragDropModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements ExternalCoreSimpleControl {
  containerHeight = '300px';
  title = 'DEFAULT DEVUM';
  titlePropertyName = '';

  private injector = inject(Injector);
  private externalHelper = new ExternalCoreHelper(this.injector);
  constructor() {
    console.log('APP COMPONENT CREATED');
  }
  @Input()
  setControlInstance = (instance: any) => {
    console.log('SET CONTROL INSTANCE');
    console.log(instance);
    console.log(this.externalHelper.getAppCode);
  };


@Input()
applyPropertyDefinitions = (properties: any) => {

  console.log('PROPERTY DEFINITIONS');

  console.log(properties);

  const titleProperty = properties.find(
    (x:any) => x.controlAttributeName === 'title'
  );
  console.log(titleProperty);
  if(titleProperty){
     this.titlePropertyName = titleProperty.dsPropertyName;
  }
  console.log(this.titlePropertyName);
}
  
  
  @Input()
  applyConfigurationAttributes = (attributes: any) => {
    console.log('CONFIG ATTRIBUTES');
    console.log(attributes);
    const titleAttr = attributes?.find((x: any) => x.name === 'title');
    console.log(this.title);
    if (titleAttr) {
      this.title = titleAttr.value; 
      console.log('TITLE UPDATED');
      console.log(this.title);
    }
  };
  

  @Input()
  onDatasourceResolved = (datasource: any) => {
    console.log('DATASOURCE');
    console.log(datasource);
  };

  @Input()
  onEventDataMapperResolved(eventDataMapper: any, _data: RtOption<DsResult>): void {
    console.log('EVENT DATA MAPPER');
    console.log(eventDataMapper);
    console.log(_data);
  }
}
