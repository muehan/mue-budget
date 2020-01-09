import { Routes, RouterModule } from '@angular/router';
import { SiteTemplateComponent } from './../containers/site-template/site-template.component';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../../services/auth-guard.service';
import { PerformanceComponent } from './containers/performance/performance.component';

const routes: Routes = [
    {
        path: 'reporting',
        component: SiteTemplateComponent,
        children: [
            { path: 'performance', component: PerformanceComponent },
        ],
        canActivate: [AuthGuardService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportingRoutingModule { }
