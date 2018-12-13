import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../+shared/shared.module';
import { LoginComponent } from './containers/login/login.component';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@NgModule({
  declarations: [
    LoginComponent
  ],
  providers:[
    AuthService,
    AngularFireAuth,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class AuthModule { }
