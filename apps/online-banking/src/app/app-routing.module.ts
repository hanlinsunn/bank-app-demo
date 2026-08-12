import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoaAuthGuard } from '@boa/integrations';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { LoginComponent } from './login/login.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransfersComponent } from './transfers/transfers.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'account-overview', component: AccountOverviewComponent, canActivate: [BoaAuthGuard] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [BoaAuthGuard] },
  { path: 'transfers', component: TransfersComponent, canActivate: [BoaAuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'account-overview' },
  { path: '**', redirectTo: 'account-overview' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
