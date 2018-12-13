import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from 'src/app/+auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mue-site-template',
  templateUrl: './site-template.component.html',
  styleUrls: ['./site-template.component.scss']
})
export class SiteTemplateComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

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
