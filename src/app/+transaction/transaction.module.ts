import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../+shared/shared.module';
import { ListComponent } from './containers/list/list.component';
import { CategoryComponent } from './containers/category/category.component';
import { TransactionRoutingModule } from './transaction-routes.modules';
import { AddCategoryComponent } from './dialogs/add-category/add-category.component';
import { EditCategoryComponent } from './dialogs/edit-category/edit-category.component';
import { SubcategoryComponent } from './containers/subcategory/subcategory.component';
import { AddSubcategoryComponent } from './dialogs/add-subcategory/add-subcategory.component';
import { EditSubcategoryComponent } from './dialogs/edit-subcategory/edit-subcategory.component';

@NgModule({
  declarations: [
    ListComponent,
    CategoryComponent,
    SubcategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddSubcategoryComponent,
    EditSubcategoryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TransactionRoutingModule,
  ],
  entryComponents: [
    AddCategoryComponent,
    EditCategoryComponent,
    AddSubcategoryComponent,
    EditSubcategoryComponent,
  ]
})
export class TransactionModule { }
