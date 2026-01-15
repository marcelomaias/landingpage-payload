import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'
import { FaRegCheckCircle } from 'react-icons/fa'

type HeroProps = Extract<Page['layout'][0], { blockType: 'hero' }>

export default function HeroBlock({ block }: { block: HeroProps }) {
  return (
    <section className="heroSection">
      <RichText data={block.heading} />

      {block.subheading && <RichText data={block.subheading} />}
      {typeof block?.image === 'object' && block?.image?.url && (
        <Image src={block?.image.url} alt={block?.image.alt} width={1280} height={400} priority />
      )}
      {block.advantages && block.advantages.length > 0 && (
        <div className="advantagesGrid">
          {block.advantages.map((adv, idx) => (
            <div className="advantageItem" key={idx}>
              <h3>
                <FaRegCheckCircle />
                {adv?.title}
              </h3>
            </div>
          ))}
        </div>
      )}
      <div className="ctas">
        {block?.cta?.url && (
          <Link className="cta ctaPrimary" href={block.cta.url}>
            {block?.cta?.label}
          </Link>
        )}
        {block?.cta2?.url && (
          <Link className="cta ctaSecondary" href={block.cta2.url}>
            {block?.cta2?.label}
          </Link>
        )}
      </div>
    </section>
  )
}
