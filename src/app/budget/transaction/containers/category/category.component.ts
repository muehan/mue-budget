import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../../model/categroy";
import { MatDialog } from "@angular/material/dialog";
import { AddCategoryComponent } from "../../dialogs/add-category/add-category.component";
import { EditCategoryComponent } from "../../dialogs/edit-category/edit-category.component";
import { CategoryService } from "../../services/category.service";

@Component({
  selector: "mue-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  public categories$: Observable<Category[]> = this.categoryService.getAll();

  constructor(
    public categoryService: CategoryService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  public create() {
    let dialogRef = this.dialog.open(AddCategoryComponent, {
      height: "190px",
      width: "90%",
      maxWidth: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.add(result);
      }
    });
  }

  public remove(item: Category) {
    this.categoryService.remove(item);
  }

  public edit(item: Category) {
    let dialogRef = this.dialog.open(EditCategoryComponent, {
      height: "190px",
      width: "90%",
      maxWidth: "500px",
      data: { category: item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.edit(result);
      }
    });
  }
}
