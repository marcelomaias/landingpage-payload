import { AdminScreensBlock } from '@/blocks/AdminScreensBlock'
import { BrandsBlock } from '@/blocks/BrandsBlock'
import { ContentBlock } from '@/blocks/ContentBlock'
import { HeroBlock } from '@/blocks/HeroBlock'
import { NewsletterFormBlock } from '@/blocks/NewsletterFormBlock'
import { TopicsBlock } from '@/blocks/TopicsBlock'
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [
        HeroBlock,
        ContentBlock,
        NewsletterFormBlock,
        TopicsBlock,
        AdminScreensBlock,
        BrandsBlock,
      ],
    },
  ],
}
