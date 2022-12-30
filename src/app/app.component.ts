import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./store/state";
import { getIsAuthenticated, getLoggingInProgress } from "./+auth/reducers";
import { Observable } from "rxjs/internal/Observable";
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
    this.isAuthenticated$.pipe(filter((x) => x === true)).subscribe((_) => {})
      .unsubscribe;
  }
}
