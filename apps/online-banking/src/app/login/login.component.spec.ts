import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BoaAnalyticsService, BoaSsoService } from '@boa/integrations';
import { AppModule } from '../app.module';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({ imports: [AppModule, RouterTestingModule] }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => localStorage.clear());

  it('renders the SSO call to action', () => {
    expect(fixture.nativeElement.textContent).toContain('Sign in with BofA SSO');
  });

  it('authenticates, tracks login_success and routes to the overview', async () => {
    const navigate = spyOn(router, 'navigateByUrl');
    fixture.nativeElement.querySelector('boa-button button').click();
    await fixture.whenStable();

    expect(TestBed.inject(BoaSsoService).isAuthenticated()).toBeTrue();
    expect(TestBed.inject(BoaAnalyticsService).getTrackedEvents().map((e) => e.event)).toContain('login_success');
    expect(navigate).toHaveBeenCalledWith('/account-overview');
  });
});
