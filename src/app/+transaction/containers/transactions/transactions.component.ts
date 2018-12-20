import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { TransactionActions, SubcategoryActions, CategoryActions } from '../../actions';
import { Observable } from 'rxjs';
import { Transaction } from '../../model/transaction';
import { getAllTransactions } from '../../reducers';
import { MatDialog } from '@angular/material/dialog';
import { AddTransactionComponent } from '../../dialogs/add-transaction/add-transaction.component';

@Component({
  selector: 'mue-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  public transactions$: Observable<Transaction[]> = this.store.select(getAllTransactions);

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
  ) {
    this.store.dispatch(
      new SubcategoryActions.GetSubcategories()
    );

    this.store.dispatch(
      new CategoryActions.GetCategories()
    );
  }

  ngOnInit() {
    this.store.dispatch(
      new TransactionActions.GetTransactions()
    );
  }

  public create() {
    let dialogRef = this.dialog.open(AddTransactionComponent, {
      height: '280px',
      width: '230px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new TransactionActions.AddTransactions(result));
      }
    });
  }

  public remove(item: Transaction) {
    this.store.dispatch(new TransactionActions.DeleteTransactions(item));
  }

  public edit(item: Transaction) {
    // let dialogRef = this.dialog.open(
    //   EditCategoryComponent, {
    //     height: '150px',
    //     width: '230px',
    //     data: { category: item },
    //   });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.store.dispatch(new CategoryActions.EditCategories(result));
    //   }
    // });
  }
}
