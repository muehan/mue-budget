

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { SubcategoryActions } from '../actions';
import { CategoryService } from '../services/category.service';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SubcategoryService } from '../services/subcategory.service';

@Injectable()
export class SubcategoryEffects {

  constructor(
    private actions: Actions,
    private subcategoryService: SubcategoryService,
  ) { }

  @Effect()
  getSubcategories$ = this.actions
    .ofType<SubcategoryActions.GetSubcategories>(SubcategoryActions.ActionTypes.GetSubcategories)
    .pipe(
      switchMap((_) => {
        return this.subcategoryService.getAll()
          .pipe(
            map((Subcategories) => {
              return new SubcategoryActions.GetSubcategoriesSuccess(Subcategories);
            }),
            catchError((error) => {
              return of(new SubcategoryActions.GetSubcategoriesFailed(error));
            })
          );
      })
    )

  @Effect()
  addCategory$ = this.actions
    .ofType<SubcategoryActions.AddSubcategories>(SubcategoryActions.ActionTypes.AddSubcategories)
    .pipe(
      map(action => action.payload),
      switchMap(x => this.subcategoryService.add(x)
        .pipe(
          map(x => new SubcategoryActions.AddSubcategoriesSuccess()),
          catchError(error => of(new SubcategoryActions.AddSubcategoriesFailed(error)))
        ))
    )

  @Effect()
  deleteCategory$ = this.actions
    .ofType<SubcategoryActions.DeleteSubcategories>(SubcategoryActions.ActionTypes.DeleteSubcategories)
    .pipe(
      map(action => action.payload),
      switchMap(x => this.subcategoryService.remove(x)
        .then(x => new SubcategoryActions.DeleteSubcategoriesSuccess())
        .catch(x => new SubcategoryActions.DeleteSubcategoriesFailed(x))
      )
    )

  @Effect()
  editCategory$ = this.actions
    .ofType<SubcategoryActions.EditSubcategories>(SubcategoryActions.ActionTypes.EditSubcategories)
    .pipe(
      map(action => action.payload),
      switchMap(x => this.subcategoryService.edit(x)
        .then(x => new SubcategoryActions.EditSubcategoriesSuccess())
        .catch(x => new SubcategoryActions.EditSubcategoriesFailed(x))
      )
    )
}