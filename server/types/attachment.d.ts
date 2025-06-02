export interface Attachment {
  content_type: string
  filename: string
  size: number
  url: string

  // Photo
  height?: number
  width?: number
}
