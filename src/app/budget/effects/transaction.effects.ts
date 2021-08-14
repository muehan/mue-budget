import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { SubcategoryActions, TransactionActions } from "../actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { TransactionService } from "../transaction/services/transaction.service";
import {
  GetAllTransactionsFailed,
  GetAllTransactionsSuccess,
  GetTransactionChangesFailed,
  TransactionAdded,
  TransactionChanged,
  TransactionRemoved,
  LoadLastFewTransactionsSuccess,
  LoadLastFewTransactionsFailed,
  AddTransactionsFailed,
  AddTransactionsSuccess,
  DeleteTransactionsFailed,
  DeleteTransactionsSuccess,
  EditTransactionsFailed,
  EditTransactionsSuccess,
} from "../actions/transactions-actions";

@Injectable()
export class TransactionEffects {
  constructor(
    private actions$: Actions,
    private transactionService: TransactionService
  ) {}

  getTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionActions.GetTransactionChanges),
      switchMap((_) =>
        this.transactionService.getChanges().pipe(
          map((action) => {
            if (action.type === "child_added") {
              return TransactionAdded({ payload: action.payload });
            }

            if (action.type === "child_changed") {
              return TransactionChanged({ payload: action.payload.val() });
            }

            if (action.type === "child_removed") {
              return TransactionRemoved({ payload: action.payload.val() });
            }
          }),
          catchError((error) => of(GetTransactionChangesFailed()))
        )
      )
    );
  });

  getAllTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionActions.GetAllTransactions),
      switchMap((_) =>
        this.transactionService.getAll().pipe(
          map((response) => GetAllTransactionsSuccess({ payload: response })),
          catchError((error) =>
            of(GetAllTransactionsFailed({ payload: error }))
          )
        )
      )
    );
  });

  getFewLastestTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionActions.LoadLastFewTransactions),
      switchMap((_) =>
        this.transactionService.getLastFew().pipe(
          map((response) => LoadLastFewTransactionsSuccess({payload: response})),
          catchError((error) =>
            of(LoadLastFewTransactionsFailed({ payload: error }))
          )
        )
      )
    );
  });

  addTransaction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionActions.AddTransactions),
      switchMap((data) =>
        this.transactionService.add(data.payload).pipe(
          map((response) => AddTransactionsSuccess()),
          catchError((error) => of(AddTransactionsFailed({ payload: error })))
        )
      )
    );
  });

  deleteTransaction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionActions.DeleteTransactions),
      switchMap((data) =>
        this.transactionService.add(data.payload).pipe(
          map((response) => DeleteTransactionsSuccess()),
          catchError((error) =>
            of(DeleteTransactionsFailed({ payload: error }))
          )
        )
      )
    );
  });

  editTransaction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionActions.EditTransactions),
      switchMap((data) =>
        this.transactionService.add(data.payload).pipe(
          map((response) => EditTransactionsSuccess()),
          catchError((error) =>
            of(EditTransactionsFailed({ payload: error }))
          )
        )
      )
    );
  });
}
