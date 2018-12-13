import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../model/categroy';
import { Subcategory } from '../../model/subcategory';

export interface IEditSubcategoryData {
  category: Subcategory;
}

@Component({
  selector: 'mue-edit-subcategory',
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.scss']
})
export class EditSubcategoryComponent implements OnInit {

  public subcategoryForm = new FormControl(this.data.category.name);
  
  private subcategory: Subcategory;

  constructor(
    public dialogRef: MatDialogRef<EditSubcategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEditSubcategoryData) {
      this.subcategory = data.category;
    }

  ngOnInit() {
  }

  public save() {
    this.subcategory.name = this.subcategoryForm.value;
    this.dialogRef.close(this.subcategory);
  }

  public close() {
    this.dialogRef.close();
  }
}
