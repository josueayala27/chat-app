const publicRoutes = ['/api/auth/login', '/api/auth/sign-up', '/api/_ws']

export function isProtected(pathname: string) {
  return pathname.startsWith('/api') && !publicRoutes.some(route => pathname.startsWith(route))
}
