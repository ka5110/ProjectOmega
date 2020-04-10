import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { IonicModule } from '@ionic/angular';
import { ListDisplayBottomSheetComponent } from './component/list-display-bottom-sheet/list-display-bottom-sheet.component';
import { ListLoaderComponent } from './component/list-loader/list-loader.component';

@NgModule({
  declarations: [
    ListLoaderComponent,
    ListDisplayBottomSheetComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MatBottomSheetModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    ListLoaderComponent,
    ListDisplayBottomSheetComponent,
    MatBottomSheetModule
  ],
  entryComponents: [
    ListDisplayBottomSheetComponent
  ]
})
export class SharedModule {
}
