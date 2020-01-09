import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'mue-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  public category = new FormControl('');
  public color = new FormControl('');

  private selectedColor: string;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>, ) { }

  ngOnInit() {
  }

  public create() {
    this.dialogRef.close(
      {
        name: this.category.value,
        color: this.selectedColor,
      });
  }

  public close() {
    this.dialogRef.close();
  }

  public colorSelected($event) {
    this.selectedColor = $event;
  }
}
