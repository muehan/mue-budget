import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./store/state";
import { getLoggingInProgress } from "./+auth/reducers";
import { Observable } from "rxjs/internal/Observable";
import { CategoriesInitialize } from "./budget/actions/categories-actions";
import { GetSubcategories, SubcategoriesInitialize } from "./budget/actions/subcategories-actions";
import {
  GetAllTransactions,
  TransactionInitialize,
} from "./budget/actions/transactions-actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public isLoggingIn$: Observable<boolean> =
    this.store.select(getLoggingInProgress);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void { 
    this.store.dispatch(TransactionInitialize());
    this.store.dispatch(CategoriesInitialize());
    this.store.dispatch(SubcategoriesInitialize());
  }
}
