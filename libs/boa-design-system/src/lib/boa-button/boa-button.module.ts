import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BoaButtonComponent } from './boa-button.component';

/**
 * Wraps the Angular Material 14 button, the pre-MDC ("legacy") button
 * implementation. See MIGRATION-NOTES.md: this is the intentional migration gap
 * for the Angular 18 exercise.
 */
@NgModule({
  declarations: [BoaButtonComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [BoaButtonComponent],
})
export class BoaButtonModule {}
