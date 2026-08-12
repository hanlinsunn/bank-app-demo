import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

describe('Credit Card Portal AppComponent', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({ imports: [AppModule, RouterTestingModule] }).compileComponents();
  });

  afterEach(() => localStorage.clear());

  it('brands the second application while sharing the design system', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Credit Card Portal');
    expect(fixture.nativeElement.querySelector('.app-bar__nav')).toBeNull();
  });
});
