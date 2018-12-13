import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'mue-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent implements OnInit {

  public subcategoryForm = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<AddSubcategoryComponent>, ) { }

  ngOnInit() {
  }

  public create() {
    this.dialogRef.close(this.subcategoryForm.value);
  }

  public close() {
    this.dialogRef.close();
  }
}
