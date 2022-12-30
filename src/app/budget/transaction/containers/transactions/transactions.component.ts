import { Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Transaction } from "../../model/transaction";
import { MatDialog } from "@angular/material/dialog";
import { AddTransactionComponent } from "../../dialogs/add-transaction/add-transaction.component";
import { EditTransactionComponent } from "../../dialogs/edit-transaction/edit-transaction.component";
import { Category } from "../../model/categroy";
import { Subcategory } from "../../model/subcategory";
import { TransactionService } from "../../services/transaction.service";
import { CategoryService } from "../../services/category.service";
import { SubcategoryService } from "../../services/subcategory.service";

@Component({
  selector: "mue-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"],
})
export class TransactionsComponent implements OnInit, OnDestroy {
  
  private categorySubscription: Subscription = null;
  private count$: BehaviorSubject<number> = new BehaviorSubject(20);
  
  public transactions$: Observable<Transaction[]> = null;

  public categories$: Observable<Category[]> = this.categoryService.getAll();
  
  public subcategeories$: Observable<Subcategory[]> =
    this.subCategoryService.getAll();

  public categories: Category[] = new Array<Category>();

  constructor(
    public dialog: MatDialog,
    public transactionService: TransactionService,
    public categoryService: CategoryService,
    public subCategoryService: SubcategoryService
  ) {}

  ngOnInit() {
    console.log("ngOnInit");

    this.categorySubscription = this.categories$
      .subscribe(x => {
        this.categories = x
      });

      this.count$.subscribe(x => {
        this.transactions$ =  this.transactionService.getTransactions(x);
      });
  }

  ngOnDestroy(): void {
    if(this.categorySubscription){
      this.categorySubscription.unsubscribe();
    }
  }

  public create() {
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

  public remove(item: Transaction) {
    this.transactionService.remove(item);
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
        this.transactionService.edit(result);
      }
    });
  }

  public getCategoryColor(categroyName: string) {

    let category = this.categories.find((x) => x.name === categroyName);

    return category ? `${category.color}70` : "#FFFFFF";
  }

  public expand() {
    let count = this.count$.value + 20;
    this.count$.next(count);
  }
}
