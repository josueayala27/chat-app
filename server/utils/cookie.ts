import type { H3Event } from 'h3'
import process from 'node:process'
import { setCookie } from 'h3'

const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60

/**
 * Sets an HTTP-only authentication cookie with the session ID.
 *
 * @param {H3Event} event - The H3 event object representing the request/response context.
 * @param {string} sessionId - The unique session identifier to be stored in the cookie.
 */
export function setAuthCookie(event: H3Event, sessionId: string) {
  setCookie(event, 'sid', sessionId, {
    /**
     * Prevents access from client-side JavaScript.
     */
    httpOnly: true,

    /**
     * Use HTTPS only in production.
     */
    secure: process.env.NODE_ENV === 'production',

    /**
     * Helps protect against CSRF.
     */
    sameSite: 'lax',

    /**
     * Cookie is valid for the entire site.
     */
    path: '/',

    /**
     * Expires in 7 days.
     */
    maxAge: SEVEN_DAYS_IN_SECONDS,
  })
}
