import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../+shared/shared.module';
import { ListComponent } from './containers/list/list.component';
import { CategoryComponent } from './containers/category/category.component';
import { TransactionRoutingModule } from './transaction-routes.modules';

@NgModule({
  declarations: [ListComponent, CategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    TransactionRoutingModule,
  ]
})
export class TransactionModule { }
