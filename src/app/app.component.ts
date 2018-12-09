import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/state';
import { getLoggingInProgress } from './+auth/reducers';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isLoggingIn: Observable<boolean> = this.store.select(getLoggingInProgress);

  constructor(
    private store: Store<AppState>,
  ) { }
}
