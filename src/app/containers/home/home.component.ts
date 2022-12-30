import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddTransactionComponent } from "../../budget/transaction/dialogs/add-transaction/add-transaction.component";
import { TransactionService } from "src/app/budget/transaction/services/transaction.service";

@Component({
  selector: "mue-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    public transactionService: TransactionService,
    public dialog: MatDialog) {}

  ngOnInit(
    
  ) {}

  ngOnDestroy() {}

  public addTransaction() {
    

    let dialogRef = this.dialog.open(AddTransactionComponent, {
      height: "350px",
      width: "90%",
      maxWidth: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.transactionService.add(result);
      }
    });
  }
}
