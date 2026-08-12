import { resolveReturnUrl } from './return-url';

describe('resolveReturnUrl', () => {
  it('keeps in-app paths', () => {
    expect(resolveReturnUrl('/transfers', '/account-overview')).toBe('/transfers');
    expect(resolveReturnUrl('/transactions?account=chk-1234', '/account-overview')).toBe(
      '/transactions?account=chk-1234'
    );
  });

  it('falls back for missing or off-site targets', () => {
    expect(resolveReturnUrl(null, '/account-overview')).toBe('/account-overview');
    expect(resolveReturnUrl('', '/account-overview')).toBe('/account-overview');
    expect(resolveReturnUrl('//evil.example.com', '/account-overview')).toBe('/account-overview');
    expect(resolveReturnUrl('/\\evil.example.com', '/account-overview')).toBe('/account-overview');
    expect(resolveReturnUrl('https://evil.example.com', '/account-overview')).toBe('/account-overview');
    expect(resolveReturnUrl('javascript:alert(1)', '/account-overview')).toBe('/account-overview');
  });
});
