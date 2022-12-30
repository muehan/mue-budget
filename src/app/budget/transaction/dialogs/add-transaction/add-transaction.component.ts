import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Category } from '../../model/categroy';
import { Subcategory } from '../../model/subcategory';
import { CategoryService } from '../../services/category.service';
import { SubcategoryService } from '../../services/subcategory.service';

@Component({
  selector: 'mue-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {

  public transactionFormGroup: UntypedFormGroup = new UntypedFormGroup({
    'valueForm': new UntypedFormControl('', [Validators.required]),
    'categoryName': new UntypedFormControl('', [Validators.required]),
    'subcategoryName': new UntypedFormControl('', [Validators.required]),
    'dateForm': new UntypedFormControl(new Date(), [Validators.required]),
  });

  public categeories$: Observable<Category[]> = this.categoryService.getAll();
  public subcategeories$: Observable<Subcategory[]> = this.subcategoryService.getAll();
  public subcategeoriesFilterd$: Observable<Subcategory[]> = this.subcategeories$;

  constructor(
    public dialogRef: MatDialogRef<AddTransactionComponent>,
    public categoryService: CategoryService,
    public subcategoryService: SubcategoryService) { }

  ngOnInit() {
  }

  public create() {

    let result = {
      value: this.transactionFormGroup.get('valueForm').value,
      category: this.transactionFormGroup.get('categoryName').value,
      subCategory: this.transactionFormGroup.get('subcategoryName').value,
      date: new Date(this.transactionFormGroup.get('dateForm').value).getTime(),
    };

    this.dialogRef.close(result);
  }

  public close() {
    this.dialogRef.close();
  }

  public categoryChanged ($event){
    this.subcategeoriesFilterd$ = this.subcategeories$
    .pipe(
      map(x => {
        return x.filter(sub => sub.categoryName == $event.value);
      })
    );
  }
}
