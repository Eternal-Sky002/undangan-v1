import { useEffect, useState } from 'react';
import { GamepadIcon } from './Icons.jsx';

const WEDDING_DATE = new Date('2027-01-09T08:00:00+07:00');

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

function EventCard({ number, quest, icon, title, time }) {
  return (
    <article className={`event-card${number === '02' ? ' event-card-alt' : ''}`}>
      <div className="event-number">{number} <span>{quest}</span></div>
      <div className="event-icon" aria-hidden="true">{icon}</div>
      <p className="eyebrow eyebrow-dark">SABTU, 9 JANUARI 2027</p>
      <h3>{title}</h3>
      <p className="event-time">{time}</p>
      <div className="event-rule" />
      <p className="event-venue"><strong>Rayz UMM Hotel Malang</strong><br />Jl. Raya Sengkaling No.1, Jetis, Mulyoagung, Kec. Dau, Kabupaten Malang, Jawa Timur</p>
      <a className="text-link" href="https://maps.app.goo.gl/yCWkRzRGcQicqvW76" target="_blank" rel="noreferrer">BUKA PETA <span aria-hidden="true">↗</span></a>
    </article>
  );
}

export default function DetailsSection() {
  return (
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
        <div className="countdown-bottom"><span>9—1—2027</span><span className="loading-track"><i /></span><span>LOADING HAPPINESS...</span></div>
      </div>
      <div className="details-heading">
        <div><p className="eyebrow eyebrow-dark">CHOOSE YOUR ADVENTURE</p><h2>Meet us<br /><em>at the altar.</em></h2></div>
        <p className="details-intro">Dua momen istimewa, satu hari yang tak terlupakan. Simpan tanggalnya, ya!</p>
      </div>
      <div className="event-grid">
        <EventCard number="01" quest="MAIN QUEST" icon="✳" title="Akad Nikah" time="08.00 — 10.00 WIB" />
        <EventCard number="02" quest="BONUS LEVEL" icon="✦" title="Resepsi" time="11.00 — 14.00 WIB" />
      </div>
      <p className="dress-code"><span>✳</span><strong>DATANG DENGAN SENYUM TERBAIKMU</strong></p>
      <a className="section-next" href="#gallery">NEXT: PHOTO GALLERY <span aria-hidden="true">↓</span></a>
    </section>
  );
}
