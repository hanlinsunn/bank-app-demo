import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BoaCardModule } from './boa-card.module';

@Component({
  template: `
    <boa-card heading="Transfer money" subheading="Submission is mocked" [showActions]="true">
      <p>Body content</p>
      <button boaCardActions>Submit</button>
    </boa-card>
  `,
})
class HostComponent {}

describe('BoaCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoaCardModule],
      declarations: [HostComponent],
    }).compileComponents();
  });

  it('projects body content and action content into their own slots', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('mat-card-content');
    const actions = fixture.nativeElement.querySelector('mat-card-actions');

    expect(fixture.nativeElement.querySelector('.boa-card__heading').textContent).toContain('Transfer money');
    expect(content.textContent).toContain('Body content');
    expect(content.querySelector('button')).toBeNull();
    expect(actions.querySelector('button')?.textContent).toContain('Submit');
  });
});
