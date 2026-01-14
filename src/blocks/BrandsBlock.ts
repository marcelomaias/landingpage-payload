import { Block } from 'payload'

export const BrandsBlock: Block = {
  slug: 'brands',
  fields: [
    {
      name: 'heading',
      type: 'richText',
    },
    {
      name: 'brands',
      type: 'array',
      admin: {
        width: '40%',
      },
      labels: {
        singular: 'brand',
        plural: 'brands ',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
