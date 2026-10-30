import { GamepadIcon } from './Icons.jsx';

export default function HeroSection() {
  return (
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
        <p className="hero-date"><span className="status-dot" /> 9 JANUARI 2027 <span className="date-divider">/</span> MALANG, INDONESIA</p>
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
          <div className="pixel-card" aria-label="Novi dan Rio, pemain satu dan dua">
            <span className="pixel-card-label">THE PERFECT TEAM</span>
            <div className="player-row"><span className="player-icon">N</span><span>NOVI</span><span className="player-heart">♥♥♥</span></div>
            <div className="player-row"><span className="player-icon player-icon-alt">R</span><span>RIO</span><span className="player-heart">♥♥♥</span></div>
            <span className="pixel-card-footer">CO-OP MODE: ON</span>
          </div>
          <div className="photo-caption"><span>FIG. 01</span><span>OUR PLAYER SELECT</span></div>
        </div>
        <div className="hero-side-note">A LOVE STORY IN GAME &amp; REAL LIFE <span>✳</span></div>
      </div>
      <a className="scroll-cue" href="#story"><span /> NEXT: OUR STORY ↓</a>
    </section>
  );
}
