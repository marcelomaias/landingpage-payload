import { Block } from 'payload'

export const FeaturesBlock: Block = {
  slug: 'features',
  fields: [
    {
      name: 'heading',
      type: 'richText',
      required: true,
    },
    {
      name: 'subheading',
      type: 'richText',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      labels: {
        singular: 'feature',
        plural: 'features',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
