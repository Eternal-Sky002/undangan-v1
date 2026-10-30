import { PixelHeart } from './Icons.jsx';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Novi dan Rio, kembali ke atas">
        <PixelHeart />
        <span>N<span className="brand-amp">&amp;</span>R</span>
      </a>
      <a className="nav-cta" href="#rsvp">Kirim RSVP <span aria-hidden="true">↗</span></a>
    </header>
  );
}
