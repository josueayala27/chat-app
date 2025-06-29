import Attachment from '~~/server/models/Attachment'
import { attachmentIdSchema } from '~~/server/validators/attachment.validator'

export default defineEventHandler(async (event) => {
  const { _id } = await getValidatedRouterParams(event, attachmentIdSchema.parse)

  const attachment = await Attachment.findByIdAndUpdate(_id, {
    $inc: { ref_count: -1 },
  })

  return {
    attachment,
  }
})
