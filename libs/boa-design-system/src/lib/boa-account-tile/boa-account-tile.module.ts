import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BoaAccountTileComponent } from './boa-account-tile.component';

@NgModule({
  declarations: [BoaAccountTileComponent],
  imports: [CommonModule, MatCardModule],
  exports: [BoaAccountTileComponent],
})
export class BoaAccountTileModule {}
