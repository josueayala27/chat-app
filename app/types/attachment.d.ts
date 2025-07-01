export interface Attachment {
  sha256: string
  key: string

  content_type: string
  file_name: string
  size: number

  sender_id: Types.ObjectId
  ref_count: number

  meta?: Record<string, any>
}
