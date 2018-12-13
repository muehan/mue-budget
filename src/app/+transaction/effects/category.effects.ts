

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { CategoryActions } from '../actions';
import { CategoryService } from '../services/category.service';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CategoryEffects {

  constructor(
    private actions: Actions,
    private categoryService: CategoryService,
  ) { }

  @Effect()
  getCategories$ = this.actions
    .ofType<CategoryActions.GetCategories>(CategoryActions.ActionTypes.GetCategories)
    .pipe(
      switchMap((_) => {
        console.log('getCategories');
        return this.categoryService.getAll()
          .pipe(
            map((categories) => {
              console.log('categories: ' + categories);
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
    .ofType<CategoryActions.AddCategories>(CategoryActions.ActionTypes.AddCategories)
    .pipe(
      map(action => action.payload),
      switchMap(x => this.categoryService.add(x)
        .pipe(
          map(x => new CategoryActions.AddCategoriesSuccess()),
          catchError(error => of(new CategoryActions.AddCategoriesFailed(error)))
        ))
    )

  @Effect()
  deleteCategory$ = this.actions
    .ofType<CategoryActions.DeleteCategories>(CategoryActions.ActionTypes.DeleteCategories)
    .pipe(
      map(action => action.payload),
      switchMap(x => this.categoryService.remove(x)
        .then(x => new CategoryActions.DeleteCategoriesSuccess())
        .catch(x => new CategoryActions.DeleteCategoriesFailed(x))
      )
    )
}