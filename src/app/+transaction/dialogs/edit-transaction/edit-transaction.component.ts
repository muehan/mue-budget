import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Category } from '../../model/categroy';
import { Transaction } from '../../model/transaction';

export interface IEditTransactionData {
  transaction: Transaction;
  categories$: Observable<Category[]>
}

@Component({
  selector: 'mue-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss']
})
export class EditTransactionComponent implements OnInit {

  public transactionFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEditTransactionData) { }

  ngOnInit() {
    this.transactionFormGroup = new FormGroup({
      'descriptionForm': new FormControl(this.data.transaction.description, [Validators.required]),
      'valueForm': new FormControl(this.data.transaction.value, [Validators.required]),
      'categoryName': new FormControl(this.data.transaction.category, [Validators.required]),
    });
  }

  public create() {
    let result = {
      description: this.transactionFormGroup.get('descriptionForm').value,
      value: this.transactionFormGroup.get('valueForm').value,
      category: this.transactionFormGroup.get('categoryName').value,
    };

    this.dialogRef.close(result);
  }

  public close() {
    this.dialogRef.close();
  }
}
