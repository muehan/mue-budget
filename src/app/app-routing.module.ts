import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './+auth/containers/login/login.component';
import { HomeComponent } from './containers/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MainTemplateComponent } from './containers/main-template/main-template.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '', loadChildren: './budget/budget.module#BudgetModule' },
  {
    path: 'home', component: MainTemplateComponent, children: [
      { path: '', component: HomeComponent }
    ], canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

