import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../../transaction/model/transaction';
import { Category } from '../../../transaction/model/categroy';
import { Subcategory } from '../../../transaction/model/subcategory';
import { TransactionService } from 'src/app/budget/transaction/services/transaction.service';
import { CategoryService } from 'src/app/budget/transaction/services/category.service';
import { SubcategoryService } from 'src/app/budget/transaction/services/subcategory.service';

@Component({
  selector: 'mue-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  public transactions$: Observable<Transaction[]> = this.transactionService.getAll();
  public categories$: Observable<Category[]> = this.categoryService.getAll();
  public subcategories$: Observable<Subcategory[]> = this.subcategoryService.getAll();

  constructor(
    public transactionService: TransactionService,
    public categoryService: CategoryService,
    public subcategoryService: SubcategoryService,
  ) {
  }

  ngOnInit() {
  }

}
