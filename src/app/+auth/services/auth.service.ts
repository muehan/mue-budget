import { Injectable } from "@angular/core";
import firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state";
import { Router } from "@angular/router";
import { Initialize, LoginFailer, LoginSuccess } from "../actions/auth-actions";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private user: firebase.User = null;
  private isLoading$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(
    true
  );

  constructor(
    private firebaseAuth: AngularFireAuth,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.store.dispatch(Initialize());
    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        let userClone: firebase.User = {
          displayName: user.displayName,
          delete: user.delete,
          emailVerified: user.emailVerified,
          getIdTokenResult: user.getIdTokenResult,
          getIdToken: user.getIdToken,
          isAnonymous: user.isAnonymous,
          linkAndRetrieveDataWithCredential: user.linkAndRetrieveDataWithCredential,
          linkWithCredential: user.linkWithCredential,
          linkWithPhoneNumber: user.linkWithPhoneNumber,
          linkWithPopup: user.linkWithPopup,
          linkWithRedirect: user.linkWithRedirect,
          metadata: user.metadata,
          multiFactor: null,
          phoneNumber: user.phoneNumber,
          providerData: user.providerData,
          reauthenticateAndRetrieveDataWithCredential: user.reauthenticateAndRetrieveDataWithCredential,
          reauthenticateWithCredential: user.reauthenticateWithCredential,
          reauthenticateWithPhoneNumber: user.reauthenticateWithPhoneNumber,
          reauthenticateWithPopup: user.reauthenticateWithPopup,
          reauthenticateWithRedirect: user.reauthenticateWithRedirect,
          refreshToken: user.refreshToken,
          reload: user.reload,
          sendEmailVerification: user.sendEmailVerification,
          tenantId: user.tenantId,
          toJSON: user.toJSON,
          unlink: user.unlink,
          updateEmail: user.updateEmail,
          updatePassword: user.updatePassword,
          updatePhoneNumber: user.updatePhoneNumber,
          updateProfile: user.updateProfile,
          verifyBeforeUpdateEmail: user.verifyBeforeUpdateEmail,
          email: user.email,
          photoURL: user.photoURL,
          providerId: user.providerId,
          uid: user.uid,
        }

        this.store.dispatch(LoginSuccess({ user: userClone }));
      } else {
        this.store.dispatch(LoginFailer({ error: "relogin failed" }));
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

  public emailLogin(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    console.log("login with mail");
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  public logout() {
    this.firebaseAuth.signOut().finally(() => {
      this.user = null;
      this.router.navigate(["/login"]);
    });
  }

  public resetPassword(newPassword: string, oldPassword: string): Promise<any> {
    return this.reautenticate(oldPassword).then((_) =>
      this.user.updatePassword(newPassword)
    );
  }

  private reautenticate(oldPassword: string): Promise<any> {
    let credential = firebase.auth.EmailAuthProvider.credential(
      this.user.email,
      oldPassword
    );

    return this.user.reauthenticateWithCredential(credential);
  }
}
