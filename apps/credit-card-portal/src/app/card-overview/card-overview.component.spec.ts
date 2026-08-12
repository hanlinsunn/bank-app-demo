import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from '../app.module';
import { CardOverviewComponent } from './card-overview.component';

describe('CardOverviewComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppModule, RouterTestingModule] }).compileComponents();
  });

  it('renders balance, available credit, minimum payment and due date', async () => {
    const fixture = TestBed.createComponent(CardOverviewComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('$1,248.23');
    expect(text).toContain('$8,751.77');
    expect(text).toContain('$45.00');
    expect(text).toContain('Aug 28');
    expect(text).toContain('Delta Air Lines');
  });
});
