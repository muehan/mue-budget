import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./store/state";
import { getIsAuthenticated, getLoggingInProgress } from "./+auth/reducers";
import { Observable } from "rxjs/internal/Observable";
import { CategoriesInitialize } from "./budget/actions/categories-actions";
import { SubcategoriesInitialize } from "./budget/actions/subcategories-actions";
import { TransactionInitialize } from "./budget/actions/transactions-actions";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public isLoggingIn$: Observable<boolean> =
    this.store.select(getLoggingInProgress);

  public isAuthenticated$: Observable<boolean> =
    this.store.select(getIsAuthenticated);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isAuthenticated$.pipe(filter((x) => x === true)).subscribe((_) => {
      this.store.dispatch(TransactionInitialize());
      this.store.dispatch(CategoriesInitialize());
      this.store.dispatch(SubcategoriesInitialize());
    }).unsubscribe;
  }
}
