import process from 'node:process'
import Ably from 'ably'

/**
 * Creates an Ably REST client using the API key from environment variables.
 * @type {Ably.Rest}
 * @see {@link https://ably.com/docs/rest}
 */
const ably: Ably.Rest = new Ably.Rest(process.env.ABLY_API_KEY as string)

/**
 * Event handler for generating a new Ably token request.
 * Because security is cool, and hardcoding keys is so 2005.
 *
 * @async
 * @function
 * @returns {Promise<Ably.Types.TokenRequest>} The token request payload that your frontend can use for Ably authentication.
 * @throws {Error} If Ably fails to generate a token request (in which case, feel free to blame the intern or, more likely, the missing API key).
 */
export default defineEventHandler(async () => {
  return await ably.auth.createTokenRequest()
})
