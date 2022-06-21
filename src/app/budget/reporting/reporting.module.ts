import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../+shared/shared.module';
import { ReportingRoutingModule } from './reporting-routes.modules';
import { PerformanceComponent } from './containers/performance/performance.component';
import { MonthlyComponent } from './components/monthly/monthly.component';
import { FilterByCategoryPipe } from '../pipes/filter-by-category.pipe';

@NgModule({
  declarations: [
    PerformanceComponent,
    MonthlyComponent,
    FilterByCategoryPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportingRoutingModule,
  ]
})
export class ReportingModule { }
