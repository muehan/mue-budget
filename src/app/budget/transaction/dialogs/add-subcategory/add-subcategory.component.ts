import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../../model/categroy';
import { getAllCategories } from '../../../reducers';

@Component({
  selector: 'mue-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent implements OnInit {

  public subCategoryFormGroup: FormGroup = new FormGroup({
    'subcategoryName': new FormControl('', [Validators.required]),
    'categoryName': new FormControl('', [Validators.required]),
  });

  public categeories$: Observable<Category[]> = this.store.select(getAllCategories);

  constructor(
    public dialogRef: MatDialogRef<AddSubcategoryComponent>,
    private store: Store<AppState>,
  ) { }

  ngOnInit() { }

  public create() {

    let result = {
      categoryName: this.subCategoryFormGroup.get('categoryName').value,
      name: this.subCategoryFormGroup.get('subcategoryName').value,
    };

    this.dialogRef.close(result);
  }

  public close() {
    this.dialogRef.close();
  }
}
