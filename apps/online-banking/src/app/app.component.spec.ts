import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BoaSsoService } from '@boa/integrations';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

describe('Online Banking AppComponent', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({ imports: [AppModule, RouterTestingModule] }).compileComponents();
  });

  afterEach(() => localStorage.clear());

  it('shows the brand and hides the nav until the user signs in', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Bank of America');
    expect(fixture.nativeElement.querySelector('.app-bar__nav')).toBeNull();
  });

  it('reveals the nav once the demo user is authenticated', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    TestBed.inject(BoaSsoService)
      .login()
      .subscribe(() => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.app-bar__nav')).not.toBeNull();
        expect(fixture.nativeElement.textContent).toContain('Alex Morgan');
        done();
      });
  });
});
