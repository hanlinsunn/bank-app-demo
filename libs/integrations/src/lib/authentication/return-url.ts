/**
 * Resolves the post-login `returnUrl` query parameter, falling back to `fallback`
 * for anything that is not a same-origin, in-app path (`//host`, `https://host`,
 * `javascript:` and friends), so a crafted login link cannot redirect elsewhere.
 */
export function resolveReturnUrl(returnUrl: string | null | undefined, fallback: string): string {
  if (!returnUrl || !returnUrl.startsWith('/') || returnUrl.startsWith('//') || returnUrl.startsWith('/\\')) {
    return fallback;
  }
  return returnUrl;
}
