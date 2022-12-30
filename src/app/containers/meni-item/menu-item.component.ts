import { Component, Input, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "mue-menu-item",
  templateUrl: "./menu-item.component.html",
  styleUrls: ["./menu-item.component.scss"],
})
export class MenuItemComponent implements OnInit, OnDestroy {
  
  @Input()
  public link: string;

  @Input()
  public subtitle: string;

  @Input()
  public title: string;

  @Input()
  public description: string;

  @Input()
  public color: string = "#753BBD";

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}
}
