import { AppState } from '../../../../store/state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction } from '../../../transaction/model/transaction';
import { getAllTransactions, getAllCategories, getAllSubcategories, getTransactionIsLoading } from '../../../reducers';
import { Category } from '../../../transaction/model/categroy';
import { Subcategory } from '../../../transaction/model/subcategory';
import { GetSubcategories } from '../../../actions/subcategories-actions';
import { GetCategories } from '../../../actions/categories-actions';
import { GetAllTransactions } from 'src/app/budget/actions/transactions-actions';

@Component({
  selector: 'mue-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  public transactions$: Observable<Transaction[]> = this.store.select(getAllTransactions);
  public categories$: Observable<Category[]> = this.store.select(getAllCategories);
  public subcategories$: Observable<Subcategory[]> = this.store.select(getAllSubcategories);
  public isLoading$: Observable<boolean> = this.store.select(getTransactionIsLoading);

  constructor(
    private store: Store<AppState>,
  ) {
    this.store.dispatch(GetAllTransactions());
    this.store.dispatch(GetCategories());
    this.store.dispatch(GetSubcategories());
  }

  ngOnInit() {
  }

}
