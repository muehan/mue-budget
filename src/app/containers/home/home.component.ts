import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/state";
import { AddTransactionComponent } from "../../budget/transaction/dialogs/add-transaction/add-transaction.component";
import { AddTransactions } from "../../budget/actions/transactions-actions";
import { Observable } from "rxjs";
import {
  getCategoriesLoaded,
  getSubcategoriesLoaded,
} from "../../budget/reducers";
import { tap } from "rxjs/operators";
import { GetCategories } from "../../budget/actions/categories-actions";
import { GetSubcategories } from "../../budget/actions/subcategories-actions";

@Component({
  selector: "mue-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  public categoriesLoaded$: Observable<boolean> =
    this.store.select(getCategoriesLoaded);

  public subcategoriesLoaded$: Observable<boolean> = this.store.select(
    getSubcategoriesLoaded
  );

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit() {}

  ngOnDestroy() {}

  public addTransaction() {
    this.categoriesLoaded$
      .pipe(
        tap((x) => {
          if (!x) {
            this.store.dispatch(GetCategories());
          }
        })
      )
      .subscribe()
      .unsubscribe();

    this.subcategoriesLoaded$
      .pipe(
        tap((x) => {
          if (!x) {
            this.store.dispatch(GetSubcategories());
          }
        })
      )
      .subscribe()
      .unsubscribe();

    let dialogRef = this.dialog.open(AddTransactionComponent, {
      height: "350px",
      width: "90%",
      maxWidth: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(AddTransactions({ payload: result }));
      }
    });
  }
}
