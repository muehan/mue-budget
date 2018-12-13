import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  public category = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,)
    { }

  ngOnInit() {
  }

  public create() {
    this.dialogRef.close(this.category.value)
  }

}
