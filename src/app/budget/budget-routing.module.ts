import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'budget',
    children: [
      { path: '', redirectTo: 'transaction/list', pathMatch: 'full' },
      { path: '', loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule) },
      { path: '', loadChildren: () => import('./reporting/reporting.module').then(m => m.ReportingModule) },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }

