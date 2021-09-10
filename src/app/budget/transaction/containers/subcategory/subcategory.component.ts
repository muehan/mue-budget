import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Subcategory } from "../../model/subcategory";
import { getAllSubcategories } from "../../../reducers";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state";
import { MatDialog } from "@angular/material/dialog";
import { AddSubcategoryComponent } from "../../dialogs/add-subcategory/add-subcategory.component";
import { EditSubcategoryComponent } from "../../dialogs/edit-subcategory/edit-subcategory.component";
import {
  AddSubcategories,
  DeleteSubcategories,
  EditSubcategories,
  GetSubcategories,
} from "src/app/budget/actions/subcategories-actions";
import { GetCategories } from "src/app/budget/actions/categories-actions";

@Component({
  selector: "mue-subcategory",
  templateUrl: "./subcategory.component.html",
  styleUrls: ["./subcategory.component.scss"],
})
export class SubcategoryComponent implements OnInit {
  public subcategories$: Observable<Subcategory[]> =
    this.store.select(getAllSubcategories);

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.store.dispatch(GetSubcategories());
    this.store.dispatch(GetCategories());
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
        this.store.dispatch(AddSubcategories({ payload: result }));
      }
    });
  }

  public remove(item: Subcategory) {
    this.store.dispatch(DeleteSubcategories({ payload: item }));
  }

  public edit(item: Subcategory) {
    let dialogRef = this.dialog.open(EditSubcategoryComponent, {
      height: "215px",
      width: "230px",
      data: { subCategory: item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(EditSubcategories({ payload: result }));
      }
    });
  }
}
