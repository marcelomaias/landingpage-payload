import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

type FeaturesProps = Extract<Page['layout'][0], { blockType: 'features' }>

export default function FeaturesBlock({ block }: { block: FeaturesProps }) {
  return (
    <section id="features" className="featuresSection">
      {block.heading && <RichText data={block.heading} />}
      {block.subheading && <RichText data={block.subheading} />}
      {block.features && block.features.length > 0 && (
        <div className="featuresGrid">
          {block.features.map((feature, idx) => (
            <div key={idx} className="featureItem">
              <span>{idx + 1}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
