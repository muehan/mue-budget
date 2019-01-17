import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Transaction } from '../model/transaction';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    private firebaselist: AngularFireList<Transaction>;

    constructor(
        private firebase: AngularFireDatabase,
    ) {
        this.firebaselist = this.firebase.list('transactions');
    }

    public getAll(): Observable<Transaction[]> {
        return this.firebaselist
            .snapshotChanges()
            .pipe(
                map(
                    changes =>
                        changes
                            .map(c => {
                                return { $key: c.key, ...c.payload.val() }
                            })))
    }

    public add(newItem: Transaction): Observable<any> {
        console.log(newItem);
        this.firebaselist.push(newItem);

        return of();
    }

    public edit(item: Transaction): Promise<void> {
        let key = item.$key;
        delete item.$key;
        return this.firebaselist.update(key, item);
    }

    public remove(item: Transaction): Promise<void> {
        return this.firebaselist.remove(item.$key);
    }

}