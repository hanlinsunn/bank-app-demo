import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BoaAnalyticsService } from '@boa/integrations';
import { AppModule } from '../app.module';
import { PaymentsComponent } from './payments.component';

describe('PaymentsComponent', () => {
  let fixture: ComponentFixture<PaymentsComponent>;
  let component: PaymentsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppModule, RouterTestingModule] }).compileComponents();
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('tracks credit_card_payment_started when the form opens', () => {
    expect(TestBed.inject(BoaAnalyticsService).getTrackedEvents().map((e) => e.event)).toContain(
      'credit_card_payment_started'
    );
  });

  it('produces a receipt and tracks credit_card_payment_submitted', fakeAsync(() => {
    component.submit();
    tick(300);
    fixture.detectChanges();

    expect(component.receipt?.confirmationNumber).toMatch(/^PMT-\d{6}$/);
    expect(TestBed.inject(BoaAnalyticsService).getTrackedEvents().map((e) => e.event)).toContain(
      'credit_card_payment_submitted'
    );
    expect(fixture.nativeElement.textContent).toContain('Payment submitted');
  }));

  it('rejects a non-positive amount', fakeAsync(() => {
    component.form.patchValue({ amount: 0 });
    component.submit();
    tick(300);
    fixture.detectChanges();

    expect(component.receipt).toBeNull();
  }));
});
