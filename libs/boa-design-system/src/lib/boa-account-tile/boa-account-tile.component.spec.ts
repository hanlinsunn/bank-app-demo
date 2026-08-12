import { TestBed } from '@angular/core/testing';
import { Account } from '@boa/models';
import { BoaAccountTileComponent } from './boa-account-tile.component';
import { BoaAccountTileModule } from './boa-account-tile.module';

const account: Account = {
  id: 'chk-1234',
  type: 'checking',
  nickname: 'Advantage Plus Banking',
  maskedNumber: '\u2022\u20221234',
  balance: 8420.17,
};

describe('BoaAccountTileComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BoaAccountTileModule] }).compileComponents();
  });

  it('renders the nickname and formatted balance', () => {
    const fixture = TestBed.createComponent(BoaAccountTileComponent);
    fixture.componentInstance.account = account;
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Advantage Plus Banking');
    expect(text).toContain('$8,420.17');
  });

  it('only emits selected when clickable', () => {
    const fixture = TestBed.createComponent(BoaAccountTileComponent);
    const selected = jasmine.createSpy('selected');
    fixture.componentInstance.account = account;
    fixture.componentInstance.selected.subscribe(selected);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.boa-account-tile').click();
    expect(selected).not.toHaveBeenCalled();

    fixture.componentInstance.clickable = true;
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.boa-account-tile').click();
    expect(selected).toHaveBeenCalledWith(account);
  });
});
