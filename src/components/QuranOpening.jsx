export default function QuranOpening() {
  return (
    <section className="quran-opening" aria-labelledby="quran-opening-reference">
      <p className="quran-opening-label">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
      <blockquote>
        <p className="quran-opening-arabic" lang="ar" dir="rtl">
          وَمِن كُلِّ شَيْءٍ خَلَقْنَا زَوْجَيْنِ لَعَلَّكُمْ تَذَكَّرُونَ
        </p>
        <p className="quran-opening-translation" lang="id">
          “Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat (kebesaran Allah).”
        </p>
        <cite id="quran-opening-reference">QS. Adz-Dzariyat: 49</cite>
      </blockquote>
    </section>
  );
}
