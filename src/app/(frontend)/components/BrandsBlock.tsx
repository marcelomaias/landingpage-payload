import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

import Image from 'next/image'

type BrandsProps = Extract<Page['layout'][0], { blockType: 'brands' }>

export default function BrandsBlock({ block }: { block: BrandsProps }) {
  return (
    <section id="trust" className="brandsSection">
      {block.heading && <RichText data={block.heading} />}
      {block.brands && block.brands.length > 0 && (
        <div className="brandsGrid">
          {block.brands.map((brand, idx) => (
            <div key={idx}>
              {brand.image && typeof brand.image === 'object' && brand.image.url && (
                <Image src={brand.image.url} alt={brand.image.alt} width={150} height={75} />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
