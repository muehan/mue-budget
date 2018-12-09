import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state';
import { AuthActions } from '../../actions';
import { getLoggingInProgress, getIsAuthenticated, getLoginErrors } from '../../reducers';
import { filter } from 'rxjs/internal/operators/filter';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public error$: Observable<any> = this.store.select(getLoginErrors);
  public isLogIn$: Observable<boolean> = this.store.select(getLoggingInProgress);
  public loginFormGroup: FormGroup;

  constructor(
    private store: Store<AppState>,
    public router: Router,
  ) {
    let storedMail = localStorage.getItem('mail');

    this.loginFormGroup = new FormGroup({
      mail: new FormControl(storedMail, [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.store.select(getIsAuthenticated)
    .pipe(
      filter(x => x === true),
    ).subscribe(_ =>{
      this.router.navigate(['list']);
    });
  }

  ngOnInit() { }

  login() {
    const mail = this.loginFormGroup.get('mail').value;
    const password = this.loginFormGroup.get('password').value;

    localStorage.setItem('mail', mail);

    this.store.dispatch(new AuthActions.Login({
      mail: mail,
      password: password,
    }));

    // this.waitUntilLoginComplete()
    //   .subscribe(_ => {
    //     this.router.navigate(['list']);
    //   })
  }

  // private waitUntilLoginComplete(): Observable<boolean> {
  //   return this.store.select(getLoggingInProgress).pipe(
  //     withLatestFrom(this.store.select(getLoginErrors)),
  //     filter(([inProgress]) => !inProgress),
  //     switchMap(([, errors]) => {
  //       if (!errors) {
  //         return of(undefined);
  //       } else {
  //         return throwError(errors);
  //       }
  //     })
  //   );
  // }
}
