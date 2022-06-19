import { Injectable } from "@angular/core";
import {
  AngularFireAction,
  AngularFireDatabase,
} from "@angular/fire/compat/database";
import firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Transaction } from "../model/transaction";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  private transactions$: BehaviorSubject<Transaction[]> = new BehaviorSubject<
    Transaction[]
  >([]);

  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  count$: BehaviorSubject<number | null>;

  constructor(private db: AngularFireDatabase) {
    this.count$ = new BehaviorSubject(null);

    this.items$ = this.count$.pipe(
      switchMap((count) =>
        db
          .list<Transaction>("/transactions", (ref) =>
            count ? ref.limitToLast(count) : ref
          )
          .snapshotChanges()
      ),
    );
  }

  public getTransactions(count: number): Observable<Transaction[]> {
    this.count$.next(count);
    return this.items$.pipe(
      map((transactions) =>
        transactions.map((c) => {
          return { $key: c.key, ...c.payload.val() };
        })
      ),
      map(arr => arr.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ))
    );
  }

  getAll(): Observable<Transaction[]> {
    return this.db
      .list<Transaction>("transactions")
      .snapshotChanges()
      .pipe(
        map((transactions) =>
          transactions.map((c) => {
            return { $key: c.key, ...c.payload.val() };
          })
        )
      );
  }

  public LoadMoreTransactions(
    skip: number,
    load: number
  ): Observable<Transaction[]> {
    this.db
      .list<Transaction>("transactions", (ref) => ref.limitToLast(load))
      .snapshotChanges()
      .pipe(
        map((transactions) =>
          transactions.map((c) => {
            return { $key: c.key, ...c.payload.val() };
          })
        )
      )
      .subscribe(this.transactions$);

    return this.transactions$.asObservable();
  }

  public add(newItem: Transaction): Observable<any> {
    this.db.list<Transaction>("transactions").push(newItem);

    return of();
  }

  public edit(item: Transaction): Promise<void> {
    return this.db.list<Transaction>("transactions").update(item.$key, {
      category: item.category,
      subCategory: item.subCategory,
      //   description: item.description,
      value: item.value,
      date: item.date,
    });
  }

  public remove(item: Transaction): Promise<void> {
    return this.db.list<Transaction>("transactions").remove(item.$key);
  }
}
