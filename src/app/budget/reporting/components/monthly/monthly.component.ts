import { Observable } from "rxjs/internal/Observable";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { switchMap, map, filter } from "rxjs/operators";
import { Transaction } from "../../../transaction/model/transaction";
import { Subcategory } from "../../../transaction/model/subcategory";
import {
  AngularFireAction,
  AngularFireDatabase,
} from "@angular/fire/compat/database";
import { BehaviorSubject, Subject } from "rxjs";
import firebase from "firebase/compat/app";
import { CategoryService } from "src/app/budget/transaction/services/category.service";
import { SubcategoryService } from "src/app/budget/transaction/services/subcategory.service";

export interface Dictionary<T> {
  [Key: string]: T;
}

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
  public categories$ = this.categoryService.getAll();
  public subCategories = this.subcategoryService.getAll();

  public items$: Observable<
    AngularFireAction<firebase.database.DataSnapshot>[]
  >;
  public dateFilter$: BehaviorSubject<{ from: number; to: number } | null> =
    new BehaviorSubject({
      from: +new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      to: +new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
    });

  public categoryDict: Dictionary<number> = {};

  public get selectedYear(): number {
    return this.selectedDate.getFullYear();
  }

  public get selectedMonth(): number {
    return this.selectedDate.getMonth() + 1;
  }

  constructor(
    public db: AngularFireDatabase,
    public categoryService: CategoryService,
    public subcategoryService: SubcategoryService,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    this.items$ = this.dateFilter$.pipe(
      switchMap((filter) => {
        // console.log("reload list");
        return this.db
          .list<Transaction>("transactions", (ref) =>
            ref.orderByChild("date").startAt(filter.from).endAt(filter.to)
          )
          .snapshotChanges();
      })
    );
  }

  ngOnInit() {
    this.transactionFromSelectedMonth$ = this.items$.pipe(
      map((transactions) =>
        transactions.map((c) => {
          // console.log(c);
          return { $key: c.key, ...c.payload.val() };
        })
      )
    );

    this.totalExpenses$ = this.transactionFromSelectedMonth$.pipe(
      map((x) => {
        if (x.length <= 0) {
          return 0;
        }
        return x
          .map((t) => {
            return t.value;
          })
          .reduce((prev, next) => prev + next);
      })
    );

    this.transactionFromSelectedMonth$.pipe(
      map((array) => {
        this.categoryDict = {};
        array.map((transaction) => {
          if (this.categoryDict[transaction.category]) {
            this.categoryDict[transaction.category] =
            this.categoryDict[transaction.category] + transaction.value;
          } else {
            this.categoryDict[transaction.category] = transaction.value;
          }
        });

        // console.log(this.categoryDict);

        return this.categoryDict;
      })
    )
    .subscribe(x => {
      this.changeDetectorRef.detectChanges();
    });
  }

  public getExpensesByCategory(categoryName: string): number {
    // console.log(`get by category: ${categoryName} => ${this.categoryDict[categoryName]}`);

    return this.categoryDict[categoryName] == undefined ? 0 : this.categoryDict[categoryName];
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
    categoryName: string
  ): Observable<Subcategory[]> {
    
    return this.subcategoryService.getAll()
    .pipe(
      map((c) => c.filter((x) => {
        console.log(categoryName)
        return x.categoryName == categoryName}
        ))
    );

    return null;
  }

  public nextMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);

    let from = new Date(this.selectedYear, this.selectedMonth - 1, 1);
    let to = new Date(this.selectedYear, this.selectedMonth, 1);

    let fromTS = +from;
    let toTS = +to;

    // console.log(`from ${fromTS} to ${toTS}`);

    this.dateFilter$.next({ from: fromTS, to: toTS });
  }

  public previousMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);

    let from = new Date(this.selectedYear, this.selectedMonth - 1, 1);
    let to = new Date(this.selectedYear, this.selectedMonth, 1);

    let fromTS = +from;
    let toTS = +to;

    // console.log(`from ${fromTS} to ${toTS}`);

    this.dateFilter$.next({ from: fromTS, to: toTS });
  }
}