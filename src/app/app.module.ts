import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './+shared/shared.module';
import { AuthModule } from './+auth/auth.module';
import { TransactionModule } from './+transaction/transaction.module';
import { ReportingModule } from './+reporting/reporting.module';
import { SiteTemplateComponent } from './template/site-template/site-template.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './+auth/effects/auth.effects';
import { StoreModule } from '@ngrx/store';
import { APP_REDUCERS } from './store/state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    SiteTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    SharedModule,
    AuthModule,
    TransactionModule,
    ReportingModule,
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
