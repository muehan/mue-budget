import { Observable } from "rxjs/internal/Observable";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from "@angular/core";
import { switchMap, map, filter } from "rxjs/operators";
import { Transaction } from "../../../transaction/model/transaction";
import { Subcategory } from "../../../transaction/model/subcategory";
import {
  AngularFireAction,
  AngularFireDatabase,
} from "@angular/fire/compat/database";
import { BehaviorSubject, Subject, Subscription } from "rxjs";
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
export class MonthlyComponent implements OnInit, OnDestroy {
  public currentDate = new Date();
  public selectedDate = new Date();
  public transactionFromSelectedMonth$: Observable<Transaction[]>;
  public transactionFromSelectedYearWithoutCurrentMonth$: Observable<
    Transaction[]
  >;
  public totalExpenses$: Observable<number>;
  public categories$ = this.categoryService.getAll();
  public subCategories = this.subcategoryService.getAll();

  public itemsMonth$: Observable<
    AngularFireAction<firebase.database.DataSnapshot>[]
  >;

  public itemsYear$: Observable<
    AngularFireAction<firebase.database.DataSnapshot>[]
  >;

  public dateFilter$: BehaviorSubject<{ from: number; to: number } | null> =
    new BehaviorSubject({
      from: +new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      to: +new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
    });

  public monthSubscription: Subscription = null;
  public yearSubscription: Subscription = null;

  public categoryDict: Dictionary<number> = {};
  public subCategoryDict: Dictionary<number> = {};
  public subCategoryYearDict: Dictionary<number> = {};

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
    this.itemsMonth$ = this.dateFilter$.pipe(
      switchMap((filter) => {
        return this.db
          .list<Transaction>("transactions", (ref) =>
            ref.orderByChild("date").startAt(filter.from).endAt(filter.to)
          )
          .snapshotChanges();
      })
    );

    this.itemsYear$ = this.dateFilter$.pipe(
      switchMap((filter) => {
        let fromDate = new Date(filter.from);

        let fromYear = new Date(fromDate.getFullYear(), 1, 1);
        let toLastMonth = new Date(
          fromDate.getFullYear(),
          new Date().getMonth(),
          1
        );

        return this.db
          .list<Transaction>("transactions", (ref) =>
            ref
              .orderByChild("date")
              .startAt(+fromYear)
              .endAt(+toLastMonth)
          )
          .snapshotChanges();
      })
    );
  }

  ngOnInit() {
    this.transactionFromSelectedMonth$ = this.itemsMonth$.pipe(
      map((transactions) =>
        transactions.map((c) => {
          return { $key: c.key, ...c.payload.val() };
        })
      )
    );

    this.transactionFromSelectedYearWithoutCurrentMonth$ = this.itemsYear$.pipe(
      map((transactions) =>
        transactions.map((c) => {
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

    this.monthSubscription = this.transactionFromSelectedMonth$
      .pipe(
        map((array) => {
          this.categoryDict = {};
          this.subCategoryDict = {};

          array.map((transaction) => {
            if (this.categoryDict[transaction.category]) {
              this.categoryDict[transaction.category] =
                this.categoryDict[transaction.category] + transaction.value;
            } else {
              this.categoryDict[transaction.category] = transaction.value;
            }

            if (
              this.subCategoryDict[
                transaction.category + transaction.subCategory
              ]
            ) {
              this.subCategoryDict[
                transaction.category + transaction.subCategory
              ] =
                this.subCategoryDict[
                  transaction.category + transaction.subCategory
                ] + transaction.value;
            } else {
              this.subCategoryDict[
                transaction.category + transaction.subCategory
              ] = transaction.value;
            }
          });

          return this.categoryDict;
        })
      )
      .subscribe((x) => {
        this.changeDetectorRef.detectChanges();
      });

    this.yearSubscription = this.transactionFromSelectedYearWithoutCurrentMonth$
      .pipe(
        map((array) => {
          this.subCategoryYearDict = {};

          array.map((transaction) => {
            if (
              this.subCategoryYearDict[
                transaction.category + transaction.subCategory
              ]
            ) {
              this.subCategoryYearDict[
                transaction.category + transaction.subCategory
              ] =
                this.subCategoryYearDict[
                  transaction.category + transaction.subCategory
                ] + transaction.value;
            } else {
              this.subCategoryYearDict[
                transaction.category + transaction.subCategory
              ] = transaction.value;
            }
          });

          return this.subCategoryYearDict;
        })
      )
      .subscribe((x) => {
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    if (this.monthSubscription) {
      this.monthSubscription.unsubscribe();
    }

    if (this.yearSubscription) {
      this.yearSubscription.unsubscribe();
    }
  }

  public getExpensesByCategory(categoryName: string): number {
    return this.categoryDict[categoryName] == undefined
      ? 0
      : this.categoryDict[categoryName];
  }

  public getExpensesBySubCategory(
    categoryName: string,
    subcategoryName: string
  ): number {
    return this.subCategoryDict[categoryName + subcategoryName] == undefined
      ? 0
      : this.subCategoryDict[categoryName + subcategoryName];
  }

  public getAverageExpensesBySubCategory(
    categoryName: string,
    subcategoryName: string
  ): number {
    return this.subCategoryYearDict[categoryName + subcategoryName] == undefined
      ? 0
      : this.subCategoryYearDict[categoryName + subcategoryName] /
          new Date(
            this.selectedDate.getFullYear(),
            this.selectedDate.getFullYear() === new Date().getFullYear()
              ? this.selectedDate.getMonth()
              : 11,
            1
          ).getMonth();
  }

  public subcategoriesByCategory(
    categoryName: string
  ): Observable<Subcategory[]> {
    return this.subcategoryService.getAll().pipe(
      map((c) =>
        c.filter((x) => {
          return x.categoryName == categoryName;
        })
      )
    );
  }

  public nextMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);

    this.dateFilter$.next({
      from: +new Date(this.selectedYear, this.selectedMonth - 1, 1),
      to: +new Date(this.selectedYear, this.selectedMonth, 1),
    });
  }

  public previousMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);

    this.dateFilter$.next({
      from: +new Date(this.selectedYear, this.selectedMonth - 1, 1),
      to: +new Date(this.selectedYear, this.selectedMonth, 1),
    });
  }
}
