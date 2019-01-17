import { AppState } from './../../../store/state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction } from '../../../+transaction/model/transaction';
import { getAllTransactions, getTransactionIsLoading } from 'src/app/+transaction/reducers';
import { TransactionActions } from 'src/app/+transaction/actions';

@Component({
  selector: 'mue-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  public transactions$: Observable<Transaction[]> = this.store.select(getAllTransactions);

  public isLoading$: Observable<boolean> = this.store.select(getTransactionIsLoading);

  constructor(
    private store: Store<AppState>,
  ) {
    this.store.dispatch(new TransactionActions.GetTransactions());
  }

  ngOnInit() {
  }

}
