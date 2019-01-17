import { AppState } from './../../../store/state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction } from '../../../+transaction/model/transaction';
import { getAllTransactions } from 'src/app/+transaction/reducers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mue-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  public currentMonth$: Observable<Transaction[]> = this.store.select(getAllTransactions)
    .pipe(
      map(x => x.filter(t => new Date(t.date).getFullYear == new Date().getFullYear)),
      map(x => x.filter(t => new Date(t.date).getMonth == new Date().getMonth))
    )

  public totalExpenses$: Observable<number> = this.currentMonth$.pipe(
    map(x => x.map(t => t.value).reduce((prev, next) => prev + next))
  )

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
  }

}
