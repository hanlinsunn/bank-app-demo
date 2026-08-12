import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CardPaymentReceipt, CreditCardAccount } from '@boa/models';
import { CreditCardService } from '@boa/banking-data';
import { BoaAnalyticsService } from '@boa/integrations';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  card$!: Observable<CreditCardAccount>;
  fundingAccounts$!: Observable<{ id: string; label: string }[]>;
  receipt: CardPaymentReceipt | null = null;
  error = '';
  submitting = false;

  readonly form = this.formBuilder.nonNullable.group({
    cardId: ['card-9012', Validators.required],
    fromAccountId: ['chk-1234', Validators.required],
    amount: [45, [Validators.required, Validators.min(0.01)]],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly creditCardService: CreditCardService,
    private readonly analytics: BoaAnalyticsService
  ) {}

  ngOnInit(): void {
    this.card$ = this.creditCardService.getCard();
    this.fundingAccounts$ = this.creditCardService.getFundingAccounts();
    this.analytics.track('credit_card_payment_started', { app: 'credit-card-portal' });
  }

  payMinimum(card: CreditCardAccount): void {
    this.form.patchValue({ amount: card.minimumPayment });
  }

  payFullBalance(card: CreditCardAccount): void {
    this.form.patchValue({ amount: card.balance });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.error = '';
    this.receipt = null;

    this.creditCardService.submitPayment(this.form.getRawValue()).subscribe({
      next: (receipt) => {
        this.submitting = false;
        this.receipt = receipt;
        this.analytics.track('credit_card_payment_submitted', {
          app: 'credit-card-portal',
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
