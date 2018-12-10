import { ListComponent } from './containers/list/list.component';
import { CategoryComponent } from './containers/category/category.component';
import { Routes, RouterModule } from '@angular/router';
import { SiteTemplateComponent } from '../template/site-template/site-template.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: SiteTemplateComponent,
        children: [
            { path: 'list', component: ListComponent },
            { path: 'category', component: CategoryComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionRoutingModule { }