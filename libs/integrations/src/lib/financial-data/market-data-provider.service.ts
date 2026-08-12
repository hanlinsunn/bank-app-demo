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
      ],
    };
    return of(summary).pipe(delay(400));
  }
}
