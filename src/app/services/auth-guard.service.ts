import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { filter } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { getLoggingInProgress, getIsAuthenticated } from '../+auth/reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  
  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean> {
    console.log('authguard canActivate');
    return this.store.select(getLoggingInProgress).pipe(
      filter((status) => status === false),
      switchMap(() => this.store.select(getIsAuthenticated)),
      tap((auth) => {
        console.log(auth);
        if (!auth) {
          this.router.navigate(['/login']);
        }
      }),
    );
  }
}
