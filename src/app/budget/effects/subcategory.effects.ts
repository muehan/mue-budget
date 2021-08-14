import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { SubcategoryActions } from '../actions';
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { SubcategoryService } from '../transaction/services/subcategory.service';
import { AddCategoriesSuccess, AddCategoriesFailed, EditCategoriesSuccess, EditCategoriesFailed } from "../actions/categories-actions";
import { GetSubcategoriesSuccess, GetSubcategoriesFailed, AddSubcategoriesFailed, AddSubcategoriesSuccess, DeleteSubcategoriesFailed, DeleteSubcategoriesSuccess, EditSubcategoriesFailed, EditSubcategoriesSuccess } from "../actions/subcategories-actions";

@Injectable()
export class SubcategoryEffects {

  constructor(
    private actions$: Actions,
    private subcategoryService: SubcategoryService,
  ) { }

  getSubcategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubcategoryActions.GetSubcategories),
      switchMap((data) =>
        this.subcategoryService.getAll().pipe(
          map((response) => GetSubcategoriesSuccess({ payload: response })),
          catchError((error) => of(GetSubcategoriesFailed({ payload: error })))
        )
      )
    );
  });

  addSubCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubcategoryActions.AddSubcategories),
      switchMap((data) =>
        this.subcategoryService.add(data.payload).pipe(
          map((response) => AddSubcategoriesSuccess()),
          catchError((error) => of(AddSubcategoriesFailed({ payload: error })))
        )
      )
    );
  });

  deleteSubCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubcategoryActions.DeleteSubcategories),
      switchMap((data) =>
        this.subcategoryService
          .remove(data.payload)
          .then((_) => DeleteSubcategoriesSuccess())
          .catch((error) => DeleteSubcategoriesFailed({ payload: error }))
      )
    );
  });

  editSubCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubcategoryActions.EditSubcategories),
      switchMap((data) =>
        this.subcategoryService
          .edit(data.payload)
          .then((_) => EditSubcategoriesSuccess())
          .catch((error) => EditSubcategoriesFailed({ payload: error }))
      )
    );
  });

}