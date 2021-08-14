import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/state';
import { getLoggingInProgress } from './+auth/reducers';
import { Observable } from 'rxjs/internal/Observable';
import { GetCategories } from './budget/actions/categories-actions';
import { GetSubcategories } from './budget/actions/subcategories-actions';
import { LoadLastFewTransactions, GetAllTransactions } from './budget/actions/transactions-actions';

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
      LoadLastFewTransactions()
    );
    
    this.store.dispatch(
      GetAllTransactions()
    );

    this.store.dispatch(
      GetSubcategories()
    );

    this.store.dispatch(
      GetCategories()
    );
  }
}
