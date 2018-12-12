import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Category } from '../model/categroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class CategoryService {

    private items$: Observable<Category[]>;
    private firebaselist: AngularFireList<Category>;

    constructor(
        private firebase: AngularFireDatabase,
    ) {
        this.firebaselist = this.firebase.list('category');

        this.items$ = this.firebaselist
            .snapshotChanges()
            .pipe(
                map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() })))
            )
    }

    public getAll(): Observable<Category[]> {
        return this.items$;
    }

    public add(newItem: Category): any {
        this.firebaselist.push(newItem);
    }

}