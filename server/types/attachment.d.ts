export interface Attachment {
  content_type: string
  file_name: string
  size: number

  // Photo
  height?: number
  width?: number
}
