import { PixelHeart } from './Icons.jsx';

export default function GameEntrance({ isEntering, onEnter }) {
  return (
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
        <p className="entrance-overline">NOVI <span>+</span> RIO</p>
        <h1 id="entrance-title" className="entrance-title">The next level<br /><em>starts here.</em></h1>
        <p className="entrance-description">Sebuah kisah baru menanti untuk dimulai.<br />Kami senang jika kamu menjadi bagian di dalamnya.</p>
        <button className="entrance-button" type="button" disabled={isEntering} onClick={onEnter}>
          <span aria-hidden="true">▶</span> {isEntering ? 'MEMASUKI PERMAINAN...' : 'MASUK KE PERMAINAN'} <span aria-hidden="true">↗</span>
        </button>
        <p className="entrance-hint">YOUR STORY STARTS HERE <span>·</span> 9 JANUARI 2027</p>
      </div>
      <span className="entrance-corner entrance-corner-top">SYSTEM ONLINE · 01</span>
      <span className="entrance-corner entrance-corner-bottom">PLAYER 01 + PLAYER 02</span>
    </section>
  );
}
