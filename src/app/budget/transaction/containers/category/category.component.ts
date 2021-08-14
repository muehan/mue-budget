import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state";
import { Observable } from "rxjs";
import { Category } from "../../model/categroy";
import { getAllCategories } from "../../../reducers";
import { CategoryActions } from "../../../actions";
import { MatDialog } from "@angular/material/dialog";
import { AddCategoryComponent } from "../../dialogs/add-category/add-category.component";
import { EditCategoryComponent } from "../../dialogs/edit-category/edit-category.component";
import {
  AddCategorie,
  DeleteCategorie,
  EditCategories,
  GetCategories,
} from "../../../actions/categories-actions";

@Component({
  selector: "mue-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  public categories$: Observable<Category[]> =
    this.store.select(getAllCategories);

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    this.store.dispatch(GetCategories());
  }

  ngOnInit() {}

  public create() {
    let dialogRef = this.dialog.open(AddCategoryComponent, {
      height: "190px",
      width: "90%",
      maxWidth: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(AddCategorie({ payload: result }));
      }
    });
  }

  public remove(item: Category) {
    this.store.dispatch(DeleteCategorie({ payload: item }));
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
        this.store.dispatch(EditCategories({ payload: result }));
      }
    });
  }
}
