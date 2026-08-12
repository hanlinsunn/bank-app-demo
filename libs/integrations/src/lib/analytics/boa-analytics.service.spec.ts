import { TestBed } from '@angular/core/testing';
import { BoaAnalyticsService } from './boa-analytics.service';

describe('BoaAnalyticsService', () => {
  let service: BoaAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoaAnalyticsService);
  });

  it('records the event and logs it to the console', () => {
    const log = spyOn(console, 'info');
    service.track('login_success', { customerId: 'demo-user-001' });

    expect(log).toHaveBeenCalled();
    const [event] = service.getTrackedEvents();
    expect(event.event).toBe('login_success');
    expect(event.properties['customerId']).toBe('demo-user-001');
  });
});
