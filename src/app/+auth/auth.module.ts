import { NgModule } from '@angular/core';
import { SharedModule } from '../+shared/shared.module';
import { LoginComponent } from './containers/login/login.component';
import { AuthService } from './services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';

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
