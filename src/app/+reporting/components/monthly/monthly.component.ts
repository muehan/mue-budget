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

  public currentYear = new Date().getFullYear();
  public currentMonth = new Date().getMonth() + 1;
  public currentMonth$: Observable<Transaction[]>;
  public totalExpenses$: Observable<number>;

  constructor() { }

  ngOnInit() {
    this.currentMonth$ = this.isTransactionLoading$
    .pipe(
      filter(x => !x),
      switchMap(_ => this.transactions$
        .pipe(
          map(x => x.filter(t => new Date(t.date).getFullYear() == new Date().getFullYear()
                              && new Date(t.date).getMonth() == new Date().getMonth())),
        )))

        this.totalExpenses$ = this.currentMonth$.pipe(
          map(x => x.map(t => t.value).reduce((prev, next) => prev + next))
        )
  }

  public getExpensesByCategory(categoryName: string) : Observable<number> {
    return this.currentMonth$.pipe(
      map(x => x.filter(t => t.category === categoryName)),
      map(x => {
        if(x){
          return x.map(t => t.value).reduce((prev, next) => prev + next)
        } else {
          return 0;
        }
      })
    );
  }

  public getExpensesBySubCategory(subcategoryName: string) : Observable<number> {
    return this.currentMonth$.pipe(
      map(x => x.filter(t => t.subCategory === subcategoryName)),
      map(x => {
        if(x){
          return x.map(t => t.value).reduce((prev, next) => prev + next)
        } else {
          return 0;
        }
      })
    );
  }

  public subcategoriesByCategory(categoryname: string) : Observable<Subcategory[]> {
    return this.subcategories$
      .pipe(
        map(c => c.filter(x => x.categoryName == categoryname))
      );
  }
}
