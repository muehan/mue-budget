import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { CategoryActions } from "../actions";
import { CategoryService } from "../transaction/services/category.service";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import {
  AddCategoriesFailed,
  AddCategoriesSuccess,
  EditCategoriesFailed,
  EditCategoriesSuccess,
  GetCategoriesFailed,
  GetCategoriesSuccess,
} from "../actions/categories-actions";

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}

  getCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.GetCategories),
      switchMap((data) =>
        this.categoryService.getAll().pipe(
          map((response) => GetCategoriesSuccess({ payload: response })),
          catchError((error) => of(GetCategoriesFailed({ payload: error })))
        )
      )
    );
  });

  addCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.AddCategorie),
      switchMap((data) =>
        this.categoryService.add(data.payload).pipe(
          map((response) => AddCategoriesSuccess()),
          catchError((error) => of(AddCategoriesFailed({ payload: error })))
        )
      )
    );
  });

  deleteCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.DeleteCategorie),
      switchMap((data) =>
        this.categoryService
          .remove(data.payload)
          .then((_) => AddCategoriesSuccess())
          .catch((error) => AddCategoriesFailed({ payload: error }))
      )
    );
  });

  editCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.EditCategories),
      switchMap((data) =>
        this.categoryService
          .edit(data.payload)
          .then((_) => EditCategoriesSuccess())
          .catch((error) => EditCategoriesFailed({ payload: error }))
      )
    );
  });
}
