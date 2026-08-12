import { Injectable } from '@angular/core';

export type BoaAnalyticsEvent =
  | 'login_success'
  | 'account_viewed'
  | 'transfer_started'
  | 'transfer_submitted'
  | 'credit_card_payment_started'
  | 'credit_card_payment_submitted';

export interface BoaAnalyticsRecord {
  event: string;
  properties: Record<string, unknown>;
  timestamp: string;
}

/**
 * Stand-in for BofA's proprietary internal analytics SDK. Events are printed to
 * the browser console; no external platform is involved.
 */
@Injectable({ providedIn: 'root' })
export class BoaAnalyticsService {
  private readonly events: BoaAnalyticsRecord[] = [];

  track(eventName: BoaAnalyticsEvent | string, properties: Record<string, unknown> = {}): void {
    const record: BoaAnalyticsRecord = {
      event: eventName,
      properties,
      timestamp: new Date().toISOString(),
    };
    this.events.push(record);
    console.info('[boa-analytics]', record.event, record.properties);
  }

  getTrackedEvents(): BoaAnalyticsRecord[] {
    return [...this.events];
  }
}
