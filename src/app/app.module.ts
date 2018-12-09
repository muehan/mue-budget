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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
