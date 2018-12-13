import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../+shared/shared.module';
import { ListComponent } from './containers/list/list.component';
import { CategoryComponent } from './containers/category/category.component';
import { TransactionRoutingModule } from './transaction-routes.modules';
import { AddCategoryComponent } from './dialogs/add-category/add-category.component';
import { EditCategoryComponent } from './dialogs/edit-category/edit-category.component';

@NgModule({
  declarations: [
    ListComponent,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TransactionRoutingModule,
  ],
  entryComponents: [
    AddCategoryComponent,
    EditCategoryComponent,
  ]
})
export class TransactionModule { }
