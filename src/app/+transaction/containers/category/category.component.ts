import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { Observable } from 'rxjs';
import { Category } from '../../model/categroy';
import { getAllCategories } from '../../reducers';
import { CategoryActions } from '../../actions';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../../dialogs/add-category/add-category.component';

@Component({
  selector: 'app-category',
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
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new CategoryActions.AddCategories({ name: result }));
      }
    });
  }

}
