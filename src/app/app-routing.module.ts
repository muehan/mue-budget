import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './+auth/containers/login/login.component';
import { ListComponent } from './+transaction/containers/list/list.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SiteTemplateComponent } from './template/site-template/site-template.component';

const routes: Routes = [
  {
    path: '', component: SiteTemplateComponent, children: [
      { path: 'list', component: ListComponent },
    ],
    canActivate: [AuthGuardService]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }