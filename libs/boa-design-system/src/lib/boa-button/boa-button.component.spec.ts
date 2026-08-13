import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoaButtonComponent } from './boa-button.component';
import { BoaButtonModule } from './boa-button.module';

describe('BoaButtonComponent', () => {
  let fixture: ComponentFixture<BoaButtonComponent>;
  let component: BoaButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BoaButtonModule] }).compileComponents();
    fixture = TestBed.createComponent(BoaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders a raised Material button for the primary variant', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList).toContain('mat-mdc-raised-button');
  });

  it('renders a stroked Material button for the secondary variant', () => {
    component.variant = 'secondary';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList).toContain('mat-mdc-outlined-button');
  });

  it('emits pressed on click', () => {
    const pressed = jasmine.createSpy('pressed');
    component.pressed.subscribe(pressed);
    fixture.nativeElement.querySelector('button').click();
    expect(pressed).toHaveBeenCalled();
  });

  it('does not emit when disabled', () => {
    const pressed = jasmine.createSpy('pressed');
    component.disabled = true;
    component.pressed.subscribe(pressed);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    expect(pressed).not.toHaveBeenCalled();
  });
});
