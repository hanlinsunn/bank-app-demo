import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoaAuthGuard } from '@boa/integrations';
import { CardOverviewComponent } from './card-overview/card-overview.component';
import { LoginComponent } from './login/login.component';
import { PaymentsComponent } from './payments/payments.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'card-overview', component: CardOverviewComponent, canActivate: [BoaAuthGuard] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [BoaAuthGuard] },
  { path: 'payments', component: PaymentsComponent, canActivate: [BoaAuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'card-overview' },
  { path: '**', redirectTo: 'card-overview' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
