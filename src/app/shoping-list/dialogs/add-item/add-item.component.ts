import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'mue-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemDialogComponent implements OnInit {

  public newItem: string;

  constructor(
      public dialogRef: MatDialogRef<AddItemDialogComponent>
  ) { }

  ngOnInit() { }

  public close() {
    this.dialogRef.close(this.newItem);
  }

}
