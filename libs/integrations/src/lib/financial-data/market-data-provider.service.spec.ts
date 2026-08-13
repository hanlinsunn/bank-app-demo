import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MarketSummary } from '@boa/models';
import { MarketDataProviderService } from './market-data-provider.service';

describe('MarketDataProviderService', () => {
  let service: MarketDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketDataProviderService);
  });

  it('returns the market summary after the simulated latency', fakeAsync(() => {
    let summary: MarketSummary | undefined;
    service.getMarketSummary().subscribe((value) => (summary = value));

    expect(summary).toBeUndefined();
    tick(400);

    expect(summary?.indicators.length).toBeGreaterThan(5);
    expect(summary?.indicators.map((indicator) => indicator.label).slice(0, 3)).toEqual([
      'S&P 500',
      '10-Year Treasury Yield',
      'Dow Jones',
    ]);
    expect(summary?.indicators.every((indicator) => !!indicator.value)).toBeTrue();
  }));
});
