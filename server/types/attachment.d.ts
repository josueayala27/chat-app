export interface ImageMeta {
  width: number
  height: number
}

export interface ImageAttachment {
  content_type: 'image'
  meta: ImageMeta
}

export interface AudioMeta {
  duration: number
  bitrate?: number
}

export interface AudioAttachment {
  content_type: 'audio'
  meta: AudioMeta
}

export interface DocumentMeta {
  pages: number
}

export interface DocumentAttachment {
  content_type: 'application/pdf'
  meta: DocumentMeta
}

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
