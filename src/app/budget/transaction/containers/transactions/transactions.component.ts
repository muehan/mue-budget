import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state";
import { Observable } from "rxjs";
import { Transaction } from "../../model/transaction";
import {
  getAllTransactions,
  getAllCategories,
  getAllSubcategories,
  getLastFewTransactions,
} from "../../../reducers";
import { MatDialog } from "@angular/material/dialog";
import { AddTransactionComponent } from "../../dialogs/add-transaction/add-transaction.component";
import { EditTransactionComponent } from "../../dialogs/edit-transaction/edit-transaction.component";
import { Category } from "../../model/categroy";
import { take } from "rxjs/operators";
import { Subcategory } from "../../model/subcategory";
import {
  AddTransactions,
  DeleteTransactions,
  EditTransactions,
  LoadLastFewTransactions,
} from "src/app/budget/actions/transactions-actions";
import { GetCategories } from "../../../actions/categories-actions";
import { GetSubcategories } from "../../../actions/subcategories-actions";

@Component({
  selector: "mue-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"],
})
export class TransactionsComponent implements OnInit {
  public transactions$: Observable<Transaction[]> = this.store.select(
    getLastFewTransactions
  );
  public categories$: Observable<Category[]> =
    this.store.select(getAllCategories);
  public subcategeories$: Observable<Subcategory[]> =
    this.store.select(getAllSubcategories);
  public categories: Category[] = new Array<Category>();
  public expanted: boolean = false;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit() {
    this.store.dispatch(LoadLastFewTransactions());
    this.store.dispatch(GetCategories());
    this.store.dispatch(GetSubcategories());
    
    this.categories$
      .pipe(take(2))
      .subscribe((cats) => (this.categories = cats));
  }

  public create() {
    let dialogRef = this.dialog.open(AddTransactionComponent, {
      height: "350px",
      width: "90%",
      maxWidth: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(AddTransactions({ payload: result }));
      }
    });
  }

  public remove(item: Transaction) {
    this.store.dispatch(DeleteTransactions({ payload: item }));
  }

  public edit(item: Transaction) {
    let dialogRef = this.dialog.open(EditTransactionComponent, {
      height: "350px",
      width: "90%",
      maxWidth: "500px",
      data: {
        transaction: item,
        categories$: this.categories$,
        subcategeories$: this.subcategeories$,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(EditTransactions({ payload: result }));
      }
    });
  }

  public getCategoryColor(categroyName: string) {
    let category = this.categories.find((x) => x.name === categroyName);

    return category ? category.color : "#FFFFFF";
  }

  public expand() {
    if (!this.expanted) {
      this.expanted = true;
      this.transactions$ = this.store.select(getAllTransactions);
    }
  }
}
