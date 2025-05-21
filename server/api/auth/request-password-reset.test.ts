import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import requestPasswordResetHandler from './request-password-reset.post' // Adjust path if needed
import * as userService from '~/server/services/user.service'
import sgMail from '@sendgrid/mail'
import { readBody, createError } from 'h3' // createError might be implicitly used by the handler
import crypto from 'crypto'

// Mock services and utilities
vi.mock('~/server/services/user.service', () => ({
  findUserByEmail: vi.fn(),
  setPasswordResetToken: vi.fn(),
}))

vi.mock('@sendgrid/mail', () => ({
  default: {
    setApiKey: vi.fn(),
    send: vi.fn(),
  },
}))

vi.mock('h3', async (importOriginal) => {
  const original = await importOriginal()
  return {
    ...(original as any),
    readBody: vi.fn(),
    defineEventHandler: (handler: any) => handler, // Simplistic mock for defineEventHandler
    createError: vi.fn((err) => { throw ({ ...err, isError: true }) }), // Mock createError to throw
  }
})

vi.mock('crypto', () => ({
  default: { // Assuming crypto is used as default import
    randomBytes: vi.fn(() => ({ toString: vi.fn(() => 'unhashedToken123') })),
    createHash: vi.fn(() => ({ update: vi.fn(() => ({ digest: vi.fn(() => 'hashedToken123') })) })),
  }
}))

const mockedUserService = userService as unknown as {
  findUserByEmail: ReturnType<typeof vi.fn>;
  setPasswordResetToken: ReturnType<typeof vi.fn>;
}

const mockedSgMail = sgMail as unknown as {
  setApiKey: ReturnType<typeof vi.fn>;
  send: ReturnType<typeof vi.fn>;
}

const mockedReadBody = readBody as ReturnType<typeof vi.fn>
const mockedCrypto = crypto as unknown as {
  randomBytes: ReturnType<typeof vi.fn>;
  createHash: ReturnType<typeof vi.fn>;
}

// Store original process.env
const originalEnv = { ...process.env }

describe('Request Password Reset API Endpoint', () => {
  let mockEvent: any

  beforeEach(() => {
    vi.resetAllMocks()
    // Restore original env variables before each test
    process.env = { ...originalEnv }

    mockEvent = {
      // Mock event object as needed by h3 handlers
      node: { req: {}, res: {} },
      context: {},
    }
    // Mock defineEventHandler to just return the handler
    // This is a simplified approach; actual testing might need a more complex setup
  })

  afterEach(() => {
    // Restore original env variables after each test
    process.env = { ...originalEnv }
  })

  it('should throw 400 if email is not provided', async () => {
    mockedReadBody.mockResolvedValue({})
    await expect(requestPasswordResetHandler(mockEvent))
      .rejects.toMatchObject({ statusCode: 400, statusMessage: 'Email is required' })
  })

  it('should return generic message if user not found', async () => {
    mockedReadBody.mockResolvedValue({ email: 'notfound@example.com' })
    mockedUserService.findUserByEmail.mockResolvedValue(null)

    const response = await requestPasswordResetHandler(mockEvent)
    expect(response).toEqual({ message: 'If an account with this email exists, a password reset link has been sent.' })
    expect(mockedUserService.setPasswordResetToken).not.toHaveBeenCalled()
    expect(mockedSgMail.send).not.toHaveBeenCalled()
  })

  it('should set token and send email if user found and SENDGRID_API_KEY is set', async () => {
    process.env.SENDGRID_API_KEY = 'test-key'
    process.env.RESET_PASSWORD_EMAIL_FROM = 'test-from@example.com'
    process.env.BASE_URL = 'http://localhost:3000'

    const mockUser = { _id: 'userId1', email: 'user@example.com', username: 'testuser' }
    mockedReadBody.mockResolvedValue({ email: mockUser.email })
    mockedUserService.findUserByEmail.mockResolvedValue(mockUser)
    mockedUserService.setPasswordResetToken.mockResolvedValue({ ...mockUser, resetPasswordToken: 'hashedToken123' } as any)
    mockedSgMail.send.mockResolvedValue({} as any) // Cast to any to satisfy sgMail.send type

    const response = await requestPasswordResetHandler(mockEvent)

    expect(mockedUserService.setPasswordResetToken).toHaveBeenCalledWith(mockUser._id, 'hashedToken123', expect.any(Date))
    expect(mockedSgMail.setApiKey).toHaveBeenCalledWith('test-key')
    expect(mockedSgMail.send).toHaveBeenCalledWith(expect.objectContaining({
      to: mockUser.email,
      from: 'test-from@example.com',
      subject: 'Your Password Reset Request',
      html: expect.stringContaining('http://localhost:3000/reset-password/unhashedToken123'),
    }))
    expect(response).toEqual({ message: 'If an account with this email exists, a password reset link has been sent.' })
  })

  it('should log reset link if SENDGRID_API_KEY is not set', async () => {
    delete process.env.SENDGRID_API_KEY // Ensure it's not set
    const consoleLogSpy = vi.spyOn(console, 'log')

    const mockUser = { _id: 'userId2', email: 'user2@example.com', username: 'testuser2' }
    mockedReadBody.mockResolvedValue({ email: mockUser.email })
    mockedUserService.findUserByEmail.mockResolvedValue(mockUser)
    mockedUserService.setPasswordResetToken.mockResolvedValue({ ...mockUser, resetPasswordToken: 'hashedToken123' } as any)

    const response = await requestPasswordResetHandler(mockEvent)

    expect(mockedUserService.setPasswordResetToken).toHaveBeenCalled()
    expect(mockedSgMail.send).not.toHaveBeenCalled()
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining(`SENDGRID_API_KEY not set. Skipping email. Reset link for ${mockUser.email}:`))
    expect(response).toEqual({ message: 'If an account with this email exists, a password reset link has been sent.' })
    consoleLogSpy.mockRestore()
  })

  it('should handle error during setPasswordResetToken', async () => {
    process.env.SENDGRID_API_KEY = 'test-key'
    const mockUser = { _id: 'userId3', email: 'user3@example.com' }
    mockedReadBody.mockResolvedValue({ email: mockUser.email })
    mockedUserService.findUserByEmail.mockResolvedValue(mockUser)
    mockedUserService.setPasswordResetToken.mockRejectedValue(new Error('DB error'))

    await expect(requestPasswordResetHandler(mockEvent))
      .rejects.toMatchObject({ statusMessage: 'Internal server error while processing password reset request.' })
  })

  it('should handle error during sgMail.send but still return generic success', async () => {
    process.env.SENDGRID_API_KEY = 'test-key'
    const mockUser = { _id: 'userId4', email: 'user4@example.com' }
    mockedReadBody.mockResolvedValue({ email: mockUser.email })
    mockedUserService.findUserByEmail.mockResolvedValue(mockUser)
    mockedUserService.setPasswordResetToken.mockResolvedValue({ ...mockUser, resetPasswordToken: 'hashedToken123' } as any)
    mockedSgMail.send.mockRejectedValue(new Error('SendGrid error'))
    const consoleErrorSpy = vi.spyOn(console, 'error')

    const response = await requestPasswordResetHandler(mockEvent)

    expect(mockedSgMail.send).toHaveBeenCalled()
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error sending password reset email via SendGrid:', 'SendGrid error')
    expect(response).toEqual({ message: 'If an account with this email exists, a password reset link has been sent.' })
    consoleErrorSpy.mockRestore()
  })
})
