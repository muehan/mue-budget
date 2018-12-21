import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Category } from '../../model/categroy';
import { getAllCategories } from '../../reducers';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'mue-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {

  public transactionFormGroup: FormGroup = new FormGroup({
    'descriptionForm': new FormControl('', [Validators.required]),
    'valueForm': new FormControl('', [Validators.required]),
    'categoryName': new FormControl('', [Validators.required]),
  });

  public categeories$: Observable<Category[]> = this.store.select(getAllCategories);

  constructor(
    public dialogRef: MatDialogRef<AddTransactionComponent>,
    private store: Store<AppState>,) { }

  ngOnInit() {
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