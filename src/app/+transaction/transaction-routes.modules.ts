import { ListComponent } from './containers/list/list.component';
import { CategoryComponent } from './containers/category/category.component';
import { Routes, RouterModule } from '@angular/router';
import { SiteTemplateComponent } from '../template/site-template/site-template.component';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { SubcategoryComponent } from './containers/subcategory/subcategory.component';

const routes: Routes = [
    {
        path: '',
        component: SiteTemplateComponent,
        children: [
            { path: 'list', component: ListComponent },
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