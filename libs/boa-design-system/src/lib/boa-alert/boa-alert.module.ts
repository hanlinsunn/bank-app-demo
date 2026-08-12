import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BoaAlertComponent } from './boa-alert.component';

@NgModule({
  declarations: [BoaAlertComponent],
  imports: [CommonModule, MatIconModule],
  exports: [BoaAlertComponent],
})
export class BoaAlertModule {}
