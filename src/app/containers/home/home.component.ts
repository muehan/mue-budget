import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { AddTransactionComponent } from 'src/app/budget/transaction/dialogs/add-transaction/add-transaction.component';
import { TransactionActions } from 'src/app/budget/actions';

@Component({
  selector: 'mue-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  public addTransaction() {
    let dialogRef = this.dialog.open(AddTransactionComponent, {
      height: '350px',
      width: '90%',
      maxWidth: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new TransactionActions.AddTransactions(result));
      }
    });
  }
}
