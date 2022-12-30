import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../+shared/shared.module';
import { TransactionsComponent } from './containers/transactions/transactions.component';
import { CategoryComponent } from './containers/category/category.component';
import { TransactionRoutingModule } from './transaction-routes.modules';
import { AddCategoryComponent } from './dialogs/add-category/add-category.component';
import { EditCategoryComponent } from './dialogs/edit-category/edit-category.component';
import { SubcategoryComponent } from './containers/subcategory/subcategory.component';
import { AddSubcategoryComponent } from './dialogs/add-subcategory/add-subcategory.component';
import { EditSubcategoryComponent } from './dialogs/edit-subcategory/edit-subcategory.component';
import { AddTransactionComponent } from './dialogs/add-transaction/add-transaction.component';
import { EditTransactionComponent } from './dialogs/edit-transaction/edit-transaction.component';

@NgModule({
    declarations: [
        TransactionsComponent,
        CategoryComponent,
        SubcategoryComponent,
        AddCategoryComponent,
        EditCategoryComponent,
        AddSubcategoryComponent,
        EditSubcategoryComponent,
        AddTransactionComponent,
        EditTransactionComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        TransactionRoutingModule,
    ]
})
export class TransactionModule { }
