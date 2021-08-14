import { Injectable } from '@angular/core';
import firebase from 'firebase/app'
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { Router } from '@angular/router';
import { LoginFailer, loginSuccess } from '../actions/auth-actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: firebase.User = null;
  private isLoading$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(true);

  constructor(
    private firebaseAuth: AngularFireAuth,
    private store: Store<AppState>,
    private router: Router,
  ) {
    this.store.dispatch({ type: '[Auth] Login Initialize' })
    this.firebaseAuth
      .authState
      .subscribe(
        user => {
          if (user) {
            this.store.dispatch(loginSuccess({user: user}))
          } else {
            this.store.dispatch(LoginFailer({error: 'relogin failed'}))
          }
    });
  }

  public get loading$(): Observable<Boolean> {
    return this.isLoading$.asObservable();
  }

  public get authenticated(): boolean {
    return this.user !== null;
  }

  public get currentUser() {
    return this.firebaseAuth.user;
  }

  public emailLogin(email: string, password: string): Promise<firebase.auth.UserCredential> {
    console.log('login with mail');
    return this.firebaseAuth
      .signInWithEmailAndPassword(
        email,
        password);
  }

  public logout() {
    this.firebaseAuth
      .signOut()
      .finally(() => {
        this.user = null;
        this.router.navigate(['/login']);
      });
  }

  public resetPassword(newPassword: string, oldPassword: string): Promise<any> {
    return this.reautenticate(oldPassword)
      .then((_) => this.user.updatePassword(newPassword));
  }

  private reautenticate(oldPassword: string): Promise<any> {
    let credential = firebase.auth.EmailAuthProvider.credential(
      this.user.email,
      oldPassword
    );

    return this.user.reauthenticateWithCredential(credential);
  }
}
