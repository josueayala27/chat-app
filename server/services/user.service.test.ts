import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { User as UserModel } from '~/server/models/User' // Actual path to User model
import * as userService from '~/server/services/user.service' // Actual path to user service
import bcryptjs from 'bcryptjs'

// Mock the User model
vi.mock('~/server/models/User', () => {
  return {
    User: {
      findOne: vi.fn(),
      findByIdAndUpdate: vi.fn(),
    }
  }
})

// Mock bcryptjs
vi.mock('bcryptjs', () => {
  return {
    default: { // Assuming bcryptjs is used as default export
      hash: vi.fn(),
    }
  }
})

// Cast mocks to the correct type for intellisense and type checking
const MockedUser = UserModel as unknown as {
  findOne: ReturnType<typeof vi.fn>;
  findByIdAndUpdate: ReturnType<typeof vi.fn>;
}

const MockedBcrypt = bcryptjs as unknown as {
  hash: ReturnType<typeof vi.fn>;
}


describe('User Service', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('findUserByEmail', () => {
    it('should return a user if found', async () => {
      const mockUser = { _id: '1', email: 'test@example.com', username: 'testuser' }
      MockedUser.findOne.mockResolvedValue(mockUser)
      const user = await userService.findUserByEmail('test@example.com')
      expect(MockedUser.findOne).toHaveBeenCalledWith({ email: 'test@example.com' })
      expect(user).toEqual(mockUser)
    })

    it('should return null if user not found', async () => {
      MockedUser.findOne.mockResolvedValue(null)
      const user = await userService.findUserByEmail('test@example.com')
      expect(MockedUser.findOne).toHaveBeenCalledWith({ email: 'test@example.com' })
      expect(user).toBeNull()
    })
  })

  describe('setPasswordResetToken', () => {
    it('should call findByIdAndUpdate with correct parameters and return updated user', async () => {
      const mockUser = { _id: '1', email: 'test@example.com' }
      const token = 'resetToken123'
      const expiresAt = new Date(Date.now() + 3600000) // 1 hour from now
      MockedUser.findByIdAndUpdate.mockResolvedValue({ ...mockUser, resetPasswordToken: token, resetPasswordExpires: expiresAt })

      const updatedUser = await userService.setPasswordResetToken('1', token, expiresAt)

      expect(MockedUser.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { $set: { resetPasswordToken: token, resetPasswordExpires: expiresAt } },
        { new: true }
      )
      expect(updatedUser).toEqual({ ...mockUser, resetPasswordToken: token, resetPasswordExpires: expiresAt })
    })
  })

  describe('verifyPasswordResetToken', () => {
    it('should return user if token is valid and not expired', async () => {
      const mockUser = { _id: '1', email: 'test@example.com', resetPasswordToken: 'hashedToken123' }
      // We need to ensure that Date.now() inside the service function is properly handled.
      // For this test, we assume the token's expiry is in the future.
      MockedUser.findOne.mockResolvedValue(mockUser)

      const user = await userService.verifyPasswordResetToken('hashedToken123')

      expect(MockedUser.findOne).toHaveBeenCalledWith({
        resetPasswordToken: 'hashedToken123',
        resetPasswordExpires: { $gt: expect.any(Date) }, // Check that $gt is used with a Date
      })
      expect(user).toEqual(mockUser)
    })

    it('should return null if token is invalid or expired', async () => {
      MockedUser.findOne.mockResolvedValue(null)
      const user = await userService.verifyPasswordResetToken('invalidOrExpiredToken')
      expect(MockedUser.findOne).toHaveBeenCalledWith({
        resetPasswordToken: 'invalidOrExpiredToken',
        resetPasswordExpires: { $gt: expect.any(Date) },
      })
      expect(user).toBeNull()
    })
  })

  describe('updateUserPassword', () => {
    it('should hash password and update user, clearing reset token fields', async () => {
      const mockUserId = '1'
      const newPassword = 'newPassword123'
      const hashedPassword = 'hashedNewPassword123'
      const mockUpdatedUser = { _id: mockUserId, password: hashedPassword }

      MockedBcrypt.hash.mockResolvedValue(hashedPassword)
      MockedUser.findByIdAndUpdate.mockResolvedValue(mockUpdatedUser)

      const updatedUser = await userService.updateUserPassword(mockUserId, newPassword)

      expect(MockedBcrypt.hash).toHaveBeenCalledWith(newPassword, 10)
      expect(MockedUser.findByIdAndUpdate).toHaveBeenCalledWith(
        mockUserId,
        { $set: { password: hashedPassword, resetPasswordToken: undefined, resetPasswordExpires: undefined } },
        { new: true }
      )
      expect(updatedUser).toEqual(mockUpdatedUser)
    })
  })
})
