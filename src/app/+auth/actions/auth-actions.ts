import { FireBaseLoginModel } from "../models/firebase.models";
import firebase from "firebase/app";
import { createAction, props } from "@ngrx/store";

export const Login = createAction('[Auth] Login', props<FireBaseLoginModel>());

export const LoginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: firebase.User }>()
);

export const LoginFailer = createAction(
  '[Auth] Login failed',
  props<{error: any}>()
);

export const Initialize = createAction(
  '[Auth] Login Initialize'
);