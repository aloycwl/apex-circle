import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Sparkles,
  Wine,
  Users,
  Music4,
  Briefcase,
  Crown,
  Instagram,
  Check,
  Globe,
  TrendingUp,
  Calendar,
  Clock,
  ShieldCheck,
} from "lucide-react";
import Layout from "@/components/layout";

const pillars = [
  {
    n: "01",
    title: "Masterminds",
    blurb:
      "Closed-door, curated rooms where founders trade real numbers, real playbooks, and real introductions. No pitches. No spectators.",
    icon: Sparkles,
  },
  {
    n: "02",
    title: "Epicurean",
    blurb:
      "Private tastings, chef's-table dinners, and rare-spirit pairings — designed so the most consequential conversations happen between courses.",
    icon: Wine,
  },
  {
    n: "03",
    title: "Networking",
    blurb:
      "Quarterly salons connecting Apex members with operators, family offices, and capital allocators across Singapore, China, and Japan.",
    icon: Users,
  },
  {
    n: "04",
    title: "Parties",
    blurb:
      "By-invitation gatherings that blur the line between social and strategic. Where deals are seeded, not closed.",
    icon: Music4,
  },
  {
    n: "05",
    title: "Business Discussions",
    blurb:
      "Roundtables on capital markets, AI, Web3, cross-border expansion, and operational scale — led by members who've already built it.",
    icon: Briefcase,
  },
  {
    n: "06",
    title: "Legacy Planning",
    blurb:
      "Succession, family governance, structuring, and intergenerational wealth — guided by trusted advisors and members who've crossed the bridge.",
    icon: Crown,
  },
];

const founders = [
  {
    name: "Bobby Yeoh",
    role: "Co-founder & Chairman",
    blurb: "Building Relationship in Singapore, China & Japan",
    img: "/images/founders/bobby.jpg",
    company: "Excelerate",
    href: "https://www.linkedin.com/in/bobby-yeoh-752a59115/",
  },
  {
    name: "Aloysius Chan",
    role: "Co-founder & Secretary",
    blurb: "MBA · Web3, Blockchain, AI · Corporate Structuring",
    img: "/images/founders/aloysius.jpg",
    company: "Aegis Fintech",
    href: "https://www.linkedin.com/in/aloycwl/",
  },
  {
    name: "Ivan Teo",
    role: "Co-founder & Committee",
    blurb: "Founder of Arteastiq Group · Hospitality & Brand",
    img: "/images/founders/ivan.jpg",
    company: "Arteastiq",
    href: "https://www.linkedin.com/in/ivan-teo-0844888a/",
  },
  {
    name: "Jadon Low",
    role: "Co-founder & Committee",
    blurb: "Managing Partner · Healthcare & Cross-border Operations",
    img: "/images/founders/jadon.jpg",
    company: "Nanyang Medical Group",
    href: "https://www.linkedin.com/in/jadon-low-3b02ba276/",
  },
];

const memberCompanies = [
  { name: "Aegis Fintech", logo: "/images/companies/aegis.png", href: "https://aegisfintech.com/", invert: false },
  { name: "Arteastiq", logo: "/images/companies/arteastiq.png", href: "https://arteastiq.com/", invert: true },
  { name: "Arttra", logo: "/images/companies/arttra.png", href: "https://arttra.sg/", invert: false },
  { name: "Nanyang Medical", logo: "/images/companies/nyh.png", href: "https://nyh.sg/", invert: false },
];

const tiers = [
  {
    name: "Community",
    price: "Complimentary",
    period: "",
    headline: "Begin the conversation.",
    description:
      "Open to ambitious operators ready to engage. Access to public events, newsletter, and the broader Apex network.",
    perks: [
      "Selected public events",
      "Apex Circle newsletter",
      "Introduction pathway to higher tiers",
      "Member directory (read-only)",
    ],
    cta: "Apply",
    href: "/apply?tier=community",
    featured: false,
  },
  {
    name: "Apex 100",
    price: "$1,200",
    period: "/ year",
    headline: "The curated hundred.",
    description:
      "Our annual membership for serious operators. Quarterly masterminds, epicurean dinners, and direct access to the Council.",
    perks: [
      "All Community access",
      "Quarterly mastermind rooms",
      "Epicurean & networking nights",
      "Closed-door business discussions",
      "Legacy planning advisory intro",
    ],
    cta: "Apply",
    href: "/apply?tier=apex100",
    featured: true,
  },
  {
    name: "Inner Circle",
    price: "Invite",
    period: "only",
    headline: "By the Council, for the few.",
    description:
      "Our most senior tier — extended only to members who shape Apex Circle's trajectory. Curated, confidential, irreplaceable.",
    perks: [
      "All Apex 100 access",
      "Private Inner Circle gatherings",
      "Direct deal-flow & co-investment",
      "Bespoke legacy & structuring counsel",
      "Council voice on Circle direction",
    ],
    cta: "Enquire",
    href: "/enquire?tier=inner",
    featured: false,
  },
];

