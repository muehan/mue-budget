import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteTemplateComponent } from './containers/site-template/site-template.component';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'budget',
    component: SiteTemplateComponent,
    children: [
      { path: '', redirectTo: 'transaction/list', pathMatch: 'full' },
      { path: '', loadChildren: './transaction/transaction.module#TransactionModule' },
      { path: '', loadChildren: './reporting/reporting.module#ReportingModule' },
    ],
    canActivate: [AuthGuardService]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }

