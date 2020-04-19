
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { TransactionActions } from "../actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { TransactionService } from "../transaction/services/transaction.service";
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER } from '@angular/cdk/overlay/typings/overlay-directives';

@Injectable()
export class TransactionEffects {

  constructor(
    private actions: Actions,
    private transactionService: TransactionService,
  ) { }

  @Effect()
  getTransactions$ = this.actions
    .pipe(
      ofType<TransactionActions.GetTransactionChanges>(TransactionActions.ActionTypes.GetTransactionChanges),
      switchMap((_) => {
        return this.transactionService.getChanges()
          .pipe(
            map((action) => {
              if (action.type === "child_added") {
                return new TransactionActions.TransactionAdded(action.payload);
              }

              if (action.type === "child_changed") {
                return new TransactionActions.TransactionChanged(action.payload.val());
              }

              if (action.type === "child_removed") {
                return new TransactionActions.TransactionRemoved(action.payload.val());
              }
            }),
            catchError((error) => {
              return of(new TransactionActions.GetTransactionChangesFailed(error));
            })
          );
      })
    )

  @Effect()
  getAllTransactions$ = this.actions
    .pipe(
      ofType<TransactionActions.GetAllTransactions>(TransactionActions.ActionTypes.GetAllTransactions),
      switchMap((_) => {
        return this.transactionService.getAll()
          .pipe(
            map((transactions) => {
              return new TransactionActions.GetAllTransactionsSuccess(transactions);
            }),
            catchError((error) => {
              return of(new TransactionActions.GetAllTransactionsFailed(error));
            })
          );
      })
    )

    @Effect()
  getFewLastestTransactions$ = this.actions
    .pipe(
      ofType<TransactionActions.LoadLastFewTransactions>(TransactionActions.ActionTypes.GetAllTransactions),
      switchMap((_) => {
        return this.transactionService.getLastFew()
          .pipe(
            map((transactions) => {
              return new TransactionActions.LoadLastFewTransactionsSuccess(transactions);
            }),
            catchError((error) => {
              return of(new TransactionActions.LoadLastFewTransactionsFailed(error));
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