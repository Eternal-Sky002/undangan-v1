import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const WEDDING_DATE = new Date('2026-10-24T08:00:00+07:00');
const SECTION_LINKS = [
  { id: 'home', label: 'HOME', icon: '⌂' },
  { id: 'story', label: 'KISAH', icon: '♥' },
  { id: 'details', label: 'WAKTU & ACARA', icon: '◷' },
  { id: 'gallery', label: 'FOTO', icon: '▧' },
  { id: 'rsvp', label: 'RSVP', icon: '↗' },
  { id: 'gift', label: 'GIFT', icon: '✦' },
];

function PixelHeart({ className = '' }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 16 14" fill="currentColor">
      <path d="M8 13.2 2.1 7.5A3.7 3.7 0 0 1 7.3 2.2L8 3l.7-.8a3.7 3.7 0 0 1 5.2 5.3L8 13.2Z" />
    </svg>
  );
}

function GamepadIcon({ className = '' }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 48 32" fill="none">
      <path d="M14.2 5.5h19.6a8.5 8.5 0 0 1 8.3 6.8l2 9.2a5.6 5.6 0 0 1-9.3 5.2l-5.1-4.6H18.3l-5.1 4.6a5.6 5.6 0 0 1-9.3-5.2l2-9.2a8.5 8.5 0 0 1 8.3-6.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 12v8m-4-4h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="33" cy="14" r="1.5" fill="currentColor" />
      <circle cx="37" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}

