import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

type AdminScreensProps = Extract<Page['layout'][0], { blockType: 'admin-screenshots' }>

export default function AdminScreensBlock({ block }: { block: AdminScreensProps }) {
  return (
    <section className="adminScreensSection">
      {block.screens && (
        <>
          {block.screens.map((screen, index) => (
            <div key={index} className={`adminScreenRow ${screen.alignment}`}>
              {screen.text && <RichText data={screen.text} />}
              {screen.image && typeof screen.image === 'object' && screen.image.url && (
                <Image src={screen.image.url} alt={screen.image.alt} width={600} height={400} />
              )}
            </div>
          ))}
        </>
      )}
    </section>
  )
}
