import { FireBaseLoginModel } from "../models/firebase.models";
import firebase from "firebase/app";
import { createAction, props } from "@ngrx/store";

export const login = createAction('[Auth] Login', props<FireBaseLoginModel>());

export const loginSuccess = createAction(
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