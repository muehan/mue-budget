import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Category } from '../../model/categroy';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'mue-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent implements OnInit {

  public subCategoryFormGroup: UntypedFormGroup = new UntypedFormGroup({
    'subcategoryName': new UntypedFormControl('', [Validators.required]),
    'categoryName': new UntypedFormControl('', [Validators.required]),
  });

  public categeories$: Observable<Category[]> = this.categoryService.getAll();

  constructor(
    public dialogRef: MatDialogRef<AddSubcategoryComponent>,
    public categoryService: CategoryService,
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
