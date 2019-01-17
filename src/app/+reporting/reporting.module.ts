import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../+shared/shared.module';
import { ReportingRoutingModule } from './reporting-routes.modules';
import { PerformanceComponent } from './containers/performance/performance.component';

@NgModule({
  declarations: [
    PerformanceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportingRoutingModule,
  ]
})
export class ReportingModule { }
