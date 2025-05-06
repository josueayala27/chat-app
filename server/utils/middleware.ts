const publicRoutes = ['/api/auth/login']

export function isProtected(pathname: string) {
  return pathname.startsWith('/api') && !publicRoutes.some(route => pathname.startsWith(route))
}
