import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoaDesignSystemModule } from '@boa/design-system';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardOverviewComponent } from './card-overview/card-overview.component';
import { LoginComponent } from './login/login.component';
import { PaymentsComponent } from './payments/payments.component';
import { CardTransactionListComponent } from './transactions/card-transaction-list.component';
import { TransactionsComponent } from './transactions/transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CardOverviewComponent,
    TransactionsComponent,
    CardTransactionListComponent,
    PaymentsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BoaDesignSystemModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
