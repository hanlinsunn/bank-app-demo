import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MarketSummary } from '@boa/models';

/**
 * Stand-in for a third-party financial-data feed used by the Online Banking
 * account overview. Returns static RxJS data behind a short delay.
 */
@Injectable({ providedIn: 'root' })
export class MarketDataProviderService {
  getMarketSummary(): Observable<MarketSummary> {
    const summary: MarketSummary = {
      asOf: 'Today, 4:00 PM ET',
      indicators: [
        { label: 'S&P 500', value: '5,431.60', changePercent: 0.42 },
        { label: '10-Year Treasury Yield', value: '4.18%', changePercent: -0.03 },
        { label: 'Dow Jones', value: '39,127.14', changePercent: 0.18 },
        { label: 'Nasdaq Composite', value: '17,689.36', changePercent: 0.65 },
        { label: 'Russell 2000', value: '2,043.87', changePercent: -0.21 },
        { label: 'BAC', value: '$41.27', changePercent: 0.54 },
        { label: 'Gold', value: '$2,338.90', changePercent: -0.12 },
        { label: 'WTI Crude', value: '$78.42', changePercent: 1.06 },
        { label: 'EUR / USD', value: '1.0874', changePercent: -0.08 },
        { label: '30-Year Fixed Mortgage', value: '6.74%', changePercent: -0.05 },
      ],
    };
    return of(summary).pipe(delay(400));
  }
}
