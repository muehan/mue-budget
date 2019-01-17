import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/+transaction/model/transaction';
import { filter, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'mue-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.scss']
})
export class MonthlyComponent implements OnInit {

  @Input()
  public transactions$: Observable<Transaction[]>;

  @Input()
  public isTransactionLoading$: Observable<boolean>;

  public currentYear = new Date().getFullYear();
  public currentMonth = new Date().getMonth() + 1;

  public currentMonth$: Observable<Transaction[]> = this.isTransactionLoading$
    .pipe(
      filter(x => !x),
      switchMap(_ => this.transactions$
        .pipe(
          map(x => x.filter(t => new Date(t.date).getFullYear() == new Date().getFullYear()
                              && new Date(t.date).getMonth() == new Date().getMonth())),
        )))


  public totalExpenses$: Observable<number> = this.currentMonth$.pipe(
    map(x => x.map(t => t.value).reduce((prev, next) => prev + next))
  )

  constructor() { }

  ngOnInit() {
  }

}
