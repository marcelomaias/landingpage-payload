import { RichText } from '@payloadcms/richtext-lexical/react'

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface AnimatedMainHeading {
  data: SerializedEditorState
  className?: string
}

export function MainHeading({ data, className }: AnimatedMainHeading) {
  return <RichText data={data} />
}
