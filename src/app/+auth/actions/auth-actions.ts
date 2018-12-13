import { Action } from '@ngrx/store';
import { FireBaseLoginModel } from '../models/firebase.models';
import { User } from 'firebase';

export enum ActionTypes {
    Login = '[Auth] Login',
    LoginSuccess = '[Auth] Login Success',
    LoginFailer = '[Auth] Login Failer',

    Initialize = '[Auth] Initialize',
}

export class Login implements Action {
    readonly type = ActionTypes.Login;

    constructor(public payload: FireBaseLoginModel) { }
}

export class LoginSuccess implements Action {
    readonly type = ActionTypes.LoginSuccess;

    constructor(public payload: User) { }
}

export class LoginFailer implements Action {
    readonly type = ActionTypes.LoginFailer;

    constructor(public payload: any) { }
}

export class Initialize implements Action {
    readonly type = ActionTypes.Initialize;

    constructor() { }
}

export type ActionsUnion = Login | LoginSuccess | LoginFailer | Initialize;