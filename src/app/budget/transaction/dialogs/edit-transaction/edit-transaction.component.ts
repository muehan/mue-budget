import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Category } from '../../model/categroy';
import { Transaction } from '../../model/transaction';
import { Subcategory } from '../../model/subcategory';
import { map } from 'rxjs/operators';

export interface IEditTransactionData {
  transaction: Transaction;
  categories$: Observable<Category[]>;
  subcategeories$: Observable<Subcategory[]>;
}

@Component({
  selector: 'mue-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss']
})
export class EditTransactionComponent implements OnInit {

  public transactionFormGroup: FormGroup;
  public subcategeoriesFilterd$: Observable<Subcategory[]> = this.data.subcategeories$.pipe(
    map(x => {
      return x.filter(sub => sub.categoryName == this.data.transaction.category);
    })
  );

  constructor(
    public dialogRef: MatDialogRef<EditTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEditTransactionData) { }

  ngOnInit() {
    this.transactionFormGroup = new FormGroup({
      'valueForm': new FormControl(this.data.transaction.value, [Validators.required]),
      'categoryNameForm': new FormControl(this.data.transaction.category, [Validators.required]),
      'subcategoryName': new FormControl(this.data.transaction.subCategory, [Validators.required]),
      'dateForm': new FormControl(new Date(this.data.transaction.date), [Validators.required]),
    });
  }

  public create() {

    let result = {
      ...this.data.transaction,
      value: this.transactionFormGroup.get('valueForm').value,
      category: this.transactionFormGroup.get('categoryNameForm').value,
      subCategory: this.transactionFormGroup.get('subcategoryName').value,
      date: new Date(this.transactionFormGroup.get('dateForm').value).getTime(),
    };

    this.dialogRef.close(result);
  }

  public categoryChanged ($event){
    this.subcategeoriesFilterd$ = this.data.subcategeories$
    .pipe(
      map(x => {
        return x.filter(sub => sub.categoryName == $event.value);
      })
    );
  }

  public close() {
    this.dialogRef.close();
  }
}
