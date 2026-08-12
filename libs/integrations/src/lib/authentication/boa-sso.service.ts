import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User } from '@boa/models';
import { BoaAnalyticsService } from '../analytics/boa-analytics.service';

export const DEMO_USER: User = {
  customerId: 'demo-user-001',
  fullName: 'Alex Morgan',
  email: 'alex.morgan@example.com',
};

const STORAGE_KEY = 'boa.sso.session';

/**
 * Stand-in for BofA's internal SSO/MFA integration. No identity provider is
 * contacted: the demo user is authenticated immediately and MFA always succeeds.
 */
@Injectable({ providedIn: 'root' })
export class BoaSsoService {
  private readonly currentUser$ = new BehaviorSubject<User | null>(this.restoreSession());

  constructor(private readonly analytics: BoaAnalyticsService) {}

  get user$(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  get currentUser(): User | null {
    return this.currentUser$.value;
  }

  login(): Observable<User> {
    return of(DEMO_USER).pipe(
      delay(250),
      tap((user) => {
        this.persistSession(user);
        this.currentUser$.next(user);
        this.analytics.track('login_success', { customerId: user.customerId, method: 'sso' });
      })
    );
  }

  verifyMfa(_code?: string): Observable<boolean> {
    return of(true).pipe(delay(150));
  }

  logout(): void {
    this.clearSession();
    this.currentUser$.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUser$.value !== null;
  }

  private restoreSession(): User | null {
    const raw = this.storage?.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  private persistSession(user: User): void {
    this.storage?.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  private clearSession(): void {
    this.storage?.removeItem(STORAGE_KEY);
  }

  private get storage(): Storage | null {
    return typeof window === 'undefined' ? null : window.localStorage;
  }
}
