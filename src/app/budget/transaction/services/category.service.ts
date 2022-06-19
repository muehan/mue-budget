import { Injectable } from "@angular/core";
import { Category } from "../model/categroy";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFireList, AngularFireDatabase } from "@angular/fire/compat/database";

@Injectable({
  providedIn: "root",
})
export class CategoryService {

  private categories$: BehaviorSubject<Category[]> = new BehaviorSubject<
    Category[]
  >([]);

  constructor(private firebase: AngularFireDatabase) {

    this.firebase
      .list<Category>("category")
      .snapshotChanges()
      .pipe(
        map((transactions) =>
          transactions.map((c) => {
            return { $key: c.key, ...c.payload.val() };
          })
        )
      )
      .subscribe(this.categories$);

  }

  public getAll(): Observable<Category[]> {
    console.log("get all categories");
    return this.categories$.asObservable();
  }

  public add(newItem: Category): Observable<any> {
    this.firebase.list("category").push(newItem);

    return of();
  }

  public edit(item: Category): Promise<void> {
    return this.firebase.list("category").update(item.$key, {
      color: item.color,
      name: item.name,
    });
  }

  public remove(item: Category): Promise<void> {
    return this.firebase.list("category").remove(item.$key);
  }
}
