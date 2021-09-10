import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Subcategory } from "../model/subcategory";

@Injectable({
  providedIn: "root",
})
export class SubcategoryService {
  private firebaselist: AngularFireList<Subcategory>;

  constructor(private firebase: AngularFireDatabase) {}

  public init() {
    this.firebaselist = this.firebase.list("subSubcategory");
  }

  public getAll(): Observable<Subcategory[]> {
    return this.firebaselist.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => {
          return { $key: c.key, ...c.payload.val() };
        })
      )
    );
  }

  public add(newItem: Subcategory): Observable<any> {
    this.firebaselist.push(newItem);

    return of();
  }

  public edit(item: Subcategory): Promise<void> {
    return this.firebaselist.update(item.$key, {
      categoryName: item.categoryName,
      name: item.name,
    });
  }

  public remove(item: Subcategory): Promise<void> {
    return this.firebaselist.remove(item.$key);
  }
}
