

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { CategoryActions } from '../actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Category } from '../model/categroy';

@Injectable()
export class CategoryEffectsService {

    constructor(
        private actions$: Actions,
        private db: AngularFireDatabase,
    ) { }

    // @Effect()
    // login$ = this.actions$
    //     .ofType<CategoryActions.GetCategories>(CategoryActions.ActionTypes.GetCategories)
       
}