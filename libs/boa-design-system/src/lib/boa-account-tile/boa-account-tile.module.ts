import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { BoaAccountTileComponent } from './boa-account-tile.component';

@NgModule({
  declarations: [BoaAccountTileComponent],
  imports: [CommonModule, MatCardModule],
  exports: [BoaAccountTileComponent],
})
export class BoaAccountTileModule {}
