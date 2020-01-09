import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { AuthService } from 'src/app/+auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mue-main-template',
  templateUrl: './main-template.component.html',
  styleUrls: ['./main-template.component.scss']
})
export class MainTemplateComponent implements OnInit {

  @ViewChild(MatMenuTrigger, { static: true }) trigger: MatMenuTrigger;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  public logout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
