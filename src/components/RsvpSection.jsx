import { useState } from 'react';
import { PixelHeart } from './Icons.jsx';

export default function RsvpSection() {
  const [rsvpMessage, setRsvpMessage] = useState('');

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
    <section className="rsvp section-pad" id="rsvp">
      <div className="rsvp-decoration" aria-hidden="true"><PixelHeart /><span>♥</span><PixelHeart /></div>
      <div className="section-index"><span>04</span> JOIN THE PARTY</div>
      <div className="rsvp-content">
        <div className="rsvp-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> YOUR PLAYER SLOT IS WAITING</p>
          <h2>Will you<br /><em>join us?</em></h2>
          <p>Kehadiranmu adalah hadiah paling berharga. Kabari kami sebelum 7 Januari 2027, ya!</p>
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
  );
}
