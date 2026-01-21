import { Mail, Github } from 'lucide-react';

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isKo = lang === 'ko';

  return (
    <article className="max-w-2xl mx-auto py-20 px-4 text-center">
      <h1 className="text-3xl font-[1000] text-meerkat-earth mb-6 tracking-tighter uppercase">
        Contact Meerkat<span className="text-meerkat-amber">.</span>
      </h1>
      <p className="text-meerkat-shadow mb-12 font-medium break-keep">
        {isKo
          ? '협업 제안이나 기술적 문의는 언제나 환영합니다.'
          : 'We are always open to collaboration and technical inquiries.'}
      </p>

      <div className="grid gap-4">
        <a
          href="mailto:yes505304@naver.com"
          className="flex items-center justify-between p-6 bg-meerkat-bone border border-meerkat-border rounded-[2rem] hover:border-meerkat-amber transition-colors group"
        >
          <div className="flex items-center gap-4">
            <Mail className="text-meerkat-amber" size={24} />
            <span className="font-black text-meerkat-earth underline decoration-meerkat-border group-hover:decoration-meerkat-amber transition-all">
              yes505304@naver.com
            </span>
          </div>
          <span className="text-meerkat-sand text-xs font-black uppercase tracking-widest">
            Email
          </span>
        </a>

        <a
          href="https://github.com/kaleb96"
          target="_blank"
          className="flex items-center justify-between p-6 bg-meerkat-bone border border-meerkat-border rounded-[2rem] hover:border-meerkat-amber transition-colors group"
        >
          <div className="flex items-center gap-4">
            <Github className="text-meerkat-earth" size={24} />
            <span className="font-black text-meerkat-earth uppercase tracking-tighter group-hover:text-meerkat-amber">
              Github Profile
            </span>
          </div>
          <span className="text-meerkat-sand text-xs font-black uppercase tracking-widest">
            Code
          </span>
        </a>
      </div>
    </article>
  );
}
