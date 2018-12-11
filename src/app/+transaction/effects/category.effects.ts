

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { CategoryActions } from '../actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Category } from '../model/categroy';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable()
export class CategoryEffectsService {

    constructor(
        private actions: Actions,
        private db: AngularFireDatabase,
    ) { }

    @Effect()
    getPost: Observable<Action> = this.actions.ofType(CategoryActions.GetCategories)
      .map((action: CategoryActions.GetCategories) => action )
      .delay(2000) // delay to show spinner
      .mergeMap(payload => this.db.object(payload))
      .map(post => {
        post.pushKey = post.$key;
        return new CategoryActions.GetCategoriesSuccess(post);
      });
       
}