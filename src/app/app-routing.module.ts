import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './+auth/containers/login/login.component';
import { HomeComponent } from './containers/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MainTemplateComponent } from './containers/main-template/main-template.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainTemplateComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: '', loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule) },
      { path: '', loadChildren: () => import('./shoping-list/shoping-list.module').then(m => m.ShopingListModule) },
    ], canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

