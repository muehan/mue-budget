import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Subcategory } from "../../model/subcategory";
import { MatDialog } from "@angular/material/dialog";
import { AddSubcategoryComponent } from "../../dialogs/add-subcategory/add-subcategory.component";
import { EditSubcategoryComponent } from "../../dialogs/edit-subcategory/edit-subcategory.component";
import { CategoryService } from "../../services/category.service";
import { SubcategoryService } from "../../services/subcategory.service";

@Component({
  selector: "mue-subcategory",
  templateUrl: "./subcategory.component.html",
  styleUrls: ["./subcategory.component.scss"],
})
export class SubcategoryComponent implements OnInit {
  public subcategories$: Observable<Subcategory[]> = this.subcategoryService.getAll();

  constructor(
    public categoryService: CategoryService,
    public subcategoryService: SubcategoryService,
    private dialog: MatDialog) {
  }

  ngOnInit() {}

  public create() {
    let dialogRef = this.dialog.open(AddSubcategoryComponent, {
      height: "215px",
      width: "300px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.subcategoryService.add(result);
      }
    });
  }

  public remove(item: Subcategory) {
    this.subcategoryService.remove(item);
  }

  public edit(item: Subcategory) {
    let dialogRef = this.dialog.open(EditSubcategoryComponent, {
      height: "215px",
      width: "230px",
      data: { subCategory: item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subcategoryService.edit(result);
      }
    });
  }
}
