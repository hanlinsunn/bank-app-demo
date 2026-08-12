import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BoaAnalyticsService } from '@boa/integrations';
import { AppModule } from '../app.module';
import { AccountOverviewComponent } from './account-overview.component';

describe('AccountOverviewComponent', () => {
  let fixture: ComponentFixture<AccountOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppModule, RouterTestingModule] }).compileComponents();
    fixture = TestBed.createComponent(AccountOverviewComponent);
    fixture.detectChanges();
  });

  it('tracks account_viewed on load', () => {
    expect(TestBed.inject(BoaAnalyticsService).getTrackedEvents().map((e) => e.event)).toContain('account_viewed');
  });

  it('renders balances, recent activity and market data', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('$8,420.17');
    expect(text).toContain('$24,230.55');
    expect(text).toContain('Whole Foods');
    expect(text).toContain('S&P 500');
  });
});