export default function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 apex-vignette" />
        <div className="absolute inset-0 apex-grain" />
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(200,162,91,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(200,162,91,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-32 lg:pt-32 lg:pb-44 text-center">
          <div className="apex-reveal inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-apex-line bg-apex-ink/60 backdrop-blur-sm mb-10">
            <span className="h-1.5 w-1.5 rounded-full bg-apex-gold animate-pulse" />
            <span className="text-[11px] tracking-[0.3em] uppercase font-mono text-apex-bone">
              A Private Business Circle · Singapore
            </span>
          </div>

          <h1
            className="apex-reveal text-5xl md:text-7xl lg:text-[5.5rem] font-serif leading-[1.02] tracking-tight max-w-5xl mx-auto"
            style={{ animationDelay: "120ms" }}
          >
            Unlocking the{" "}
            <span className="apex-gold-text italic">innovation & capital</span>
            <br />
            for your business success.
          </h1>

          <p
            className="apex-reveal mt-8 max-w-2xl mx-auto text-apex-bone/75 text-lg leading-relaxed"
            style={{ animationDelay: "240ms" }}
          >
            Apex Circle is a curated council of founders, operators, and investors
            building Asia's next chapter. We meet behind closed doors — to share what
            actually works, to fund what's worth funding, and to plan what should last.
          </p>

          <div
            className="apex-reveal mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ animationDelay: "360ms" }}
          >
            <Link to="/apply" className="apex-btn apex-btn-primary">
              Apply for Membership <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/enquire" className="apex-btn apex-btn-ghost">
              Enquire More
            </Link>
          </div>

          <div
            className="apex-reveal mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            style={{ animationDelay: "480ms" }}
          >
            {[
              { k: "6", v: "Pillars of Growth" },
              { k: "3", v: "Markets · SG / CN / JP" },
              { k: "100", v: "Curated Members" },
            ].map((m) => (
              <div key={m.v} className="text-center">
                <div className="font-serif text-3xl md:text-4xl apex-gold-text">{m.k}</div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-apex-mute font-mono mt-2">
                  {m.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating gold ornament */}
        <div className="absolute top-1/4 left-6 hidden lg:block apex-float opacity-30">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="38" stroke="#c8a25b" strokeWidth="0.5" fill="none" />
            <circle cx="40" cy="40" r="20" stroke="#c8a25b" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        <div
          className="absolute bottom-1/4 right-8 hidden lg:block apex-float opacity-30"
          style={{ animationDelay: "2s" }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60">
            <polygon points="30,4 56,56 4,56" stroke="#c8a25b" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
      </section>

      {/* MANIFESTO STRIP */}
      <section className="relative border-y border-apex-line bg-apex-ink/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Globe className="h-5 w-5 text-apex-gold" />
            <p className="text-sm text-apex-bone/85 font-serif italic">
              Where ambition meets discretion.
            </p>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <TrendingUp className="h-5 w-5 text-apex-gold" />
            <p className="text-sm text-apex-bone/85 font-serif italic">
              Capital follows conviction, not noise.
            </p>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-end">
            <Crown className="h-5 w-5 text-apex-gold" />
            <p className="text-sm text-apex-bone/85 font-serif italic">
              Built for legacy, not headlines.
            </p>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section id="pillars" className="relative py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <div className="max-w-2xl">
              <p className="apex-eyebrow mb-4">The Six Pillars</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Everything we host serves <span className="apex-gold-text italic">one of six things</span>.
              </h2>
            </div>
            <p className="text-apex-mute text-sm max-w-md">
              Apex Circle is not a club, a chamber, or a mailing list. It is an
              operating system for ambitious operators — six pillars, designed in
              concert.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((p) => (
              <article
                key={p.title}
                className="apex-card rounded-xl p-7 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="apex-eyebrow text-apex-gold-soft">{p.n}</span>
                  <p.icon className="h-5 w-5 text-apex-gold opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-serif text-2xl mb-3">{p.title}</h3>
                <p className="text-apex-bone/70 text-sm leading-relaxed">{p.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section id="founders" className="relative py-32 border-t border-apex-line bg-apex-ink/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="apex-eyebrow mb-4">The Founding Council</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Four operators. <span className="apex-gold-text italic">One conviction.</span>
            </h2>
            <p className="text-apex-mute mt-5 text-sm md:text-base leading-relaxed">
              The Council holds the standards of the Circle — who joins, what we host,
              and what we choose not to do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {founders.map((f) => (
              <a
                key={f.name}
                href={f.href}
                target="_blank"
                rel="noreferrer"
                className="apex-card rounded-xl p-6 text-center group block"
              >
                <div className="relative mx-auto h-28 w-28 mb-5">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-apex-gold/40 to-transparent blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
                  <img
                    src={f.img}
                    alt={f.name}
                    className="relative h-28 w-28 rounded-full object-cover ring-1 ring-apex-line group-hover:ring-apex-gold transition-all"
                  />
                </div>
                <h3 className="font-serif text-xl">{f.name}</h3>
                <p className="apex-eyebrow text-apex-gold-soft mt-2">{f.role}</p>
                <p className="text-apex-bone/70 text-xs mt-3 leading-relaxed min-h-[2.5rem]">
                  {f.blurb}
                </p>
                <p className="mt-4 pt-4 border-t border-apex-line text-xs text-apex-mute font-mono tracking-wider uppercase">
                  {f.company}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERS */}
      <section id="members" className="relative py-28 border-t border-apex-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="apex-eyebrow mb-4">Member Companies</p>
            <h2 className="font-serif text-3xl md:text-4xl">
              The businesses inside the <span className="apex-gold-text italic">room</span>.
            </h2>
            <p className="text-apex-mute mt-5 text-sm leading-relaxed">
              A non-exhaustive snapshot of operators currently sitting at the table.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {memberCompanies.map((c) => (
              <a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="apex-card rounded-xl p-6 flex flex-col items-center justify-center gap-5 min-h-[200px] group"
              >
                <div className="flex-1 w-full flex items-center justify-center rounded-lg bg-apex-black/40 border border-apex-line/60 p-5 min-h-[110px]">
                  <img
                    src={c.logo}
                    alt={c.name}
                    className="max-h-16 max-w-[160px] object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                    style={c.invert ? { filter: "invert(1) brightness(1.15)" } : undefined}
                  />
                </div>
                <p className="apex-eyebrow text-apex-bone/60 group-hover:text-apex-gold transition-colors">
                  {c.name} ↗
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS TEASER */}
      <section className="relative py-28 border-t border-apex-line overflow-hidden">
        <div className="absolute inset-0 apex-vignette opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="apex-eyebrow mb-5">The Apex Calendar</p>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05]">
              Every Thursday,{" "}
              <span className="apex-gold-text italic">the doors open</span>.
            </h2>
            <p className="text-apex-bone/75 mt-6 leading-relaxed max-w-lg">
              A weekly cadence by design. Masterminds, tastings, salons, and closed-door
              discussions — rotating through our six pillars, anchored at the same time,
              every week.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-[0.25em] text-apex-mute">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-apex-gold" /> Thursdays
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-apex-gold" /> 7 — 9 PM
              </span>
              <span className="inline-flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-apex-gold" /> Singapore
              </span>
            </div>
            <div className="mt-10">
              <Link to="/events" className="apex-btn apex-btn-primary">
                View Upcoming Sessions <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="apex-card rounded-2xl p-6 md:p-8 relative">
            <p className="apex-eyebrow mb-5">Next Up</p>
            <ul className="space-y-4">
              {[
                { d: "21", m: "MAY", t: "Apex Mastermind — Q2 Strategy", p: "Masterminds" },
                { d: "28", m: "MAY", t: "Epicurean Evening — Whisky & Talk", p: "Epicurean" },
                { d: "04", m: "JUN", t: "Networking Salon — Capital & Connections", p: "Networking" },
                { d: "11", m: "JUN", t: "AI & The Real Economy", p: "Business" },
              ].map((e) => (
                <li
                  key={e.d + e.m}
                  className="flex items-center gap-5 py-3 border-b border-apex-line last:border-0"
                >
                  <div className="text-center w-14 shrink-0">
                    <div className="font-mono text-[9px] tracking-[0.25em] text-apex-gold">
                      {e.m}
                    </div>
                    <div className="font-serif text-2xl text-apex-cream leading-none mt-1">
                      {e.d}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-apex-cream truncate">{e.t}</p>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-apex-mute mt-1">
                      {e.p} · 7—9 PM
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to="/events"
              className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-apex-gold hover:text-apex-gold-soft transition"
            >
              See full calendar <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP TIERS */}
      <section id="membership" className="relative py-32 border-t border-apex-line bg-apex-ink/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="apex-eyebrow mb-4">Membership</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Three tiers. <span className="apex-gold-text italic">One standard.</span>
            </h2>
            <p className="text-apex-mute mt-5 text-sm md:text-base leading-relaxed">
              Membership is an invitation, not a transaction. Every application is
              reviewed by the Council. Approval comes first — payment, only after.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-apex-gold/30 bg-apex-gold/5 text-[10px] font-mono uppercase tracking-[0.25em] text-apex-gold-soft">
              <ShieldCheck className="h-3.5 w-3.5" /> By Council Approval
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`apex-card rounded-2xl p-8 flex flex-col ${
                  t.featured
                    ? "border-apex-gold/60 shadow-[0_30px_80px_-40px_rgba(200,162,91,0.5)]"
                    : ""
                }`}
              >
                {t.featured && (
                  <div className="self-start inline-flex items-center gap-2 px-3 py-1 rounded-full bg-apex-gold/10 border border-apex-gold/40 text-apex-gold text-[10px] font-mono tracking-widest uppercase mb-5">
                    <Sparkles className="h-3 w-3" /> Most chosen
                  </div>
                )}
                <h3 className="font-serif text-3xl">{t.name}</h3>
                <p className="text-apex-bone/70 text-sm mt-1 italic font-serif">
                  {t.headline}
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span
                    className={`font-serif text-4xl ${t.featured ? "apex-gold-text" : "text-apex-cream"}`}
                  >
                    {t.price}
                  </span>
                  {t.period && (
                    <span className="text-apex-mute text-sm font-mono">{t.period}</span>
                  )}
                </div>
                <p className="text-apex-bone/70 text-sm mt-5 leading-relaxed">
                  {t.description}
                </p>

                <ul className="mt-7 space-y-3 flex-1">
                  {t.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-apex-gold mt-0.5 shrink-0" />
                      <span className="text-apex-bone/85">{perk}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={t.href}
                  className={`mt-8 ${t.featured ? "apex-btn apex-btn-primary" : "apex-btn apex-btn-ghost"}`}
                >
                  {t.cta} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          {/* PAYNOW PAYMENT SUB-CARD */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="apex-card rounded-2xl p-8 md:p-10 grid md:grid-cols-[1.4fr_auto] gap-10 md:gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="apex-eyebrow !mb-0">Once Approved · Payment</span>
                  <span className="h-px flex-1 bg-apex-line" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl leading-tight">
                  Settle membership via{" "}
                  <span className="apex-gold-text italic">PayNow</span>
                </h3>
                <p className="text-apex-bone/75 mt-4 text-sm leading-relaxed">
                  Payment is only requested after the Council approves your application.
                  Singapore-registered members can settle by PayNow corporate UEN — the
                  fastest, lowest-friction option for an annual subscription.
                </p>
                <dl className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                  <div>
                    <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-apex-mute mb-1">
                      Entity
                    </dt>
                    <dd className="text-apex-cream">Apex Circle Pte. Ltd.</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-apex-mute mb-1">
                      PayNow UEN
                    </dt>
                    <dd className="apex-gold-text font-mono tracking-wider">201730864Z</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-apex-mute mb-1">
                      Reference
                    </dt>
                    <dd className="text-apex-bone/85">Your full name + tier</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-apex-mute mb-1">
                      Apex 100 Fee
                    </dt>
                    <dd className="text-apex-cream">SGD 1,200 / year</dd>
                  </div>
                </dl>
                <p className="text-xs text-apex-mute mt-6 font-mono uppercase tracking-[0.18em]">
                  Scan the QR with any Singapore banking app
                </p>
              </div>

              <div className="flex justify-center md:justify-end">
                <div className="relative rounded-xl bg-white p-3 shadow-[0_0_40px_-12px_rgba(200,162,91,0.45)] ring-1 ring-apex-gold/40">
                  <img
                    src="/images/paynow-qr.png"
                    alt="Apex Circle PayNow QR — UEN 201730864Z"
                    className="block w-[200px] h-[200px] md:w-[220px] md:h-[220px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 apex-vignette" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <p className="apex-eyebrow mb-5">A Room You Cannot Walk Into Uninvited</p>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.05]">
            If you've read this far,{" "}
            <span className="apex-gold-text italic">we should probably talk</span>.
          </h2>
          <p className="text-apex-bone/75 mt-7 max-w-xl mx-auto">
            Every application is read by a member of the Council. We respond within five
            working days. Discretion guaranteed.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/apply" className="apex-btn apex-btn-primary">
              Apply for Membership <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href="https://www.instagram.com/apexcirclesg/"
              target="_blank"
              rel="noreferrer"
              className="apex-btn apex-btn-ghost"
            >
              <Instagram className="h-4 w-4" /> @apexcirclesg
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
