import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/+transaction/model/transaction';
import { filter, switchMap, map } from 'rxjs/operators';
import { Category } from 'src/app/+transaction/model/categroy';
import { Subcategory } from 'src/app/+transaction/model/subcategory';
import { of } from 'rxjs';

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

  @Input()
  public categories$: Observable<Category[]>;

  @Input()
  public subcategories$: Observable<Subcategory[]>;

  public currentDate = new Date();
  public selectedDate = new Date();
  public transactionFromSelectedMonth$: Observable<Transaction[]>;
  public transactionFromSelectedYearWithoutCurrentMonth$: Observable<Transaction[]>;
  public totalExpenses$: Observable<number>;

  public get selectedYear(): number {
    return this.selectedDate.getFullYear();
  }

  public get selectedMonth(): number {
    return this.selectedDate.getMonth() + 1;
  }

  constructor() {}

  ngOnInit() {
    this.transactionFromSelectedMonth$ = this.isTransactionLoading$.pipe(
      filter(x => !x),
      switchMap(_ =>
        this.transactions$.pipe(
          map(x =>
            x.filter(
              t =>
                new Date(t.date).getFullYear() == this.selectedDate.getFullYear() &&
                new Date(t.date).getMonth() == this.selectedDate.getMonth()
            )
          )
        )
      )
    );

    this.transactionFromSelectedYearWithoutCurrentMonth$ = this.isTransactionLoading$.pipe(
      filter(x => !x),
      switchMap(_ =>
        this.transactions$.pipe(
          map(x =>
            x.filter(
              t =>
                new Date(t.date).getFullYear() == this.selectedDate.getFullYear() &&
                new Date(t.date).getMonth() <= this.currentDate.getMonth() -1
            )
          )
        )
      )
    );
  }

  public getTotalExpenses(): Observable<number> {
    return this.transactionFromSelectedMonth$
    .pipe(
      filter(x => x.length > 0),
      map(x => x.map(t => t.value)
        .reduce((prev, next) => prev + next))
    );
  }

  public getExpensesByCategory(categoryName: string): Observable<number> {
    return this.transactionFromSelectedMonth$
      .pipe(
        filter(x => x.length > 0),
        map(x => x.filter(t => t.category === categoryName)),
        map(x => {
          if (x.length !== 0) {
            return x.map(t => t.value).reduce((prev, next) => prev + next);
          } else {
            return 0;
          }
        })
      );
  }

  public getExpensesBySubCategory(subcategoryName: string): Observable<number> {
    return this.transactionFromSelectedMonth$
      .pipe(
        filter(x => x.length > 0),
        map(x => x.filter(t => t.subCategory === subcategoryName)),
        map(x => {
          if (x.length !== 0) {
            return x
              .map(t => t.value)
              .reduce((prev, next) => prev + next);
          } else {
            return 0;
          }
        })
      );
  }

  public getAverageExpensesBySubCategory(subcategoryName: string): Observable<number> {
    return this.transactionFromSelectedYearWithoutCurrentMonth$
      .pipe(
        filter(x => x.length > 0),
        map(x => x.filter(t => t.subCategory === subcategoryName)),
        map(x => {
          if (x.length !== 0) {
            return x
              .map(t => t.value)
              .reduce((prev, next) => prev + next) / this.currentDate.getMonth(); // getMonth returns month 0-11
          } else {
            return 0;
          }
        })
      );
  }

  public subcategoriesByCategory(
    categoryname: string
  ): Observable<Subcategory[]> {
    return this.subcategories$.pipe(
      map(c => c.filter(x => x.categoryName == categoryname))
    );
  }

  public nextMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
  }

  public previousMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
  }
}
