import { Action } from '@ngrx/store';
import { FireBaseLoginModel } from '../models/firebase.models';

export enum ActionTypes {
    Login = '[Auth] Login',
    LoginSuccess = '[Auth] Login Success',
    LoginFailer = '[Auth] Login Failer',
}

export class Login implements Action {
    readonly type = ActionTypes.Login;

    constructor(public payload: FireBaseLoginModel) { }
}

export class LoginSuccess implements Action {
    readonly type = ActionTypes.LoginSuccess;

    constructor(public payload: firebase.auth.UserCredential) { }
}

export class LoginFailer implements Action {
    readonly type = ActionTypes.LoginFailer;

    constructor(public payload: any) { }
}

export type ActionsUnion = Login | LoginSuccess | LoginFailer;