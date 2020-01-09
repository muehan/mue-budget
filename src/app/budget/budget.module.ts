import { NgModule } from '@angular/core';
import { TransactionModule } from './transaction/transaction.module';
import { ReportingModule } from './reporting/reporting.module';
import { BudgetRoutingModule } from './budget-routing.module';
import { SiteTemplateComponent } from './containers/site-template/site-template.component';
import { SharedModule } from '../+shared/shared.module';

@NgModule({
  declarations: [
    // SiteTemplateComponent
  ],
  imports: [
    SharedModule,
    TransactionModule,
    ReportingModule,
    BudgetRoutingModule,
  ]
})
export class BudgetModule { }
