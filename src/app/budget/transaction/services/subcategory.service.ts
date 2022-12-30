import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Subcategory } from "../model/subcategory";

@Injectable({
  providedIn: "root",
})
export class SubcategoryService {
 
  constructor(private firebase: AngularFireDatabase) {}

  public getAll(): Observable<Subcategory[]> {
    return this.firebase.list<Subcategory>("subSubcategory")
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            return { $key: c.key, ...c.payload.val() };
          })
        )
    );
  }

  public add(newItem: Subcategory): Observable<any> {
    this.firebase.list<Subcategory>("subSubcategory").push(newItem);

    return of();
  }

  public edit(item: Subcategory): Promise<void> {
    return this.firebase.list<Subcategory>("subSubcategory").update(item.$key, {
      categoryName: item.categoryName,
      name: item.name,
    });
  }

  public remove(item: Subcategory): Promise<void> {
    return this.firebase.list<Subcategory>("subSubcategory").remove(item.$key);
  }
}
