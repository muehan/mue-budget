import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/+auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mue-main-template',
  templateUrl: './main-template.component.html',
  styleUrls: ['./main-template.component.scss']
})
export class MainTemplateComponent implements OnInit {

  public opened: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  public toggleSideBar(): void {
    this.opened = !this.opened;
  }

  public logout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
