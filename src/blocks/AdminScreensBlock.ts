import { Block } from 'payload'

export const AdminScreensBlock: Block = {
  slug: 'admin-screenshots',
  fields: [
    {
      name: 'screens',
      type: 'array',
      labels: {
        singular: 'screen',
        plural: 'screens',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'text',
              type: 'richText',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          type: 'radio',
          name: 'alignment',
          defaultValue: 'text-first',
          required: true,
          admin: {
            layout: 'horizontal',
          },
          options: [
            { label: 'Text first', value: 'text-first' },
            { label: 'Image First', value: 'image-first' },
          ],
        },
      ],
    },
  ],
}
