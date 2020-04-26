import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'budget',
    children: [
      { path: '', redirectTo: 'transaction/list', pathMatch: 'full' },
      { path: '', loadChildren: './transaction/transaction.module#TransactionModule' },
      { path: '', loadChildren: './reporting/reporting.module#ReportingModule' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }

