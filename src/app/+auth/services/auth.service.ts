import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { AuthActions } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState: firebase.User = null;
  private isLoading$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(true);

  constructor(
    private firebaseAuth: AngularFireAuth,
    private store: Store<AppState>,
  ) {
    this.store.dispatch(new AuthActions.Initialize())
    this.firebaseAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new AuthActions.LoginSuccess(user))
      } else {
        this.store.dispatch(new AuthActions.LoginFailer(''))
      }
    });
  }

  public get loading$(): Observable<Boolean> {
    return this.isLoading$.asObservable();
  }

  public get authenticated(): boolean {
    return this.authState !== null;
  }

  public get currentUser() {
    return this.firebaseAuth.auth.currentUser;
  }

  public emailLogin(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }

  public logout() {
    this.isLoading$.next(true);
    this.firebaseAuth.auth.signOut();
    this.authState = null;
  }

  public resetPassword(newPassword: string, oldPassword: string): Promise<any> {
    return this.reautenticate(oldPassword)
      .then((_) => this.authState.updatePassword(newPassword));
  }

  private reautenticate(oldPassword: string): Promise<any> {
    let credential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );

    return this.authState.reauthenticateWithCredential(credential);
  }
}
