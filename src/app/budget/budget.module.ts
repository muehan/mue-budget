import { NgModule } from '@angular/core';
import { TransactionModule } from './transaction/transaction.module';
import { ReportingModule } from './reporting/reporting.module';
import { BudgetRoutingModule } from './budget-routing.module';
import { SharedModule } from '../+shared/shared.module';

@NgModule({
  declarations: [    
  ],
  imports: [
    SharedModule,
    TransactionModule,
    ReportingModule,
    BudgetRoutingModule,
  ]
})
export class BudgetModule { }
