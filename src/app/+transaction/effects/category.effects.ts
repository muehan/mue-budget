

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { CategoryActions } from '../actions';
import { CategoryService } from '../services/category.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CategoryEffectsService {

  constructor(
    private actions: Actions,
    private categoryService: CategoryService,
  ) { }

  @Effect()
  getCategories$ = this.actions
    .ofType<CategoryActions.GetCategories>(CategoryActions.ActionTypes.GetCategories)
    .pipe(
      switchMap(x => this.categoryService.getAll()),
      map(x => new CategoryActions.GetCategoriesSuccess(x))
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
}