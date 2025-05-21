import { describe, it, expect, vi, beforeEach } from 'vitest'
import resetPasswordHandler from './reset-password.post' // Adjust path if needed
import * as userService from '~/server/services/user.service'
import { readBody, createError } from 'h3'
import crypto from 'crypto'

// Mock services and utilities
vi.mock('~/server/services/user.service', () => ({
  verifyPasswordResetToken: vi.fn(),
  updateUserPassword: vi.fn(),
}))

vi.mock('h3', async (importOriginal) => {
  const original = await importOriginal()
  return {
    ...(original as any),
    readBody: vi.fn(),
    defineEventHandler: (handler: any) => handler, // Simplistic mock
    createError: vi.fn((err) => { throw ({ ...err, isError: true }) }),
  }
})

vi.mock('crypto', () => ({
  default: {
    createHash: vi.fn(() => ({ update: vi.fn(() => ({ digest: vi.fn(() => 'hashedTokenFromInput') })) })),
  }
}))

const mockedUserService = userService as unknown as {
  verifyPasswordResetToken: ReturnType<typeof vi.fn>;
  updateUserPassword: ReturnType<typeof vi.fn>;
}

const mockedReadBody = readBody as ReturnType<typeof vi.fn>
const mockedCrypto = crypto as unknown as {
  createHash: ReturnType<typeof vi.fn>;
}

describe('Reset Password API Endpoint', () => {
  let mockEvent: any

  beforeEach(() => {
    vi.resetAllMocks()
    mockEvent = { node: { req: {}, res: {} }, context: {} }
  })

  it('should throw 400 if token is not provided', async () => {
    mockedReadBody.mockResolvedValue({ newPassword: 'pass', confirmPassword: 'pass' })
    await expect(resetPasswordHandler(mockEvent))
      .rejects.toMatchObject({ statusCode: 400, statusMessage: 'Reset token is required' })
  })

  it('should throw 400 if newPassword or confirmPassword is not provided', async () => {
    mockedReadBody.mockResolvedValue({ token: 'validToken' })
    await expect(resetPasswordHandler(mockEvent))
      .rejects.toMatchObject({ statusCode: 400, statusMessage: 'New password and confirmation are required' })
  })

  it('should throw 400 if passwords do not match', async () => {
    mockedReadBody.mockResolvedValue({ token: 'validToken', newPassword: 'password1', confirmPassword: 'password2' })
    await expect(resetPasswordHandler(mockEvent))
      .rejects.toMatchObject({ statusCode: 400, statusMessage: 'Passwords do not match' })
  })

  it('should throw 400 if token is invalid or expired', async () => {
    mockedReadBody.mockResolvedValue({ token: 'invalidToken', newPassword: 'password123', confirmPassword: 'password123' })
    mockedUserService.verifyPasswordResetToken.mockResolvedValue(null)

    await expect(resetPasswordHandler(mockEvent))
      .rejects.toMatchObject({ statusCode: 400, statusMessage: 'Invalid or expired password reset token.' })
    expect(mockedCrypto.createHash).toHaveBeenCalledWith('sha256')
    expect(mockedUserService.verifyPasswordResetToken).toHaveBeenCalledWith('hashedTokenFromInput')
  })

  it('should update password and return success if token is valid and passwords match', async () => {
    const mockUser = { _id: 'userId1', email: 'user@example.com' }
    mockedReadBody.mockResolvedValue({ token: 'validToken123', newPassword: 'newPassword123', confirmPassword: 'newPassword123' })
    mockedUserService.verifyPasswordResetToken.mockResolvedValue(mockUser)
    mockedUserService.updateUserPassword.mockResolvedValue({ ...mockUser, password: 'newHashedPassword' } as any)

    const response = await resetPasswordHandler(mockEvent)

    expect(mockedCrypto.createHash).toHaveBeenCalledWith('sha256')
    expect(mockedUserService.verifyPasswordResetToken).toHaveBeenCalledWith('hashedTokenFromInput')
    expect(mockedUserService.updateUserPassword).toHaveBeenCalledWith(mockUser._id, 'newPassword123')
    expect(response).toEqual({ message: 'Password has been reset successfully.' })
  })

  it('should handle error during updateUserPassword', async () => {
    const mockUser = { _id: 'userId1', email: 'user@example.com' }
    mockedReadBody.mockResolvedValue({ token: 'validToken123', newPassword: 'newPassword123', confirmPassword: 'newPassword123' })
    mockedUserService.verifyPasswordResetToken.mockResolvedValue(mockUser)
    mockedUserService.updateUserPassword.mockRejectedValue(new Error('DB error during password update'))

    await expect(resetPasswordHandler(mockEvent))
      .rejects.toMatchObject({ statusMessage: 'Internal server error' }) // Default for unhandled
     expect(mockedUserService.updateUserPassword).toHaveBeenCalledWith(mockUser._id, 'newPassword123')
  })
})
