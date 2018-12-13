import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { Observable } from 'rxjs';
import { Category } from '../../model/categroy';
import { getAllCategories } from '../../reducers';
import { CategoryActions } from '../../actions';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../../dialogs/add-category/add-category.component';
import { EditCategoryComponent } from '../../dialogs/edit-category/edit-category.component';

@Component({
  selector: 'mue-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public categories$: Observable<Category[]> = this.store.select(getAllCategories);

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
  ) {
    this.store
      .dispatch(
        new CategoryActions.GetCategories())
  }

  ngOnInit() {
  }

  public create() {
    let dialogRef = this.dialog.open(AddCategoryComponent, {
      height: '150px',
      width: '230px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new CategoryActions.AddCategories({ name: result }));
      }
    });
  }

  public remove(item: Category) {
    this.store.dispatch(new CategoryActions.DeleteCategories(item));
  }

  public edit(item: Category) {
    let dialogRef = this.dialog.open(
      EditCategoryComponent, {
        height: '150px',
        width: '230px',
        data: { category: item },
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new CategoryActions.EditCategories(result));
      }
    });
  }

}
