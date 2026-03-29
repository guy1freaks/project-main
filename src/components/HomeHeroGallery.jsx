import { heroGalleryImages } from '../data/heroGallery'

function HomeHeroGallery() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero-head">
        <h2 id="home-hero-title" className="home-hero-title">
          ברוכים הבאים
        </h2>
        <p className="home-hero-subtitle">
          התמונות כאן להמחשה כללית בלבד. האתר אינו אתר רשמי של צה״ל.
        </p>
      </div>

      <div className="home-hero-scroll" role="region" aria-label="גלריית תמונות">
        <ul className="home-hero-track">
          {heroGalleryImages.map((img, i) => (
            <li key={img.id} className="home-hero-slide">
              <figure className="home-hero-figure">
                <div className="home-hero-frame" tabIndex={0}>
                  <img
                    src={img.src}
                    alt=""
                    width={640}
                    height={400}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="home-hero-img"
                  />
                  <div className="home-hero-overlay">
                    <p className="home-hero-overlay-text">{img.caption}</p>
                  </div>
                </div>
                <figcaption className="visually-hidden">
                  {img.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default HomeHeroGallery
