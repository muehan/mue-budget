import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Category } from '../model/categroy';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private firebaselist: AngularFireList<Category>;

    constructor(
        private firebase: AngularFireDatabase,
    ) {
        this.firebaselist = this.firebase.list('category');
    }

    public getAll(): Observable<Category[]> {
        return this.firebase
            .list<Category>('category')
            .snapshotChanges()
            .pipe(
                map(
                    changes => changes
                        .map(c => {
                            return { $key: c.key, ...c.payload.val() }
                        })))
    }

    public add(newItem: Category): Observable<any> {
        console.log(newItem);
        this.firebaselist.push(newItem);

        return of();
    }

    public remove(item: Category) {
        return this.firebaselist.remove(item.$key);
    }

}