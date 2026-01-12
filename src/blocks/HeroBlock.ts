import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'heading',
      type: 'richText',
      required: true,
      admin: {
        width: '100%',
      },
    },
    {
      name: 'subheading',
      type: 'richText',
      admin: {
        width: '100%',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'advantages',
      type: 'array',
      labels: {
        singular: 'advantage',
        plural: 'advantages',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      admin: {
        width: '50%',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              admin: { width: '50%' },
            },
            {
              name: 'url',
              type: 'text',
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
    {
      name: 'cta2',
      type: 'group',
      admin: {
        width: '50%',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              admin: { width: '50%' },
            },
            {
              name: 'url',
              type: 'text',
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
  ],
}
