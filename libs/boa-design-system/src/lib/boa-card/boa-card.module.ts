import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BoaCardComponent } from './boa-card.component';

@NgModule({
  declarations: [BoaCardComponent],
  imports: [CommonModule, MatCardModule],
  exports: [BoaCardComponent],
})
export class BoaCardModule {}
