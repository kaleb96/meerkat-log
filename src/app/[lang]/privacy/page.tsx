export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isKo = lang === 'ko';

  return (
    <article className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-[1000] text-meerkat-earth mb-10 tracking-tighter uppercase">
        Privacy Policy<span className="text-meerkat-amber">.</span>
      </h1>
      <div className="space-y-8 text-meerkat-clay leading-relaxed font-medium">
        <section>
          <h2 className="text-lg font-black text-meerkat-earth mb-3 uppercase tracking-wider">
            1. Information Collection
          </h2>
          <p>
            {isKo
              ? '미어캣 로그는 별도의 회원가입 없이 이용 가능하며, 뉴스레터 구독 시에만 이메일 주소를 수집합니다.'
              : 'Meerkat Log can be used without registration. We only collect email addresses for newsletter subscriptions.'}
          </p>
        </section>
        <section>
          <h2 className="text-lg font-black text-meerkat-earth mb-3 uppercase tracking-wider">
            2. Data Usage
          </h2>
          <p>
            {isKo
              ? '수집된 이메일은 새로운 기술 리포트 발송 외의 목적으로 사용되지 않으며, 제3자에게 제공되지 않습니다.'
              : 'Collected emails are used only for sending new tech reports and are never shared with third parties.'}
          </p>
        </section>
        <section>
          <h2 className="text-lg font-black text-meerkat-earth mb-3 uppercase tracking-wider">
            3. Cookies
          </h2>
          <p>
            {isKo
              ? '사용자 경험 개선 및 트래픽 분석을 위해 Google Analytics 쿠키를 사용합니다.'
              : 'We use Google Analytics cookies to improve user experience and analyze traffic.'}
          </p>
        </section>
      </div>
    </article>
  );
}
