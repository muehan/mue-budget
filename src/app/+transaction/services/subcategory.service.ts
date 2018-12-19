import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Subcategory } from '../model/subcategory';

@Injectable({
    providedIn: 'root'
})
export class SubcategoryService {

    private firebaselist: AngularFireList<Subcategory>;

    constructor(
        private firebase: AngularFireDatabase,
    ) {
        this.firebaselist = this.firebase.list('subSubcategory');
    }

    public getAll(): Observable<Subcategory[]> {
        return this.firebaselist
            .snapshotChanges()
            .pipe(
                map(
                    changes => changes
                        .map(c => {
                            return { $key: c.key, ...c.payload.val() }
                        })))
    }

    public add(newItem: Subcategory): Observable<any> {
        console.log(newItem);
        this.firebaselist.push(newItem);

        return of();
    }

    public edit(item: Subcategory): Promise<void> {
        let key = item.$key;
        delete item.$key;
        console.log(item);
        return this.firebaselist.update(key, item);
    }

    public remove(item: Subcategory): Promise<void> {
        return this.firebaselist.remove(item.$key);
    }

}