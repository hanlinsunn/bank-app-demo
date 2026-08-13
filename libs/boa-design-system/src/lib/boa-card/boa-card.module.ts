import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { BoaCardComponent } from './boa-card.component';

@NgModule({
  declarations: [BoaCardComponent],
  imports: [CommonModule, MatCardModule],
  exports: [BoaCardComponent],
})
export class BoaCardModule {}
