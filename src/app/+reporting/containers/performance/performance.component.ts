import { AppState } from './../../../store/state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction } from '../../../+transaction/model/transaction';
import { getAllTransactions, getTransactionIsLoading, getAllCategories, getAllSubcategories } from 'src/app/+transaction/reducers';
import { TransactionActions, CategoryActions, SubcategoryActions } from 'src/app/+transaction/actions';
import { Category } from 'src/app/+transaction/model/categroy';
import { Subcategory } from 'src/app/+transaction/model/subcategory';

@Component({
  selector: 'mue-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  public transactions$: Observable<Transaction[]> = this.store.select(getAllTransactions);
  public isLoading$: Observable<boolean> = this.store.select(getTransactionIsLoading);
  public categories$: Observable<Category[]> = this.store.select(getAllCategories);
  public subcategories$: Observable<Subcategory[]> = this.store.select(getAllSubcategories);

  constructor(
    private store: Store<AppState>,
  ) {
    this.store.dispatch(new TransactionActions.GetTransactions());
    this.store.dispatch(new CategoryActions.GetCategories());
    this.store.dispatch(new SubcategoryActions.GetSubcategories());
  }

  ngOnInit() {
  }

}
