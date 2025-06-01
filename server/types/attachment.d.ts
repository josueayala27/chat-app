export interface Attachment {
  content_type: string
  filename: string
  size: number

  // Photo
  height?: number
  width?: number
  url: string
}
