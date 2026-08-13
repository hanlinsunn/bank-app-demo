import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BoaButtonComponent } from './boa-button.component';

/** Wraps the Angular Material (MDC) button so applications never import it directly. */
@NgModule({
  declarations: [BoaButtonComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [BoaButtonComponent],
})
export class BoaButtonModule {}
