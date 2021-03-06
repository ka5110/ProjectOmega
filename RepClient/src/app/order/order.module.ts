import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
    SharedModule,
    MatListModule
  ],
  declarations: [OrderPage]
})
export class OrderPageModule {}
