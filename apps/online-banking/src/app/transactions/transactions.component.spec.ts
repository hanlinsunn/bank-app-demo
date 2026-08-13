import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from '../app.module';
import { TransactionsComponent } from './transactions.component';

describe('TransactionsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppModule, RouterTestingModule] }).compileComponents();
  });

  it('renders the account options and filters transactions by the selected account', async () => {
    const fixture = TestBed.createComponent(TransactionsComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    // MatSelect resolves the selected option one microtask after the options arrive.
    await fixture.whenStable();
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('mat-select');
    expect(select.classList).not.toContain('mat-mdc-select-empty');
    expect(select.textContent).toContain('••1234');
    expect(fixture.nativeElement.textContent).toContain('Whole Foods');

    fixture.componentInstance.account.setValue('sav-5678');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Interest Paid');
    expect(fixture.nativeElement.textContent).not.toContain('Whole Foods');
  });
});
