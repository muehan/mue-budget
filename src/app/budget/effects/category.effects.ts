

import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { CategoryActions } from '../actions';
import { CategoryService } from '../transaction/services/category.service';
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class CategoryEffects {

  constructor(
    private actions: Actions,
    private categoryService: CategoryService,
  ) { }

  @Effect()
  getCategories$ = this.actions
    .pipe(
      ofType<CategoryActions.GetCategories>(CategoryActions.ActionTypes.GetCategories),
      switchMap((_) => {
        return this.categoryService.getAll()
          .pipe(
            map((categories) => {
              return new CategoryActions.GetCategoriesSuccess(categories);
            }),
            catchError((error) => {
              return of(new CategoryActions.GetCategoriesFailed(error));
            })
          );
      })
    )

  @Effect()
  addCategory$ = this.actions
    .pipe(
      ofType<CategoryActions.AddCategories>(CategoryActions.ActionTypes.AddCategories),
      map(action => action.payload),
      switchMap(x => this.categoryService.add(x)
        .pipe(
          map(() => new CategoryActions.AddCategoriesSuccess()),
          catchError(error => of(new CategoryActions.AddCategoriesFailed(error)))
        ))
    )

  @Effect()
  deleteCategory$ = this.actions
    .pipe(
      ofType<CategoryActions.DeleteCategories>(CategoryActions.ActionTypes.DeleteCategories),
      map(action => action.payload),
      switchMap(x => this.categoryService.remove(x)
        .then(() => new CategoryActions.DeleteCategoriesSuccess())
        .catch(x => new CategoryActions.DeleteCategoriesFailed(x))
      )
    )

  @Effect()
  editCategory$ = this.actions
    .pipe(
      ofType<CategoryActions.EditCategories>(CategoryActions.ActionTypes.EditCategories),
      map(action => action.payload),
      switchMap(x => this.categoryService.edit(x)
        .then(() => new CategoryActions.EditCategoriesSuccess())
        .catch(x => new CategoryActions.EditCategoriesFailed(x))
      )
    )
}