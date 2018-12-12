import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { Observable } from 'rxjs';
import { Category } from '../../model/categroy';
import { getAllCategories } from '../../reducers';
import { CategoryActions } from '../../actions';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public categories$: Observable<Category[]> = this.store.select(getAllCategories);
  public category = new FormControl('');

  constructor(
    private store: Store<AppState>
  ) {
    this.store
      .dispatch(
        new CategoryActions.GetCategories())
  }

  ngOnInit() {
  }

  public create() {
    console.log('submit: ' + this.category.value);
    if (this.category.value) {
      this.store.dispatch(new CategoryActions.AddCategories({ name: this.category.value }));
    }
  }

}
