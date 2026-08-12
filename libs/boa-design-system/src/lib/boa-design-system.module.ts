import { NgModule } from '@angular/core';
import { BoaAccountTileModule } from './boa-account-tile/boa-account-tile.module';
import { BoaAlertModule } from './boa-alert/boa-alert.module';
import { BoaButtonModule } from './boa-button/boa-button.module';
import { BoaCardModule } from './boa-card/boa-card.module';

const MODULES = [BoaButtonModule, BoaCardModule, BoaAlertModule, BoaAccountTileModule];

/** Single entry point consumed by Online Banking and the Credit Card Portal. */
@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class BoaDesignSystemModule {}
