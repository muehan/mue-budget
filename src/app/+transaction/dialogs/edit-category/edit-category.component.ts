import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'mue-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  public category = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<EditCategoryComponent>, ) { }

  ngOnInit() {
  }

  public create() {
    this.dialogRef.close(this.category.value);
  }

  public close() {
    this.dialogRef.close();
  }
}
