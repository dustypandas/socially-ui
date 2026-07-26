export function getAuthSuccessRedirect(searchParams: URLSearchParams): string {
  const redirect = searchParams.get('redirect')?.trim();
  if (redirect && redirect.startsWith('/') && !redirect.startsWith('//')) {
    return redirect;
  }
  return '/home-ui';
}
