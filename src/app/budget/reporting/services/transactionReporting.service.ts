import { Injectable } from "@angular/core";
import {
  AngularFireAction,
  AngularFireDatabase,
} from "@angular/fire/compat/database";
import { BehaviorSubject, map, Observable, switchMap } from "rxjs";
import { Transaction } from "../../transaction/model/transaction";
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: "root",
})
export class TransactionReportingService {

  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  filter$: BehaviorSubject<{from: number, to:number} | null>;

  constructor(private db: AngularFireDatabase) {
    this.filter$ = new BehaviorSubject(null);

    this.items$ = this.filter$.pipe(
      switchMap((filter) =>
        db
          .list<Transaction>("/transactions", (ref) =>
            ref
              .orderByChild("date")
              .startAt(filter.from)
              .endAt(filter.to)
          )
          .snapshotChanges()
      )
    );
  }

  public getTransactions(from: number, to: number): Observable<Transaction[]> {

    console.log(`from ${from} to ${to}`);

    this.filter$.next({from, to});

    return this.items$.pipe(
      map((transactions) =>
        transactions.map((c) => {
          return { $key: c.key, ...c.payload.val() };
        })
      )
    );
  }
}
