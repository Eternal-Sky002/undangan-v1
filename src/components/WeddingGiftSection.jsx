const bankAccounts = [
  { bank: 'BCA', accountNumber: '1913510066', accountName: 'NOVIELIA ALFIANITA' },
  { bank: 'Bank Mandiri', accountNumber: '9000038768876', accountName: 'NOVIELIA ALFIANITA' },
];

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
        </div>
        <div className="gift-accounts">
          {bankAccounts.map(({ bank, accountNumber, accountName }, index) => (
            <div className="gift-account" key={bank}>
              <span className="gift-account-note">REKENING 0{index + 1}</span>
              <dl>
                <div><dt>Bank</dt><dd>{bank}</dd></div>
                <div><dt>Nomor rekening</dt><dd>{accountNumber}</dd></div>
                <div><dt>Atas nama</dt><dd>{accountName}</dd></div>
              </dl>
            </div>
          ))}
        </div>
      </div>
      <a className="section-next" href="#home">BACK TO START <span aria-hidden="true">↑</span></a>
    </section>
  );
}
