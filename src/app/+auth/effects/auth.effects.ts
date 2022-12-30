import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AuthActions } from "../actions";
import { switchMap } from "rxjs/operators";
import { LoginFailer, LoginSuccess } from "../actions/auth-actions";

@Injectable()
export class AuthEffects {
  constructor(
      private authService: AuthService,
      private actions$: Actions) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.Login),
      switchMap((data) =>
        this.authService
          .emailLogin(data.mail, data.password)
          .then((response) => LoginSuccess({ user: response.user }))
          .catch((error) => LoginFailer({ error: error }))
      )
    );
  });
}
