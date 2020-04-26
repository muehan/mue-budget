import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/state';
import { getLoggingInProgress } from './+auth/reducers';
import { Observable } from 'rxjs/internal/Observable';
import { TransactionActions, SubcategoryActions, CategoryActions } from './budget/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isLoggingIn$: Observable<boolean> = this.store.select(getLoggingInProgress);

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(
      new TransactionActions.LoadLastFewTransactions()
    );
    
    this.store.dispatch(
      new TransactionActions.GetAllTransactions()
    );

    this.store.dispatch(
      new SubcategoryActions.GetSubcategories()
    );

    this.store.dispatch(
      new CategoryActions.GetCategories()
    );

  }
}
