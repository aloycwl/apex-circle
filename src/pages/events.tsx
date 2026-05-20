import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Wine,
  Users,
  Briefcase,
  Crown,
  Music4,
} from "lucide-react";
import Layout from "@/components/layout";

type Event = {
  date: string; // ISO yyyy-mm-dd
  weekday: string;
  monthShort: string;
  day: string;
  title: string;
  pillar: string;
  blurb: string;
  icon: React.ComponentType<{ className?: string }>;
};

const events: Event[] = [
  {
    date: "2026-05-21",
    weekday: "Thursday",
    monthShort: "MAY",
    day: "21",
    title: "Apex Mastermind — Q2 Founder Strategy Session",
    pillar: "Masterminds",
    blurb:
      "An intimate, closed-door circle. Members bring a single live business question; the room responds with introductions, capital, and operator intel.",
    icon: Sparkles,
  },
  {
    date: "2026-05-28",
    weekday: "Thursday",
    monthShort: "MAY",
    day: "28",
    title: "Epicurean Evening — Vintage Whisky & Conversation",
    pillar: "Epicurean",
    blurb:
      "A guided tasting of rare single malts paired with a small-plate menu. The format is unhurried by design — the best conversations require room to breathe.",
    icon: Wine,
  },
  {
    date: "2026-06-04",
    weekday: "Thursday",
    monthShort: "JUN",
    day: "04",
    title: "Networking Salon — Capital & Connections",
    pillar: "Networking",
    blurb:
      "Curated table introductions with operators, family offices, and capital allocators across the Singapore–China–Japan corridor. Quality of room over size of room.",
    icon: Users,
  },
  {
    date: "2026-06-11",
    weekday: "Thursday",
    monthShort: "JUN",
    day: "11",
    title: "Business Discussion — AI & The Real Economy",
    pillar: "Business Discussions",
    blurb:
      "A working session with members deploying AI inside their businesses today. Tactical, candid, and ruthlessly practical — what's working, what isn't, and what's next.",
    icon: Briefcase,
  },
  {
    date: "2026-06-18",
    weekday: "Thursday",
    monthShort: "JUN",
    day: "18",
    title: "Legacy Planning Roundtable — The Generational Playbook",
    pillar: "Legacy Planning",
    blurb:
      "Structures, trusts, succession, and the architecture of multi-generational wealth. Hosted with private bankers and family-office practitioners.",
    icon: Crown,
  },
  {
    date: "2026-06-25",
    weekday: "Thursday",
    monthShort: "JUN",
    day: "25",
    title: "Apex Mid-Year Soirée",
    pillar: "Parties",
    blurb:
      "A by-invitation gathering to close out the first half of the year. Music, food, founders, and the quiet kind of luxury that lets a real evening happen.",
    icon: Music4,
  },
];

function getStatus(dateStr: string): "past" | "today" | "upcoming" {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(dateStr + "T00:00:00");
  if (d.getTime() === today.getTime()) return "today";
  return d.getTime() < today.getTime() ? "past" : "upcoming";
}

