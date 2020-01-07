
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { AuthService } from '../services/auth.service';
import { AuthActions } from '../actions';
import { map } from "rxjs/internal/operators/map";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

    constructor(
        private authService: AuthService,
        private actions$: Actions,
    ) { }

    @Effect()
    login$ = this.actions$
        .pipe(
            ofType<AuthActions.Login>(AuthActions.ActionTypes.Login),
            map(action => action.payload),
            switchMap(data => this.authService.emailLogin(data.mail, data.password)
                .then(x => new AuthActions.LoginSuccess(x.user))
                .catch(x => {
                    console.log(x);
                    return of(new AuthActions.LoginFailer(x))
                })
            ))
}