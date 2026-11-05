import { useCallback, useEffect, useState } from 'react';
import { PixelHeart } from './Icons.jsx';
import { createRsvp, listRsvps } from '../api.js';

export default function RsvpSection() {
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rsvps, setRsvps] = useState([]);
  const [isLoadingRsvps, setIsLoadingRsvps] = useState(true);
  const [rsvpsError, setRsvpsError] = useState('');

  const loadRsvps = useCallback(async () => {
    setIsLoadingRsvps(true);
    setRsvpsError('');
    try {
      setRsvps(await listRsvps());
    } catch (error) {
      setRsvpsError(
        error instanceof TypeError
          ? 'Tidak dapat terhubung ke server. Periksa koneksi internet lalu coba lagi.'
          : `Ucapan belum dapat dimuat. ${error.message}`,
      );
    } finally {
      setIsLoadingRsvps(false);
    }
  }, []);

  useEffect(() => {
    loadRsvps();
  }, [loadRsvps]);

  async function handleRsvp(event) {
    event.preventDefault();
    if (isSubmitting) return;

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const guestName = form.get('guestName')?.toString().trim();
    if (!guestName) {
      setRsvpMessage('Silakan isi nama terlebih dahulu.');
      return;
    }

    const attendance = form.get('attendance')?.toString();
    if (attendance !== 'yes' && attendance !== 'no') {
      setRsvpMessage('Silakan pilih konfirmasi kehadiran.');
      return;
    }
    const guestMessage = form.get('guestMessage')?.toString().trim();
    if (!guestMessage) {
      setRsvpMessage('Silakan isi ucapan atau doa terlebih dahulu.');
      return;
    }

    setIsSubmitting(true);
    setRsvpMessage('Mengirim konfirmasi...');
    try {
      await createRsvp({
        guest_name: guestName,
        attendance,
        message: guestMessage,
      });
      setRsvpMessage(
        attendance === 'yes'
          ? `Terima kasih, ${guestName}! RSVP dan ucapanmu sudah kami terima. Sampai bertemu di hari bahagia kami!`
          : `Terima kasih sudah memberi kabar, ${guestName}. Ucapanmu sangat berarti untuk kami.`,
      );
      formElement.reset();
      loadRsvps();
    } catch (error) {
      setRsvpMessage(
        error instanceof TypeError
          ? 'Tidak dapat terhubung ke server. Periksa koneksi internet lalu coba lagi.'
          : `Konfirmasi belum berhasil dikirim. ${error.message}`,
      );
    } finally {
      setIsSubmitting(false);
    }
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
        <form className="rsvp-form" onSubmit={handleRsvp} aria-busy={isSubmitting}>
          <label htmlFor="guestName">NAMA KAMU</label>
          <input id="guestName" name="guestName" type="text" maxLength="120" placeholder="Tulis nama lengkap" required />
          <label htmlFor="attendance">KONFIRMASI KEHADIRAN</label>
          <select id="attendance" name="attendance" defaultValue="" required>
            <option value="" disabled>Pilih konfirmasi kehadiran</option>
            <option value="yes">Yes! Aku akan datang</option>
            <option value="no">Maaf, aku belum bisa hadir</option>
          </select>
          <label htmlFor="guestMessage">UCAPAN &amp; DOA</label>
          <textarea id="guestMessage" name="guestMessage" rows="4" maxLength="300" placeholder="Tuliskan ucapan atau doa terbaikmu..." required />
          <button className="button button-light" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'MENGIRIM...' : 'KIRIM KONFIRMASI'} <span aria-hidden="true">↗</span>
          </button>
          <p className="rsvp-message" role="status" aria-live="polite">{rsvpMessage}</p>
        </form>
      </div>
      <div className="rsvp-guestbook" aria-live="polite">
        <div className="rsvp-guestbook-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" /> PESAN DARI PARA TAMU</p>
            <h3>Wedding wishes</h3>
          </div>
          <button
            className="rsvp-refresh"
            type="button"
            onClick={loadRsvps}
            disabled={isLoadingRsvps}
          >
            {isLoadingRsvps ? 'MEMUAT...' : 'SEGARKAN ↻'}
          </button>
        </div>
        {isLoadingRsvps ? (
          <p className="rsvp-guestbook-status" role="status">Memuat ucapan...</p>
        ) : rsvpsError ? (
          <div className="rsvp-guestbook-status" role="status">
            <p>{rsvpsError}</p>
            <button className="rsvp-refresh" type="button" onClick={loadRsvps}>COBA LAGI ↻</button>
          </div>
        ) : rsvps.length === 0 ? (
          <p className="rsvp-guestbook-status">Belum ada ucapan. Jadilah yang pertama mengirimkan doa!</p>
        ) : (
          <ul className="rsvp-guestbook-list">
            {rsvps.map((rsvp) => (
              <li className="rsvp-guestbook-entry" key={rsvp.id}>
                <div className="rsvp-guestbook-entry-heading">
                  <strong>{rsvp.guest_name}</strong>
                  <span className={`rsvp-attendance rsvp-attendance-${rsvp.attendance}`}>
                    {rsvp.attendance === 'yes' ? 'HADIR' : 'BERHALANGAN'}
                  </span>
                </div>
                <p>{rsvp.message}</p>
                <time dateTime={rsvp.created_at}>
                  {new Date(rsvp.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="rsvp-bottom"><span>PRESS START TO RSVP</span><span>PLAYER 01 + PLAYER 02 + YOU</span></div>
      <a className="section-next" href="#gift">WEDDING GIFT <span aria-hidden="true">↓</span></a>
    </section>
  );
}
