import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './+shared/shared.module';
import { AuthModule } from './+auth/auth.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './+auth/effects/auth.effects';
import { StoreModule } from '@ngrx/store';
import { APP_REDUCERS } from './store/state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BudgetModule } from './budget/budget.module';
import { HomeComponent } from './containers/home/home.component';
import { MainTemplateComponent } from './containers/main-template/main-template.component';
import { MenuItemComponent } from './containers/menu-item/menu-item.component';
import { MueFooterComponent } from './containers/mue-footer/mue-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuItemComponent,
    MainTemplateComponent,
    MueFooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    SharedModule,
    AuthModule,
    BudgetModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(APP_REDUCERS),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
