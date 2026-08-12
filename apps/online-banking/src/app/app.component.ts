import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BoaSsoService } from '@boa/integrations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly sso: BoaSsoService, private readonly router: Router) {}

  get user$() {
    return this.sso.user$;
  }

  signOut(): void {
    this.sso.logout();
    this.router.navigate(['/login']);
  }
}
