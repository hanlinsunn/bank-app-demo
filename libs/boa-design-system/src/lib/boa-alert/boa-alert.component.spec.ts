import { TestBed } from '@angular/core/testing';
import { BoaAlertComponent } from './boa-alert.component';
import { BoaAlertModule } from './boa-alert.module';

describe('BoaAlertComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BoaAlertModule] }).compileComponents();
  });

  it('maps each tone to a Material icon and modifier class', () => {
    const fixture = TestBed.createComponent(BoaAlertComponent);
    const component = fixture.componentInstance;

    component.tone = 'success';
    fixture.detectChanges();
    expect(component.icon).toBe('check_circle');
    expect(fixture.nativeElement.querySelector('.boa-alert').classList).toContain('boa-alert--success');

    component.tone = 'error';
    fixture.detectChanges();
    expect(component.icon).toBe('error');
    expect(fixture.nativeElement.querySelector('.boa-alert').classList).toContain('boa-alert--error');
  });
});
