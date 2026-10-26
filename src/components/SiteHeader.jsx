import { PixelHeart } from './Icons.jsx';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Alya dan Bima, kembali ke atas">
        <PixelHeart />
        <span>A<span className="brand-amp">&amp;</span>B</span>
      </a>
      <a className="nav-cta" href="#rsvp">Kirim RSVP <span aria-hidden="true">↗</span></a>
    </header>
  );
}
