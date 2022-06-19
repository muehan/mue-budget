import { Observable } from "rxjs/internal/Observable";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { switchMap, map } from "rxjs/operators";
import { Transaction } from "../../../transaction/model/transaction";
import { Subcategory } from "../../../transaction/model/subcategory";
import {
  AngularFireAction,
  AngularFireDatabase,
} from "@angular/fire/compat/database";
import { BehaviorSubject } from "rxjs";
import firebase from "firebase/compat/app";

@Component({
  selector: "mue-monthly",
  templateUrl: "./monthly.component.html",
  styleUrls: ["./monthly.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthlyComponent implements OnInit {
  public currentDate = new Date();
  public selectedDate = new Date();
  public transactionFromSelectedMonth$: Observable<Transaction[]>;
  public transactionFromSelectedYearWithoutCurrentMonth$: Observable<
    Transaction[]
  >;
  public totalExpenses$: Observable<number>;

  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  filter$: BehaviorSubject<{ from: number; to: number } | null>;

  public get selectedYear(): number {
    return this.selectedDate.getFullYear();
  }

  public get selectedMonth(): number {
    return this.selectedDate.getMonth() + 1;
  }

  constructor(private db: AngularFireDatabase) {
    let from = new Date(this.selectedYear, this.selectedMonth - 1, 1);
    let to = new Date(this.selectedYear, this.selectedMonth, 1);

    let fromTS = +from;
    let toTS = +to;

    this.filter$ = new BehaviorSubject({ from: fromTS, to: toTS });

    this.items$ = this.filter$.pipe(
      switchMap((filter) =>
        db
          .list<Transaction>("/transactions", (ref) =>
            ref.orderByChild("date").startAt(filter.from).endAt(filter.to)
          )
          .snapshotChanges()
      )
    );
  }

  ngOnInit() {
    this.transactionFromSelectedMonth$ = this.items$.pipe(
      map((transactions) =>
        transactions.map((c) => {
          return { $key: c.key, ...c.payload.val() };
        })
      )
    );

    this.totalExpenses$ = this.transactionFromSelectedMonth$.pipe(
      map((x) => {
        if(x.length <= 0){
          return 0;
        }
        return x
          .map((t) => {
            return t.value;
          })
          .reduce((prev, next) => prev + next);
      })
    );
  }

  public getExpensesByCategory(categoryName: string): Observable<number> {
    // return this.transactionFromSelectedMonth$.pipe(
    //   filter((x) => x.length > 0),
    //   map((x) => x.filter((t) => t.category === categoryName)),
    //   map((x) => {
    //     if (x.length !== 0) {
    //       return x.map((t) => t.value).reduce((prev, next) => prev + next);
    //     } else {
    //       return 0;
    //     }
    //   })
    // );

    return null;
  }

  public getExpensesBySubCategory(subcategoryName: string): Observable<number> {
    // return this.transactionFromSelectedMonth$.pipe(
    //   filter((x) => x.length > 0),
    //   map((x) => x.filter((t) => t.subCategory === subcategoryName)),
    //   map((x) => {
    //     if (x.length !== 0) {
    //       return x.map((t) => t.value).reduce((prev, next) => prev + next);
    //     } else {
    //       return 0;
    //     }
    //   })
    // );

    return null;
  }

  public getAverageExpensesBySubCategory(
    subcategoryName: string
  ): Observable<number> {
    // return this.transactionFromSelectedYearWithoutCurrentMonth$.pipe(
    //   filter((x) => x.length > 0),
    //   map((x) => x.filter((t) => t.subCategory === subcategoryName)),
    //   map((x) => {
    //     if (x.length !== 0) {
    //       if (this.selectedDate.getFullYear() == new Date().getFullYear()) {
    //         return (
    //           x.map((t) => t.value).reduce((prev, next) => prev + next) /
    //           this.currentDate.getMonth()
    //         );
    //       } else {
    //         return (
    //           x.map((t) => t.value).reduce((prev, next) => prev + next) / 12
    //         );
    //       }
    //       // getMonth returns month 0-11
    //     } else {
    //       return 0;
    //     }
    //   })
    // );

    return null;
  }

  public subcategoriesByCategory(
    categoryname: string
  ): Observable<Subcategory[]> {
    // return this.subcategories$.pipe(
    //   map((c) => c.filter((x) => x.categoryName == categoryname))
    // );

    return null;
  }

  public nextMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);

    let from = new Date(this.selectedYear, this.selectedMonth - 1, 1);
    let to = new Date(this.selectedYear, this.selectedMonth, 1);

    let fromTS = +from;
    let toTS = +to;

    console.log(`from ${fromTS} to ${toTS}`);

    this.filter$.next({ from: fromTS, to: toTS });
  }

  public previousMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);

    let from = new Date(this.selectedYear, this.selectedMonth - 1, 1);
    let to = new Date(this.selectedYear, this.selectedMonth, 1);

    let fromTS = +from;
    let toTS = +to;

    console.log(`from ${fromTS} to ${toTS}`);

    this.filter$.next({ from: fromTS, to: toTS });
  }
}
