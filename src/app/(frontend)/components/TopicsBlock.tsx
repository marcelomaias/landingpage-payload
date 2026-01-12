import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

type TopicsProps = Extract<Page['layout'][0], { blockType: 'topics' }>

export default function TopicsBlock({ block }: { block: TopicsProps }) {
  return (
    <section id="topics" className="topicsSection">
      {block.topics && block.topics.length > 0 && (
        <div className="topicsGrid">
          {block.topics.map((topic, idx) => (
            <div key={idx} className="topicItem">
              {typeof topic?.image === 'object' && topic?.image?.url && (
                <Image src={topic?.image.url} alt={topic?.image.alt} width={200} height={200} />
              )}
              <h3>{topic.title}</h3>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
