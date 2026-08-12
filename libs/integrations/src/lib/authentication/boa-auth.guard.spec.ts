import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';
import { BoaAuthGuard } from './boa-auth.guard';
import { BoaSsoService } from './boa-sso.service';

describe('BoaAuthGuard', () => {
  let guard: BoaAuthGuard;
  let sso: BoaSsoService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    localStorage.clear();
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    TestBed.configureTestingModule({ providers: [{ provide: Router, useValue: router }] });
    guard = TestBed.inject(BoaAuthGuard);
    sso = TestBed.inject(BoaSsoService);
  });

  afterEach(() => localStorage.clear());

  const state = { url: '/account-overview' } as RouterStateSnapshot;

  it('redirects to login when unauthenticated', () => {
    expect(guard.canActivate({} as never, state)).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: '/account-overview' } });
  });

  it('allows navigation once the demo user is signed in', (done) => {
    sso.login().subscribe(() => {
      expect(guard.canActivate({} as never, state)).toBeTrue();
      done();
    });
  });
});
