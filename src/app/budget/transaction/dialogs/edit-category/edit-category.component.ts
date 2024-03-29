import { Component, OnInit, Inject } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Category } from "../../model/categroy";

export interface IEditCatalogData {
  category: Category;
}

@Component({
  selector: "mue-edit-category",
  templateUrl: "./edit-category.component.html",
  styleUrls: ["./edit-category.component.scss"],
})
export class EditCategoryComponent implements OnInit {
  public categoryForm = new UntypedFormControl(this.data.category.name);

  private category: Category;
  private selectedColor: string;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEditCatalogData
  ) {
    this.category = data.category;
  }

  ngOnInit() {}

  public save() {
    if (this.selectedColor) {
      this.category = {
        ...this.category,
        name: this.categoryForm.value,
        color: this.selectedColor,
      };
      this.dialogRef.close(this.category);
    } else {
      this.category = {
        ...this.category,
        name: this.categoryForm.value,
      };
      this.dialogRef.close(this.category);
    }
  }

  public colorSelected($event) {
    this.selectedColor = $event;
  }

  public close() {
    this.dialogRef.close();
  }
}
