import { ChangeDetectorRef, Component, inject, Injector, Input } from '@angular/core';
import { LocationDetails } from './components/location-details/location-details';
import { DsResult, ExternalCoreSimpleControl, RtOption } from 'dist-controller';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LocationDetails],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements ExternalCoreSimpleControl {
  isDragging = false;
  currentDraggedItem: any = null;
  title = 'DEVUM ITEM';
  private injector = inject(Injector);

  constructor(private cdr: ChangeDetectorRef) {
    console.log('APP COMPONENT CREATED');
  }
  onDragStart(event: DragEvent): void {
    const draggedItem = { id: 'TITLE_1', assetName: this.title };

    event.dataTransfer?.setData('application/drop-event-data', JSON.stringify(draggedItem));

    this.onEventDataMapperResolved(
      { value: { data: [{ fieldName: 'dragged_item', value: draggedItem }] } },
      {
        get: {
         
          data: [
            { fieldName: 'dragged_item', value: draggedItem },
            { fieldName: 'is_drag_active', value: true }, 
          ],
        },
      } as RtOption<DsResult>,
    );
  }

  onDragEnd(): void {
    this.onEventDataMapperResolved(
      { value: { data: [{ fieldName: 'is_drag_active', value: false }] } },
      {
        get: {
          data: [{ fieldName: 'is_drag_active', value: false }],
        },
      } as RtOption<DsResult>,
    );
  }

  @Input()
  onEventDataMapperResolved = (eventDataMapper: any, _data: RtOption<DsResult>) => {
    console.log('DEVUM EVENT:', eventDataMapper, _data);
    const dragState = _data.get?.data?.find((x: any) => x.fieldName === 'is_drag_active');
    this.isDragging = dragState?.value;
    console.log('isDragging updated:', this.isDragging);
    this.cdr.detectChanges();
  }

  @Input()
  setControlInstance = (instance: any) => {
    console.log('SET CONTROL INSTANCE', instance);
  };

  @Input()
  applyPropertyDefinitions = (_properties: any) => {};

  @Input()
  applyConfigurationAttributes = (_attributes: any) => {};

  @Input()
  onDatasourceResolved = (datasource: any) => {
    console.log('DATASOURCE', datasource);
  };
}
