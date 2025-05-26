import { type H3Event, setCookie } from 'h3';
import process from 'node:process';

const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60;

export function setAuthCookie(event: H3Event, sessionId: string) {
  setCookie(event, 'sid', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SEVEN_DAYS_IN_SECONDS,
  });
}
