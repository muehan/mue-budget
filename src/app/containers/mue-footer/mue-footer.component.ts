import { Component, OnInit } from '@angular/core';
import { versionInfo } from '../../../version-info';

@Component({
  selector: 'mue-footer',
  templateUrl: './mue-footer.component.html',
  styleUrls: ['./mue-footer.component.scss']
})
export class MueFooterComponent implements OnInit {

  public hash: string = versionInfo.hash;
  public version: string = versionInfo.tag;

  constructor() {
    console.log(versionInfo);
  }

  ngOnInit(): void {
  }

}
