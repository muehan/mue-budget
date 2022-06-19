import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../model/categroy';
import { Subcategory } from '../../model/subcategory';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';

export interface IEditSubcategoryData {
  subCategory: Subcategory;
}

@Component({
  selector: 'mue-edit-subcategory',
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.scss']
})
export class EditSubcategoryComponent implements OnInit {

  public categeories$: Observable<Category[]> = this.categoryService.getAll();

  public subCategoryFormGroup: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditSubcategoryComponent>,
    public categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: IEditSubcategoryData)
    { }

  ngOnInit() {
    this.subCategoryFormGroup = new UntypedFormGroup({
      'subcategoryName': new UntypedFormControl(this.data.subCategory.name, [Validators.required]),
      'categoryName': new UntypedFormControl(this.data.subCategory.categoryName, [Validators.required]),
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
