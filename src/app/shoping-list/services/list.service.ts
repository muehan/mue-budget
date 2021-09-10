import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ShoppingItem } from '../models/shopping-item';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private items$: Observable<ShoppingItem[]>;
  private itemArray: Array<ShoppingItem>;
  private itemsSubscription: Subscription;

  constructor(
    private firebase: AngularFireDatabase,
  ) {
    console.log('list service constructor is called');
  }

  public initialize() {
    this.items$ = this.firebase
      .list<ShoppingItem>('items')
      .snapshotChanges()
      .pipe(
        map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))),
        map(x => x.sort(compareFn))
      );
    this.itemsSubscription = this.items$.subscribe(x => this.itemArray = x);
  }

  public unSubscribe() {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
  }

  public getAll(): Observable<ShoppingItem[]> {
    return this.items$
      .pipe(
        map(x => x.sort((a, b) => {
          // console.log(a.orderPosition);
          // console.log(b.orderPosition);
          return a.orderPosition < b.orderPosition ? -1 : 1;
        })));
  }

  public add(newItem: Partial<ShoppingItem>): any {
    newItem.orderPosition = this.getnextOrderPosition();
    this.firebase.list('items').push(newItem);
  }

  public update(item: ShoppingItem) {
    let key = item.$key;
    delete item.$key;
    this.firebase.list('items').update(key, item);
  }

  public removeCheckedItems() {
    this.itemArray
      .filter(x => x.checked)
      .forEach(item => this.firebase
        .list('items')
        .remove(item.$key));
  }

  remove(item: ShoppingItem) {
    this.firebase
      .list('items')
      .remove(item.$key)
      .then(_ => console.log('item deleted'));
  }

  private getnextOrderPosition(): number {
    let highestNumber = Math.max(...this.itemArray.map(x => x.orderPosition));
    console.log(highestNumber);
    if (highestNumber <= 0 ||
      highestNumber === Number.NEGATIVE_INFINITY ||
      highestNumber === Number.POSITIVE_INFINITY) {
      return 1;
    }
    return highestNumber + 1;
  }
}

const compareFn = (a, b) => {
  if (a.orderPosition < b.orderPosition) {
    return -1;
  }
  if (a.orderPosition > b.orderPosition) {
    return 1;
  }
  return 0;
};
