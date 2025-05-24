import type { ObjectId } from 'mongoose'
import type { IChat, IChatUser } from '../models/Chat'
import type { UserDocument } from '../models/User'
import mongoose from 'mongoose'
import Chat from '../models/Chat'

export async function getUserChatsWithPreview(user_id: ObjectId) {
  return Chat.aggregate([
    /**
     * 1. Find all chats where the current user is a participant.
     */
    { $match: { 'users.user_id': user_id } },

    /**
     * 2. Sort chats so most recently updated appear first (for chat previews).
     */
    { $sort: { updated_at: -1 } },

    /**
     * 3. Lookup the last message for each chat (sort by creation date descending and limit to 1).
     */
    {
      $lookup: {
        from: 'messages',
        let: { chat_id: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$chat_id', '$$chat_id'] } } },
          { $sort: { created_at: -1 } },
          { $limit: 1 },
          { $project: { content: 1, sender_id: 1, created_at: 1 } },
        ],
        as: 'last_message',
      },
    },

    /**
     * 4. Flatten last_message array into an object (since we only want one).
     */
    {
      $addFields: {
        last_message: { $arrayElemAt: ['$last_message', 0] },
      },
    },

    /**
     * 5. Lookup sender details (username, first_name, last_name) for last_message.
     */
    {
      $lookup: {
        from: 'users',
        let: { sender_id: '$last_message.sender_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', '$$sender_id'] } } },
          { $project: { username: 1, first_name: 1, last_name: 1 } },
        ],
        as: 'last_message_sender',
      },
    },

    /**
     * 6. Flatten last_message_sender array into an object under last_message.sender.
     */
    {
      $addFields: {
        'last_message.sender': { $arrayElemAt: ['$last_message_sender', 0] },
      },
    },

    /**
     * 7. For private chats: extract the friend (the other participant) by filtering out the current user.
     * For group chats: this field will not appear.
     */
    {
      $addFields: {
        friend_id: {
          $cond: [
            { $eq: ['$type', 'private'] },
            {
              $first: {
                $filter: {
                  input: '$users',
                  as: 'user',
                  cond: { $ne: ['$$user.user_id', user_id] },
                },
              },
            },
            '$$REMOVE',
          ],
        },
      },
    },

    /**
     * 8. Lookup friend details (username, first_name, last_name, avatar_url)
     * Uses friend_id extracted above for private chats.
     */
    {
      $lookup: {
        from: 'users',
        let: { friend_id: '$friend_id.user_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', '$$friend_id'] } } },
          { $project: { username: 1, first_name: 1, last_name: 1 } },
        ],
        as: 'friend',
      },
    },

    /**
     * 9. Flatten friend array into an object (or remove if not private).
     */
    {
      $addFields: {
        friend: { $arrayElemAt: ['$friend', 0] },
      },
    },

    /**
     * 10. Project only relevant fields:
     * - Remove users array, temporary fields, and timestamps from the final result.
     */
    {
      $project: {
        'users': 0,
        'last_message_sender': 0,
        'friend_id': 0,
        'created_at': 0,
        'updated_at': 0,
        'last_message.sender_id': 0,
      },
    },
  ])
}

/**
 * Creates a new group chat with the given users and name.
 *
 * @async
 * @param {IChat} body - Payload containing chat details.
 * @param {Array<{ user_id: string; is_admin?: boolean }>} body.users
 *   List of users to add to the chat. Each user object must have a `user_id`
 *   (string) and may optionally include `is_admin` (boolean).
 * @param {string} body.name - The desired name for the new group chat.
 * @returns {Promise<IChat>}
 *   The newly created Chat document.
 */
export async function createChat(body: IChat): Promise<IChat> {
  const users: IChatUser[] = body.users.map(u => ({
    user_id: new mongoose.Types.ObjectId(u.user_id),
    is_admin: !!u.is_admin,
    joined_at: new Date(),
  }))

  return Chat.create({ type: 'group', users, name: body.name })
}

export async function getChatById({ chat_id, user }: { user: UserDocument, chat_id: string }) {
  return Chat.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(chat_id) } },
    {
      $addFields: {
        friend_id: {
          $cond: [
            { $eq: ['$type', 'private'] },
            {
              $first: {
                $filter: {
                  input: '$users',
                  as: 'user',
                  cond: {
                    $ne: ['$$user.user_id', user._id],
                  },
                },
              },
            },
            '$$REMOVE',
          ],
        },
      },
    },
    {
      $project: {
        users: 0,
      },
    },
  ])
}
