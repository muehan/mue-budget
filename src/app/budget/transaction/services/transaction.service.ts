import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Transaction } from "../model/transaction";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  private firebaselist: AngularFireList<Transaction>;
  private firebaselistReduced: AngularFireList<Transaction>;

  constructor(private firebase: AngularFireDatabase) {}

  public init() {
    this.firebaselist = this.firebase.list("transactions");
    this.firebaselistReduced = this.firebase.list("transactions", (ref) =>
      ref.limitToLast(20)
    );
  }

  public getChanges(): Observable<SnapshotAction<Transaction>> {
    return this.firebaselist.stateChanges();
  }

  public getAll(): Observable<Transaction[]> {
    return this.firebaselist.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => {
          return { $key: c.key, ...c.payload.val() };
        })
      )
    );
  }

  public getLastFew(): Observable<Transaction[]> {
    return this.firebaselistReduced.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => {
          return { $key: c.key, ...c.payload.val() };
        })
      )
    );
  }

  public add(newItem: Transaction): Observable<any> {
    this.firebaselist.push(newItem);

    return of();
  }

  public edit(item: Transaction): Promise<void> {
    return this.firebaselist.update(item.$key, {
      category: item.category,
      subCategory: item.subCategory,
    //   description: item.description,
      value: item.value,
      date: item.date,
    });
  }

  public remove(item: Transaction): Promise<void> {
    return this.firebaselist.remove(item.$key);
  }
}
