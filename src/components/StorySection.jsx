import { GamepadIcon, PixelHeart } from './Icons.jsx';

export default function StorySection() {
  return (
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
