import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'

type HeroProps = Extract<Page['layout'][0], { blockType: 'hero' }>

export default function HeroBlock({ block }: { block: HeroProps }) {
  return (
    <div
      style={{
        border: '1px dashed gray',
        padding: '20px',
      }}
    >
      {/* <h1>{block.heading}</h1> */}
      <RichText data={block.heading} />
      {block.subheading && <RichText data={block.subheading} />}
      {typeof block?.image === 'object' && block?.image?.url && (
        <Image src={block?.image.url} alt={block?.image.alt} width={1280} height={400} priority />
      )}
      {block?.cta?.url && (
        <Link
          href={block.cta.url}
          style={{
            textDecoration: 'none',
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            display: 'inline-block',
            marginTop: '20px',
          }}
        >
          {block?.cta?.label}
        </Link>
      )}
    </div>
  )
}
