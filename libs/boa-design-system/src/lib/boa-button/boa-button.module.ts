import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { BoaButtonComponent } from './boa-button.component';

/**
 * Wraps the Angular Material legacy (pre-MDC) button. See MIGRATION-NOTES.md:
 * this is the intentional migration gap for the Angular 18 exercise; Material 17
 * deletes the legacy entry point, so the MDC phase has to move this wrapper.
 */
@NgModule({
  declarations: [BoaButtonComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [BoaButtonComponent],
})
export class BoaButtonModule {}
