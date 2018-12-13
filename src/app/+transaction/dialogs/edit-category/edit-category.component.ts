import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../model/categroy';
import { database } from 'firebase';

export interface IEditCatalogData {
  category: Category;
}

@Component({
  selector: 'mue-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  public categoryForm = new FormControl(this.data.category.name);
  
  private category: Category;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEditCatalogData) {
      this.category = data.category;
    }

  ngOnInit() {
  }

  public save() {
    this.category.name = this.categoryForm.value;
    this.dialogRef.close(this.category);
  }

  public close() {
    this.dialogRef.close();
  }
}
