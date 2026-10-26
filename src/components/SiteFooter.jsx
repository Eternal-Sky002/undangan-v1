import { PixelHeart } from './Icons.jsx';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="brand footer-brand" href="#home"><PixelHeart /><span>A<span className="brand-amp">&amp;</span>B</span></a>
      <p>MADE WITH <span>♥</span> AND A LITTLE PIXEL MAGIC</p>
      <a href="#home" className="back-top">BACK TO TOP ↑</a>
    </footer>
  );
}
