
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { TransactionActions } from "../actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { TransactionService } from "../transaction/services/transaction.service";

@Injectable()
export class TransactionEffects {

  constructor(
    private actions: Actions,
    private transactionService: TransactionService,
  ) { }

  @Effect()
  getTransactions$ = this.actions
    .pipe(
      ofType<TransactionActions.GetTransactions>(TransactionActions.ActionTypes.GetTransactions),
      switchMap((_) => {
        return this.transactionService.getAll()
          .pipe(
            map((transactions) => {
              return new TransactionActions.GetTransactionsSuccess(transactions);
            }),
            catchError((error) => {
              return of(new TransactionActions.GetTransactionsFailed(error));
            })
          );
      })
    )

  @Effect()
  addTransaction$ = this.actions
    .pipe(
      ofType<TransactionActions.AddTransactions>(TransactionActions.ActionTypes.AddTransactions),
      map(action => {
        console.log(action.payload);
        return action.payload
      }),
      switchMap(x => this.transactionService.add(x)
        .pipe(
          map(x => new TransactionActions.AddTransactionsSuccess()),
          catchError(error => of(new TransactionActions.AddTransactionsFailed(error)))
        ))
    )

  @Effect()
  deleteTransaction$ = this.actions
    .pipe(
      ofType<TransactionActions.DeleteTransactions>(TransactionActions.ActionTypes.DeleteTransactions),
      map(action => action.payload),
      switchMap(x => this.transactionService.remove(x)
        .then(x => new TransactionActions.DeleteTransactionsSuccess())
        .catch(x => new TransactionActions.DeleteTransactionsFailed(x))
      )
    )

  @Effect()
  editTransaction$ = this.actions
    .pipe(
      ofType<TransactionActions.EditTransactions>(TransactionActions.ActionTypes.EditTransactions),
      map(action => action.payload),
      switchMap(x => this.transactionService.edit(x)
        .then(x => new TransactionActions.EditTransactionsSuccess())
        .catch(x => new TransactionActions.EditTransactionsFailed(x))
      )
    )
}