export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isKo = lang === 'ko';

  return (
    <article className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-[1000] text-meerkat-earth mb-10 tracking-tighter uppercase">
        Terms of Service<span className="text-meerkat-amber">.</span>
      </h1>
      <div className="space-y-8 text-meerkat-clay leading-relaxed font-medium">
        <section>
          <h2 className="text-lg font-black text-meerkat-earth mb-3 uppercase tracking-wider">
            1. Content Usage
          </h2>
          <p>
            {isKo
              ? '본 사이트의 내용은 AI에 의해 요약된 정보입니다. 원문의 저작권은 각 출처에 있으며, 인용 시 출처를 밝혀야 합니다.'
              : 'Content is summarized by AI. Copyright belongs to original sources. Please credit this site when citing.'}
          </p>
        </section>
        <section>
          <h2 className="text-lg font-black text-meerkat-earth mb-3 uppercase tracking-wider">
            2. Disclaimer
          </h2>
          <p>
            {isKo
              ? '제공되는 정보의 정확성을 보장하지 않으며, 투자나 중요한 결정의 근거로 사용됨에 따른 책임을 지지 않습니다.'
              : 'We do not guarantee the accuracy of information and are not liable for decisions made based on this content.'}
          </p>
        </section>
      </div>
    </article>
  );
}
