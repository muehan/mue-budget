

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { CategoryActions } from '../actions';
import { CategoryService } from '../services/category.service';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class CategoryEffectsService {

    constructor(
        private actions: Actions,
        private categoryService: CategoryService,
    ) { }

    @Effect()
    getPost$ = this.actions
        .ofType<CategoryActions.GetCategories>(CategoryActions.ActionTypes.GetCategories)
        .pipe(
           switchMap(x => this.categoryService.getAll()),
           map(x => new CategoryActions.GetCategoriesSuccess(x))
        )
}