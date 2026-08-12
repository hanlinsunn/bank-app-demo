import { TestBed } from '@angular/core/testing';
import { BoaSsoService, DEMO_USER } from './boa-sso.service';

describe('BoaSsoService', () => {
  let service: BoaSsoService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoaSsoService);
  });

  afterEach(() => localStorage.clear());

  it('starts unauthenticated', () => {
    expect(service.isAuthenticated()).toBeFalse();
    expect(service.currentUser).toBeNull();
  });

  it('authenticates the demo user and tracks login_success', (done) => {
    service.login().subscribe((user) => {
      expect(user).toEqual(DEMO_USER);
      expect(service.isAuthenticated()).toBeTrue();
      expect(localStorage.getItem('boa.sso.session')).toContain('demo-user-001');
      done();
    });
  });

  it('always succeeds MFA verification', (done) => {
    service.verifyMfa('000000').subscribe((ok) => {
      expect(ok).toBeTrue();
      done();
    });
  });

  it('clears the session on logout', (done) => {
    service.login().subscribe(() => {
      service.logout();
      expect(service.isAuthenticated()).toBeFalse();
      expect(localStorage.getItem('boa.sso.session')).toBeNull();
      done();
    });
  });
});
