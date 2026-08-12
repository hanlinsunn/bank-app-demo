import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account, TransferReceipt } from '@boa/models';
import { AccountService, TransferService } from '@boa/banking-data';
import { BoaAnalyticsService } from '@boa/integrations';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss'],
})
export class TransfersComponent implements OnInit {
  accountOptions$!: Observable<{ id: string; label: string }[]>;
  receipt: TransferReceipt | null = null;
  error = '';
  submitting = false;

  readonly form = this.formBuilder.nonNullable.group({
    fromAccountId: ['chk-1234', Validators.required],
    toAccountId: ['sav-5678', Validators.required],
    amount: [250, [Validators.required, Validators.min(0.01)]],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly accountService: AccountService,
    private readonly transferService: TransferService,
    private readonly analytics: BoaAnalyticsService
  ) {}

  ngOnInit(): void {
    this.accountOptions$ = this.accountService
      .getAccounts()
      .pipe(map((accounts: Account[]) => accounts.map((account) => ({ id: account.id, label: `${account.nickname} ${account.maskedNumber}` }))));
    this.analytics.track('transfer_started', { app: 'online-banking' });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.error = '';
    this.receipt = null;

    this.transferService.submitTransfer(this.form.getRawValue()).subscribe({
      next: (receipt) => {
        this.submitting = false;
        this.receipt = receipt;
        this.analytics.track('transfer_submitted', {
          app: 'online-banking',
          amount: receipt.request.amount,
          confirmationNumber: receipt.confirmationNumber,
        });
      },
      error: (cause: Error) => {
        this.submitting = false;
        this.error = cause.message;
      },
    });
  }
}
