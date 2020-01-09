import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Category } from '../../model/categroy';
import { getAllCategories, getAllSubcategories } from '../../reducers';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { Subcategory } from '../../model/subcategory';

@Component({
  selector: 'mue-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {

  public transactionFormGroup: FormGroup = new FormGroup({
    'valueForm': new FormControl('', [Validators.required]),
    'categoryName': new FormControl('', [Validators.required]),
    'subcategoryName': new FormControl('', [Validators.required]),
    'dateForm': new FormControl(new Date(), [Validators.required]),
  });

  public categeories$: Observable<Category[]> = this.store.select(getAllCategories);
  public subcategeories$: Observable<Subcategory[]> = this.store.select(getAllSubcategories);
  public subcategeoriesFilterd$: Observable<Subcategory[]> = this.subcategeories$;

  constructor(
    public dialogRef: MatDialogRef<AddTransactionComponent>,
    private store: Store<AppState>,) { }

  ngOnInit() {
  }

  public create() {

    let result = {
      value: this.transactionFormGroup.get('valueForm').value,
      category: this.transactionFormGroup.get('categoryName').value,
      subCategory: this.transactionFormGroup.get('subcategoryName').value,
      date: new Date(this.transactionFormGroup.get('dateForm').value).getTime(),
    };

    this.dialogRef.close(result);
  }

  public close() {
    this.dialogRef.close();
  }

  public categoryChanged ($event){
    this.subcategeoriesFilterd$ = this.subcategeories$
    .pipe(
      map(x => {
        return x.filter(sub => sub.categoryName == $event.value);
      })
    );
  }
}
