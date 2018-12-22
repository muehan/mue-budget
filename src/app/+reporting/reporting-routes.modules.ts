import { Routes, RouterModule } from '@angular/router';
import { SiteTemplateComponent } from '../template/site-template/site-template.component';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { MonthlyComponent } from './containers/monthly/monthly.component';

const routes: Routes = [
    {
        path: 'analyze',
        component: SiteTemplateComponent,
        children: [
            { path: 'monthly', component: MonthlyComponent },
        ],
        canActivate: [AuthGuardService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportingRoutingModule { }