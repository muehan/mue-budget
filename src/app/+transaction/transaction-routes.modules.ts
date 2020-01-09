import { TransactionsComponent } from './containers/transactions/transactions.component';
import { CategoryComponent } from './containers/category/category.component';
import { Routes, RouterModule } from '@angular/router';
import { SiteTemplateComponent } from '../+shared/containers/site-template/site-template.component';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { SubcategoryComponent } from './containers/subcategory/subcategory.component';

const routes: Routes = [
    {
        path: 'transaction',
        component: SiteTemplateComponent,
        children: [
            { path: 'list', component: TransactionsComponent },
            { path: 'category', component: CategoryComponent },
            { path: 'subcategory', component: SubcategoryComponent },
        ],
        canActivate: [AuthGuardService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionRoutingModule { }