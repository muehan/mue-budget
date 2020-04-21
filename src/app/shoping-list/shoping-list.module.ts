import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopingListRoutingModule } from './shoping-list-routing.module';
import { ListComponent } from './containers/list/list.component';

@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    ShopingListRoutingModule,
  ]
})
export class ShopingListModule { }
