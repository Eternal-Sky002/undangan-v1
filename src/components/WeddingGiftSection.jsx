export default function WeddingGiftSection() {
  return (
    <section className="wedding-gift section-pad" id="gift">
      <div className="section-index"><span>05</span> WEDDING GIFT</div>
      <div className="gift-content">
        <div>
          <p className="eyebrow eyebrow-dark">YOUR THOUGHTFUL GIFT</p>
          <h2>Wedding<br /><em>gift.</em></h2>
        </div>
        <div>
          <p className="gift-message">Doa restu Anda merupakan hadiah terindah bagi kami. Jika ingin berbagi tanda kasih, Anda dapat mengirimkannya melalui rekening berikut.</p>
          <div className="gift-account">
            <span className="gift-account-note">CONTOH — GANTI DENGAN DATA REKENING ASLI</span>
            <dl>
              <div><dt>Bank</dt><dd>BANK CONTOH</dd></div>
              <div><dt>Nomor rekening</dt><dd>0000 0000 0000</dd></div>
              <div><dt>Atas nama</dt><dd>NAMA PEMILIK</dd></div>
            </dl>
          </div>
        </div>
      </div>
      <a className="section-next" href="#home">BACK TO START <span aria-hidden="true">↑</span></a>
    </section>
  );
}