export default function Events() {
  const upcoming = events.filter((e) => getStatus(e.date) !== "past");
  const past = events.filter((e) => getStatus(e.date) === "past");

  return (
    <Layout>
      {/* HERO */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 apex-vignette" />
        <div className="absolute inset-0 apex-grain pointer-events-none opacity-40" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
          <p className="apex-eyebrow mb-5">The Apex Calendar · 2026</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05]">
            Every Thursday,{" "}
            <span className="apex-gold-text italic">the doors open</span>.
          </h1>
          <p className="text-apex-bone/75 mt-7 max-w-2xl mx-auto text-lg leading-relaxed">
            Apex Circle convenes every Thursday from <span className="text-apex-gold-soft">7:00 — 9:00 PM</span> in Singapore.
            Themes rotate through our six pillars. Members RSVP through their portal;
            non-members may request an invitation.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/apply" className="apex-btn apex-btn-primary">
              Apply for Membership <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/enquire" className="apex-btn apex-btn-ghost">
              Request an Invitation
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-xs text-apex-mute font-mono uppercase tracking-[0.25em]">
            <span className="inline-flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-apex-gold" /> 7 — 9 PM
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-apex-gold" /> Thursdays
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-apex-gold" /> Singapore
            </span>
          </div>
        </div>
      </section>

      {/* UPCOMING */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <p className="apex-eyebrow mb-4">Upcoming Sessions</p>
              <h2 className="font-serif text-3xl md:text-5xl leading-tight">
                Through <span className="apex-gold-text italic">end of June</span>.
              </h2>
            </div>
            <div className="hidden md:block text-right text-xs font-mono uppercase tracking-[0.2em] text-apex-mute">
              {upcoming.length} sessions confirmed
            </div>
          </div>

          <ol className="relative space-y-5">
            {upcoming.map((e) => {
              const status = getStatus(e.date);
              const Icon = e.icon;
              return (
                <li
                  key={e.date}
                  className="apex-card rounded-2xl p-6 md:p-8 group hover:border-apex-gold/40 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-apex-gold/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative grid md:grid-cols-[120px_1fr_auto] gap-6 md:gap-8 items-start">
                    {/* Date block */}
                    <div className="flex md:block items-center gap-4">
                      <div className="font-mono text-[10px] tracking-[0.25em] text-apex-gold uppercase">
                        {e.monthShort}
                      </div>
                      <div className="font-serif text-5xl md:text-6xl leading-none text-apex-cream">
                        {e.day}
                      </div>
                      <div className="font-mono text-[10px] tracking-[0.2em] text-apex-mute uppercase md:mt-2">
                        {e.weekday}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 md:border-l md:border-apex-line md:pl-8">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-apex-gold/30 bg-apex-gold/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-apex-gold-soft">
                          <Icon className="h-3 w-3" /> {e.pillar}
                        </span>
                        {status === "today" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-apex-gold text-apex-black px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] font-semibold">
                            Tonight
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl text-apex-cream leading-snug">
                        {e.title}
                      </h3>
                      <p className="text-apex-bone/70 text-sm leading-relaxed max-w-xl">
                        {e.blurb}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs text-apex-mute font-mono uppercase tracking-[0.18em]">
                        <span className="inline-flex items-center gap-2">
                          <Clock className="h-3 w-3 text-apex-gold" /> 7:00 — 9:00 PM
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-apex-gold" /> Singapore · Disclosed on RSVP
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="md:self-center">
                      <Link
                        to={`/enquire?event=${e.date}`}
                        className="apex-btn apex-btn-ghost text-[12px] whitespace-nowrap"
                      >
                        Request to Attend <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {past.length > 0 && (
            <div className="mt-16 pt-12 border-t border-apex-line">
              <p className="apex-eyebrow mb-6">Recent Sessions</p>
              <ul className="space-y-3 opacity-60">
                {past.map((e) => (
                  <li
                    key={e.date}
                    className="flex items-center justify-between py-3 px-5 rounded-lg border border-apex-line bg-apex-ink/40"
                  >
                    <div className="flex items-center gap-5 text-sm">
                      <span className="font-mono text-xs text-apex-mute uppercase tracking-wider">
                        {e.monthShort} {e.day}
                      </span>
                      <span className="font-serif text-apex-bone/80">{e.title}</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-apex-mute">
                      {e.pillar}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 border-t border-apex-line bg-apex-ink/30">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="apex-eyebrow mb-5">Attendance</p>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight">
            Sessions are{" "}
            <span className="apex-gold-text italic">by approval</span>.
          </h2>
          <p className="text-apex-bone/75 mt-6 max-w-xl mx-auto leading-relaxed">
            Membership unlocks the full calendar. For a single session, request an
            invitation and the Council will review within five working days.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apply" className="apex-btn apex-btn-primary">
              Apply for Membership <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/enquire" className="apex-btn apex-btn-ghost">
              Request an Invitation
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