function Countdown() {
  const [remaining, setRemaining] = useState(() => getRemaining());

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  function getRemaining() {
    const distance = Math.max(0, WEDDING_DATE.getTime() - Date.now());
    return {
      days: Math.floor(distance / 86_400_000),
      hours: Math.floor((distance / 3_600_000) % 24),
      minutes: Math.floor((distance / 60_000) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  }

  return (
    <div className="countdown" aria-label="Hitung mundur menuju hari pernikahan">
      {Object.entries(remaining).map(([unit, value]) => (
        <div className="countdown-unit" key={unit}>
          <span className="countdown-number">{String(value).padStart(2, '0')}</span>
          <span className="countdown-label">
            {unit === 'days' ? 'hari' : unit === 'hours' ? 'jam' : unit === 'minutes' ? 'menit' : 'detik'}
          </span>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (!isEntering) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShowInvitation(true);
      setHasEntered(true);
      return undefined;
    }

    const revealTimer = window.setTimeout(() => setShowInvitation(true), 2400);
    const completeTimer = window.setTimeout(() => setHasEntered(true), 3000);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(completeTimer);
    };
  }, [isEntering]);

  useEffect(() => {
    if (!hasEntered) return undefined;

    const sections = SECTION_LINKS
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length === 0) return;

        visibleSections.sort(
          (first, second) =>
            Math.abs(first.boundingClientRect.top - window.innerHeight * 0.35) -
            Math.abs(second.boundingClientRect.top - window.innerHeight * 0.35),
        );
        setActiveSection(visibleSections[0].target.id);
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [hasEntered]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = hasEntered ? previousOverflow : 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [hasEntered]);

  function handleRsvp(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const guestName = form.get('guestName')?.toString().trim();
    if (!guestName) {
      setRsvpMessage('Silakan isi nama terlebih dahulu.');
      return;
    }

    const attendance = form.get('attendance');
    const guestMessage = form.get('guestMessage')?.toString().trim();
    if (!guestMessage) {
      setRsvpMessage('Silakan isi ucapan atau doa terlebih dahulu.');
      return;
    }
    setRsvpMessage(
      attendance === 'yes'
        ? `Terima kasih, ${guestName}! RSVP dan ucapanmu sudah kami terima. Sampai bertemu di hari bahagia kami!`
        : `Terima kasih sudah memberi kabar, ${guestName}. Ucapanmu sangat berarti untuk kami.`,
    );
    event.currentTarget.reset();
  }

  return (
    <>
      {!hasEntered && (
        <section className={`game-entrance${isEntering ? ' is-entering' : ''}`} aria-labelledby="entrance-title">
          <div className="entrance-stars" aria-hidden="true" />
          <div className="link-hud" aria-hidden="true">
            <span className="link-hud-corner link-hud-top-left" />
            <span className="link-hud-corner link-hud-top-right" />
            <span className="link-hud-corner link-hud-bottom-left" />
            <span className="link-hud-corner link-hud-bottom-right" />
            <span className="link-hud-ring" />
            <span className="link-hud-scanline" />
            <span className="link-hud-label link-hud-label-top">LINK SYSTEM <i>·</i> CONNECTING</span>
            <span className="link-hud-label link-hud-label-bottom">WELCOME, PLAYER <i>01</i></span>
            <span className="link-hud-message">WORLD LINKED</span>
            <span className="link-hud-submessage">ENTERING SHARED WORLD</span>
            <span className="link-hud-progress"><i /></span>
          </div>
          <div className="entrance-frame">
            <p className="entrance-kicker"><PixelHeart /> A LOVE STORY, NEXT LEVEL</p>
            <div className="entrance-art" aria-hidden="true">
              <span className="entrance-orbit entrance-orbit-one" />
              <span className="entrance-orbit entrance-orbit-two" />
              <img
                className="entrance-anime"
                src="https://plus.unsplash.com/premium_photo-1761929642510-be8d4bb29b06?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                alt=""
              />
              <span className="entrance-spark entrance-spark-one">✦</span>
              <span className="entrance-spark entrance-spark-two">✳</span>
            </div>
            <p className="entrance-overline">ALYA <span>+</span> BIMA</p>
            <h1 id="entrance-title" className="entrance-title">The next level<br /><em>starts here.</em></h1>
            <p className="entrance-description">Sebuah kisah baru menanti untuk dimulai.<br />Kami senang jika kamu menjadi bagian di dalamnya.</p>
            <button className="entrance-button" type="button" disabled={isEntering} onClick={() => setIsEntering(true)}>
              <span aria-hidden="true">▶</span> {isEntering ? 'MEMASUKI PERMAINAN...' : 'MASUK KE PERMAINAN'} <span aria-hidden="true">↗</span>
            </button>
            <p className="entrance-hint">YOUR STORY STARTS HERE <span>·</span> 24 OKTOBER 2026</p>
          </div>
          <span className="entrance-corner entrance-corner-top">SYSTEM ONLINE · 01</span>
          <span className="entrance-corner entrance-corner-bottom">PLAYER 01 + PLAYER 02</span>
        </section>
      )}
      {showInvitation && (
        <>
      <div className="invitation-reveal">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Alya dan Bima, kembali ke atas">
          <PixelHeart />
          <span>A<span className="brand-amp">&amp;</span>B</span>
        </a>
        <a className="nav-cta" href="#rsvp">Kirim RSVP <span aria-hidden="true">↗</span></a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-noise" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> PLAYER 01 + PLAYER 02</p>
            <h1>THE NEXT<br /><em>LEVEL</em> IS<br />TOGETHER<span className="period">.</span></h1>
            <p className="hero-description">Satu kisah, dua pemain, dan petualangan baru yang dimulai bersama.</p>
            <a href="#story" className="button button-light">
              MULAI PETUALANGAN <span aria-hidden="true">↓</span>
            </a>
            <figure className="hero-copy-photo">
              <img
                src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=500&q=85"
                alt="Alya dan Bima menikmati waktu bersama"
              />
              <figcaption>PLAYER 01 + 02</figcaption>
            </figure>
            <p className="hero-date"><span className="status-dot" /> 24 OKTOBER 2026 <span className="date-divider">/</span> BANDUNG, INDONESIA</p>
          </div>

          <div className="hero-art">
            <div className="hero-spark spark-one" aria-hidden="true">✳</div>
            <div className="hero-spark spark-two" aria-hidden="true">✦</div>
            <GamepadIcon className="gamepad-sprinkle hero-gamepad-one" />
            <GamepadIcon className="gamepad-sprinkle hero-gamepad-two" />
            <figure className="hero-photo-secondary">
              <img
                src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=700&q=85"
                alt="Potret pasangan untuk kenangan kecil di awal kisah mereka"
              />
              <figcaption>OUR FIRST SAVE</figcaption>
            </figure>
            <div className="hero-photo pixel-frame">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1100&q=85"
                alt="Pasangan pengantin merayakan hari istimewa mereka"
              />
              <div className="pixel-card" aria-label="Alya dan Bima, pemain satu dan dua">
                <span className="pixel-card-label">THE PERFECT TEAM</span>
                <div className="player-row"><span className="player-icon">A</span><span>ALYA</span><span className="player-heart">♥♥♥</span></div>
                <div className="player-row"><span className="player-icon player-icon-alt">B</span><span>BIMA</span><span className="player-heart">♥♥♥</span></div>
                <span className="pixel-card-footer">CO-OP MODE: ON</span>
              </div>
              <div className="photo-caption"><span>FIG. 01</span><span>OUR PLAYER SELECT</span></div>
            </div>
            <div className="hero-side-note">A LOVE STORY IN GAME &amp; REAL LIFE <span>✳</span></div>
          </div>
          <a className="scroll-cue" href="#story"><span /> NEXT: OUR STORY ↓</a>
        </section>

        <section className="intro section-pad" id="story">
          <GamepadIcon className="gamepad-sprinkle intro-gamepad" />
          <div className="section-index"><span>01</span> PLAYER BACKSTORY</div>
          <div className="intro-grid">
            <div className="intro-title">
              <p className="eyebrow eyebrow-dark">TWO HEARTS, ONE SAVE FILE</p>
              <h2>Every great<br />game starts with<br /><em>a little magic.</em></h2>
            </div>
            <div className="intro-copy">
              <PixelHeart className="intro-heart" />
              <p>Berawal dari obrolan sederhana yang terasa seperti menemukan level rahasia, perjalanan kami tumbuh menjadi hal paling indah. Kini, kami siap membuka babak baru—dan akan sangat berarti jika kamu ikut merayakannya.</p>
              <p className="signature">Dengan cinta, <strong>Alya &amp; Bima</strong></p>
              <div className="intro-stats">
                <div><strong>08.14</strong><span>FIRST HELLO</span></div>
                <div><strong>∞</strong><span>CONTINUES...</span></div>
              </div>
            </div>
          </div>
          <a className="section-next" href="#details">NEXT: WAKTU &amp; ACARA <span aria-hidden="true">↓</span></a>
        </section>

        <section className="details section-pad" id="details">
          <GamepadIcon className="gamepad-sprinkle details-gamepad" />
          <div className="section-index"><span>02</span> EVENT SELECT</div>
          <div className="event-countdown">
            <div className="countdown-inner">
              <div>
                <p className="eyebrow"><span className="eyebrow-line" /> THE BIG DAY IS LOADING</p>
                <h2>Ready, player?</h2>
              </div>
              <Countdown />
            </div>
            <div className="countdown-bottom"><span>24—10—2026</span><span className="loading-track"><i /></span><span>LOADING HAPPINESS...</span></div>
          </div>
          <div className="details-heading">
            <div><p className="eyebrow eyebrow-dark">CHOOSE YOUR ADVENTURE</p><h2>Meet us<br /><em>at the altar.</em></h2></div>
            <p className="details-intro">Dua momen istimewa, satu hari yang tak terlupakan. Simpan tanggalnya, ya!</p>
          </div>
          <div className="event-grid">
            <article className="event-card">
              <div className="event-number">01 <span>MAIN QUEST</span></div>
              <div className="event-icon" aria-hidden="true">✳</div>
              <p className="eyebrow eyebrow-dark">SABTU, 24 OKTOBER 2026</p>
              <h3>Akad Nikah</h3>
              <p className="event-time">08.00 — 10.00 WIB</p>
              <div className="event-rule" />
              <p className="event-venue"><strong>Griya Svara</strong><br />Jl. Dago Pakar No. 18, Bandung</p>
              <a className="text-link" href="https://maps.google.com/?q=Dago+Pakar+Bandung" target="_blank" rel="noreferrer">BUKA PETA <span aria-hidden="true">↗</span></a>
            </article>
            <article className="event-card event-card-alt">
              <div className="event-number">02 <span>BONUS LEVEL</span></div>
              <div className="event-icon" aria-hidden="true">✦</div>
              <p className="eyebrow eyebrow-dark">SABTU, 24 OKTOBER 2026</p>
              <h3>Resepsi</h3>
              <p className="event-time">11.00 — 14.00 WIB</p>
              <div className="event-rule" />
              <p className="event-venue"><strong>Griya Svara</strong><br />Jl. Dago Pakar No. 18, Bandung</p>
              <a className="text-link" href="https://maps.google.com/?q=Dago+Pakar+Bandung" target="_blank" rel="noreferrer">BUKA PETA <span aria-hidden="true">↗</span></a>
            </article>
          </div>
          <p className="dress-code"><span>✳</span> DRESS CODE <strong>EARTH TONES</strong> <span className="dress-divider">/</span> DATANG DENGAN SENYUM TERBAIKMU</p>
          <a className="section-next" href="#gallery">NEXT: PHOTO GALLERY <span aria-hidden="true">↓</span></a>
        </section>

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

        <section className="rsvp section-pad" id="rsvp">
          <div className="rsvp-decoration" aria-hidden="true"><PixelHeart /><span>♥</span><PixelHeart /></div>
          <div className="section-index"><span>04</span> JOIN THE PARTY</div>
          <div className="rsvp-content">
            <div className="rsvp-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> YOUR PLAYER SLOT IS WAITING</p>
              <h2>Will you<br /><em>join us?</em></h2>
              <p>Kehadiranmu adalah hadiah paling berharga. Kabari kami sebelum 17 Oktober 2026, ya!</p>
            </div>
            <form className="rsvp-form" onSubmit={handleRsvp}>
              <label htmlFor="guestName">NAMA KAMU</label>
              <input id="guestName" name="guestName" type="text" placeholder="Tulis nama lengkap" required />
              <label htmlFor="attendance">KONFIRMASI KEHADIRAN</label>
              <select id="attendance" name="attendance" defaultValue="" required>
                <option value="" disabled>Pilih konfirmasi kehadiran</option>
                <option value="yes">Yes! Aku akan datang</option>
                <option value="no">Maaf, aku belum bisa hadir</option>
              </select>
              <label htmlFor="guestMessage">UCAPAN &amp; DOA</label>
              <textarea id="guestMessage" name="guestMessage" rows="4" maxLength="300" placeholder="Tuliskan ucapan atau doa terbaikmu..." required />
              <button className="button button-light" type="submit">KIRIM KONFIRMASI <span aria-hidden="true">↗</span></button>
              <p className="rsvp-message" role="status" aria-live="polite">{rsvpMessage}</p>
            </form>
          </div>
          <div className="rsvp-bottom"><span>PRESS START TO RSVP</span><span>PLAYER 01 + PLAYER 02 + YOU</span></div>
          <a className="section-next" href="#gift">WEDDING GIFT <span aria-hidden="true">↓</span></a>
        </section>

        <section className="wedding-gift section-pad" id="gift">
          <div className="section-index"><span>05</span> WEDDING GIFT</div>
          <div className="gift-content">
            <div>
              <p className="eyebrow eyebrow-dark">YOUR THOUGHTFUL GIFT</p>
              <h2>Wedding<br /><em>gift.</em></h2>
            </div>
            <div>
              <p className="gift-message">Doa restu Anda merupakan hadiah terindah bagi kami. Jika ingin berbagi tanda kasih, Anda dapat mengirimkannya melalui rekening berikut.</p>
              <div className="gift-account">
                <span className="gift-account-note">CONTOH — GANTI DENGAN DATA REKENING ASLI</span>
                <dl>
                  <div><dt>Bank</dt><dd>BANK CONTOH</dd></div>
                  <div><dt>Nomor rekening</dt><dd>0000 0000 0000</dd></div>
                  <div><dt>Atas nama</dt><dd>NAMA PEMILIK</dd></div>
                </dl>
              </div>
            </div>
          </div>
          <a className="section-next" href="#home">BACK TO START <span aria-hidden="true">↑</span></a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home"><PixelHeart /><span>A<span className="brand-amp">&amp;</span>B</span></a>
        <p>MADE WITH <span>♥</span> AND A LITTLE PIXEL MAGIC</p>
        <a href="#home" className="back-top">BACK TO TOP ↑</a>
      </footer>

      <nav className="floating-nav" aria-label="Pindah bagian undangan">
        {SECTION_LINKS.map(({ id, label, icon }) => (
          <a
            className={`floating-nav-link${activeSection === id ? ' is-active' : ''}`}
            href={`#${id}`}
            key={id}
            aria-label={`Ke bagian ${label.toLowerCase()}`}
            aria-current={activeSection === id ? 'location' : undefined}
          >
            <span className="floating-nav-icon" aria-hidden="true">{icon}</span>
            <span className="floating-nav-label">{label}</span>
          </a>
        ))}
      </nav>
      </div>
        </>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
