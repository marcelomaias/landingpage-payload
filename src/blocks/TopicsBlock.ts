import { Block } from 'payload'

export const TopicsBlock: Block = {
  slug: 'topics',
  fields: [
    {
      name: 'topics',
      type: 'array',
      labels: {
        singular: 'topic',
        plural: 'topics',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
