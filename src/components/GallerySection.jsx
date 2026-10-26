export default function GallerySection() {
  return (
    <section className="gallery" id="gallery">
      <div className="gallery-heading">
        <div className="section-index"><span>03</span> MEMORY CARD</div>
        <p className="eyebrow">A FEW FAVORITE FRAMES</p>
        <h2>Our little <em>universe.</em></h2>
      </div>
      <div className="gallery-grid">
        <figure className="gallery-photo pixel-frame gallery-photo-tall">
          <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85" alt="Potret pasangan dalam suasana hangat" loading="lazy" />
          <figcaption>LEVEL 01 — THE BEGINNING</figcaption>
        </figure>
        <figure className="gallery-photo pixel-frame gallery-photo-wide">
          <img src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1100&q=85" alt="Momen romantis pasangan di alam terbuka" loading="lazy" />
          <figcaption>LEVEL 02 — SIDE BY SIDE</figcaption>
        </figure>
        <figure className="gallery-photo pixel-frame gallery-photo-small">
          <img src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=85" alt="Momen bahagia menjelang pernikahan" loading="lazy" />
          <figcaption>LEVEL 03 — FOREVER PLAYER TWO</figcaption>
        </figure>
        <figure className="gallery-photo pixel-frame gallery-photo-fourth">
          <img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=85" alt="Alya dan Bima menikmati waktu bersama" loading="lazy" />
          <figcaption>LEVEL 04 — OUR NEXT CHAPTER</figcaption>
        </figure>
      </div>
      <p className="gallery-note"><span>+</span> MOMEN-MOMEN KECIL, KENANGAN BESAR <span>+</span></p>
      <a className="section-next" href="#rsvp">NEXT: RSVP <span aria-hidden="true">↓</span></a>
    </section>
  );
}
