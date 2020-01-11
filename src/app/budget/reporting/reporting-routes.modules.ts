import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PerformanceComponent } from './containers/performance/performance.component';

const routes: Routes = [
    {
        path: 'reporting',
        children: [
            { path: 'performance', component: PerformanceComponent },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportingRoutingModule { }
