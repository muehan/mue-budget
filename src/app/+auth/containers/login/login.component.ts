import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public errorMessage: string;
  public loginFormGroup: FormGroup;

  constructor(
    private authService: AuthService,
    public router: Router
  ) {
    let storedMail = localStorage.getItem('mail');

    this.loginFormGroup = new FormGroup({
      mail: new FormControl(storedMail, [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.authService.loading$.subscribe((value) => {
      if (!value) {
        if (this.authService.authenticated) {
          this.router.navigate(['list']);
        }
      }
    });
  }

  ngOnInit() { }

  login() {
    const mail = this.loginFormGroup.get('mail').value;
    const password = this.loginFormGroup.get('password').value;

    localStorage.setItem('mail', mail);
    this.authService.emailLogin(mail, password)
      .then((_) => {
        this.router.navigate(['list']);
      })
      .catch((error) => {
        this.errorMessage = error;
      });
  }

}
