import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../model/categroy';
import { Subcategory } from '../../model/subcategory';
import { Observable } from 'rxjs';
import { getAllCategories } from '../../reducers';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';

export interface IEditSubcategoryData {
  subCategory: Subcategory;
}

@Component({
  selector: 'mue-edit-subcategory',
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.scss']
})
export class EditSubcategoryComponent implements OnInit {

  public categeories$: Observable<Category[]> = this.store.select(getAllCategories);

  public subCategoryFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditSubcategoryComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: IEditSubcategoryData)
    { }

  ngOnInit() {
    this.subCategoryFormGroup = new FormGroup({
      'subcategoryName': new FormControl(this.data.subCategory.name, [Validators.required]),
      'categoryName': new FormControl(this.data.subCategory.categoryName, [Validators.required]),
    });
  }

  public save() {
    let result = {
      $key: this.data.subCategory.$key,
      categoryName: this.subCategoryFormGroup.get('categoryName').value,
      name: this.subCategoryFormGroup.get('subcategoryName').value,
    };

    this.dialogRef.close(result);
  }

  public close() {
    this.dialogRef.close();
  }
}
