// Removed: import process from 'node:process';
// Assuming readValidatedBody is auto-imported by Nuxt 3 from '#imports'
// If not, it would be: import { readValidatedBody } from 'h3';
import { userLoginSchema } from '../../validators/user.validator';
import { verifyUserCredentials } from '../../services/user.service';
import { createSession } from '../../services/session.service';
import { setAuthCookie } from '../../utils/cookie'; // New import

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, userLoginSchema);

  const user = await verifyUserCredentials(email, password);

  const sessionId = await createSession(user); // createSession expects the user object

  setAuthCookie(event, sessionId); // Use the new utility

  return { success: true, message: 'Login successful.' }; // Standardized response
});
