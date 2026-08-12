import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BoaSsoService } from '@boa/integrations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  signingIn = false;
  error = '';

  constructor(
    private readonly sso: BoaSsoService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  signInWithSso(): void {
    this.signingIn = true;
    this.error = '';

    this.sso
      .login()
      .pipe(switchMap(() => this.sso.verifyMfa()))
      .subscribe({
        next: (verified) => {
          this.signingIn = false;
          if (!verified) {
            this.error = 'MFA verification failed.';
            return;
          }
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/card-overview';
          this.router.navigateByUrl(returnUrl);
        },
        error: () => {
          this.signingIn = false;
          this.error = 'Unable to reach BofA SSO. Try again.';
        },
      });
  }
}
