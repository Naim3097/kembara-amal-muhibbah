import usePageTitle from '../hooks/usePageTitle'
import { org } from '../data/organisation'
import { PageHero, Section } from '../components/ui'
import { useLang } from '../i18n/LanguageContext'

const photos = [
  { src: '/images/volunteers-group.jpg', key: 'photos.group' },
  { src: '/images/kenduri-crowd.jpg', key: 'photos.crowd' },
  { src: '/images/kenduri-serving-01.jpg', key: 'photos.serving1' },
  { src: '/images/kenduri-serving-02.jpg', key: 'photos.kitchen' },
  { src: '/images/kenduri-serving-03.jpg', key: 'photos.queue' },
  { src: '/images/kenduri-serving-04.jpg', key: 'photos.children' },
  { src: '/images/azan-competition.jpg', key: 'photos.azan' },
  { src: '/images/volunteers-loading.jpg', key: 'photos.loading' },
  { src: '/images/kelas-fardhu-ain.jpg', key: 'photos.fardhuAin' },
]

export default function Gallery() {
  const { t } = useLang()
  usePageTitle(t('gallery.eyebrow'))
  return (
    <>
      <PageHero eyebrow={t('gallery.eyebrow')} title={t('gallery.title')} lede={t('gallery.lede')} />
      <Section>
        <div className="gallery">
          {photos.map((p) => (
            <figure key={p.src}>
              <img src={p.src} alt={t(p.key)} loading="lazy" />
              <figcaption>{t(p.key)}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6">
          <a href={org.facebook} className="text-link" target="_blank" rel="noreferrer">
            {t('gallery.more')}
          </a>
        </p>
      </Section>
    </>
  )
}
