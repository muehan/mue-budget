import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './+auth/containers/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'transaction/list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '', loadChildren: './+transaction/transaction.module#TransactionModule' },
  { path: '', loadChildren: './+reporting/reporting.module#ReportingModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

