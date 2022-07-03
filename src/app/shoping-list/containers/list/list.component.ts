import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { ShoppingItem } from "../../models/shopping-item";
import { MatDialog } from "@angular/material/dialog";
import { ListService } from "../../services/list.service";
import { AddItemDialogComponent } from "../../dialogs/add-item/add-item.component";

@Component({
  selector: "mue-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  public items$: Observable<ShoppingItem[]>;

  constructor(public dialog: MatDialog, private listService: ListService) {}

  ngOnInit() {
    this.listService.initialize();
    this.items$ = this.listService.getAll();
  }

  AddNewItem() {
    let dialogRef = this.dialog.open(AddItemDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listService.add({ value: result, checked: false });
      }
    });
  }

  selectedItem(item) {
    item.checked === true ? (item.checked = false) : (item.checked = true);
    this.listService.update(item);
  }

  removeChecked() {
    this.listService.removeCheckedItems();
  }
}
