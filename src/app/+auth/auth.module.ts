import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SharedModule } from '../+shared/shared.module';
import { LoginComponent } from './containers/login/login.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  providers:[
    AuthService,
  ],
  imports: [
    SharedModule,
    AngularFireAuthModule,
  ]
})
export class AuthModule { }
