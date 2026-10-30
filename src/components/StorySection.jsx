import { GamepadIcon, PixelHeart } from './Icons.jsx';

export default function StorySection() {
  return (
    <section className="intro section-pad" id="story">
      <GamepadIcon className="gamepad-sprinkle intro-gamepad" />
      <div className="section-index"><span>01</span> PLAYER BACKSTORY</div>
      <div className="couple-intro" aria-label="Nama lengkap dan orang tua mempelai">
        <div className="couple-profile">
          <img
            className="couple-photo"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85"
            alt="Foto mempelai wanita"
            loading="lazy"
          />
          <p className="couple-role">MEMPELAI WANITA</p>
          <h3>Novielia Alfianita</h3>
          <p className="couple-family">Putri dari Bapak Bambang dan Ibu Kusmiati</p>
          <a className="couple-instagram" href="https://www.instagram.com/novielialfnt/" target="_blank" rel="noreferrer">
            @novielialfnt <span aria-hidden="true">↗</span>
          </a>
        </div>
        <span className="couple-ampersand" aria-hidden="true">&amp;</span>
        <div className="couple-profile">
          <img
            className="couple-photo"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=85"
            alt="Foto mempelai pria"
            loading="lazy"
          />
          <p className="couple-role">MEMPELAI PRIA</p>
          <h3>Wahyu Rio Mahendra</h3>
          <p className="couple-family">Putra dari Bapak Arifin dan Ibu Tri</p>
          <a className="couple-instagram" href="https://www.instagram.com/eternal_sky.kuro/" target="_blank" rel="noreferrer">
            @eternal_sky.kuro <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className="intro-grid">
        <div className="intro-title">
          <p className="eyebrow eyebrow-dark">TWO HEARTS, ONE SAVE FILE</p>
          <h2>Every great<br />game starts with<br /><em>a little magic.</em></h2>
        </div>
        <div className="intro-copy">
          <PixelHeart className="intro-heart" />
          <p>Berawal dari obrolan sederhana yang terasa seperti menemukan level rahasia, perjalanan kami tumbuh menjadi hal paling indah. Kini, kami siap membuka babak baru—dan akan sangat berarti jika kamu ikut merayakannya.</p>
          <p className="signature">Dengan cinta, <strong>Novi &amp; Rio</strong></p>
          <div className="intro-stats">
            <div><strong>2014.11.04</strong><span>FIRST HELLO</span></div>
            <div><strong>∞</strong><span>CONTINUES...</span></div>
          </div>
        </div>
      </div>
      <a className="section-next" href="#details">NEXT: WAKTU &amp; ACARA <span aria-hidden="true">↓</span></a>
    </section>
  );
}
