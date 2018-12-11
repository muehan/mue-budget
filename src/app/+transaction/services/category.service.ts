import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Category } from '../model/categroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class CategoryService {

    private items$: Observable<Category[]>;

    constructor(
        private firebase: AngularFireDatabase,
    ) {
        this.items$ = this.firebase
            .list<Category>('category')
            .snapshotChanges()
            .pipe(
                map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() })))
            )
    }

    public getAll(): Observable<Category[]> {
        return this.items$;
      }
}