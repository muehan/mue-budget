
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { TransactionActions } from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TransactionService } from '../services/transaction.service';

@Injectable()
export class TransactionEffects {

  constructor(
    private actions: Actions,
    private transactionService: TransactionService,
  ) { }

  @Effect()
  getTransactions$ = this.actions
    .ofType<TransactionActions.GetTransactions>(TransactionActions.ActionTypes.GetTransactions)
    .pipe(
      switchMap((_) => {
        return this.transactionService.getAll()
          .pipe(
            map((Transactions) => {
              return new TransactionActions.GetTransactionsSuccess(Transactions);
            }),
            catchError((error) => {
              return of(new TransactionActions.GetTransactionsFailed(error));
            })
          );
      })
    )

  @Effect()
  addCategory$ = this.actions
    .ofType<TransactionActions.AddTransactions>(TransactionActions.ActionTypes.AddTransactions)
    .pipe(
      map(action => action.payload),
      switchMap(x => this.transactionService.add(x)
        .pipe(
          map(x => new TransactionActions.AddTransactionsSuccess()),
          catchError(error => of(new TransactionActions.AddTransactionsFailed(error)))
        ))
    )

  @Effect()
  deleteCategory$ = this.actions
    .ofType<TransactionActions.DeleteTransactions>(TransactionActions.ActionTypes.DeleteTransactions)
    .pipe(
      map(action => action.payload),
      switchMap(x => this.transactionService.remove(x)
        .then(x => new TransactionActions.DeleteTransactionsSuccess())
        .catch(x => new TransactionActions.DeleteTransactionsFailed(x))
      )
    )

  @Effect()
  editCategory$ = this.actions
    .ofType<TransactionActions.EditTransactions>(TransactionActions.ActionTypes.EditTransactions)
    .pipe(
      map(action => action.payload),
      switchMap(x => this.transactionService.edit(x)
        .then(x => new TransactionActions.EditTransactionsSuccess())
        .catch(x => new TransactionActions.EditTransactionsFailed(x))
      )
    )
}