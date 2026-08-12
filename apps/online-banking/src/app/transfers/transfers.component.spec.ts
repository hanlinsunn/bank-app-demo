import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BoaAnalyticsService } from '@boa/integrations';
import { AppModule } from '../app.module';
import { TransfersComponent } from './transfers.component';

describe('TransfersComponent', () => {
  let fixture: ComponentFixture<TransfersComponent>;
  let component: TransfersComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppModule, RouterTestingModule] }).compileComponents();
    fixture = TestBed.createComponent(TransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('tracks transfer_started when the form opens', () => {
    expect(TestBed.inject(BoaAnalyticsService).getTrackedEvents().map((e) => e.event)).toContain('transfer_started');
  });

  it('produces a receipt and tracks transfer_submitted', fakeAsync(() => {
    component.submit();
    tick(300);
    fixture.detectChanges();

    expect(component.receipt?.confirmationNumber).toMatch(/^TRF-\d{6}$/);
    expect(TestBed.inject(BoaAnalyticsService).getTrackedEvents().map((e) => e.event)).toContain('transfer_submitted');
    expect(fixture.nativeElement.textContent).toContain('Transfer submitted');
  }));

  it('rejects a transfer between the same accounts', fakeAsync(() => {
    component.form.patchValue({ toAccountId: 'chk-1234' });
    component.submit();
    tick(300);
    fixture.detectChanges();

    expect(component.receipt).toBeNull();
    expect(component.error).toContain('must differ');
  }));
});
