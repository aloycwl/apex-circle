import { Link, useLocation } from "react-router-dom";
import { Instagram, Mail, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function ApexLogo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full overflow-hidden ring-1 ring-apex-gold/40 bg-apex-black shadow-[0_0_24px_-8px_rgba(200,162,91,0.6)] transition group-hover:ring-apex-gold/80">
        <img
          src="/images/apex-logo.jpg"
          alt="Apex Circle"
          className="h-full w-full object-cover"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="apex-logo text-[15px] text-apex-cream group-hover:text-apex-gold-soft transition-colors">
          Apex Circle
        </span>
        <span className="text-[10px] tracking-[0.3em] uppercase text-apex-mute font-mono mt-1">
          Singapore
        </span>
      </span>
    </Link>
  );
}

const navLinks = [
  { href: "/#pillars", label: "Pillars" },
  { href: "/#founders", label: "Council" },
  { href: "/#members", label: "Members" },
  { href: "/#membership", label: "Membership" },
  { href: "/events", label: "Events" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On non-home pages, anchor links must point to the home page
  const resolveHref = (href: string) =>
    pathname === "/" ? href.replace(/^\//, "") : href;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-apex-black/85 backdrop-blur-xl border-b border-apex-line"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <ApexLogo />
        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={resolveHref(l.href)}
              className="text-[13px] tracking-wide text-apex-bone/80 hover:text-apex-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/enquire" className="apex-btn apex-btn-ghost text-[13px]">
            Enquire
          </Link>
          <Link to="/apply" className="apex-btn apex-btn-primary text-[13px]">
            Apply <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <button
          aria-label="Menu"
          className="lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-md border border-apex-line text-apex-cream"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-apex-line bg-apex-black/95 backdrop-blur-xl">
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={resolveHref(l.href)}
                onClick={() => setOpen(false)}
                className="text-sm text-apex-bone tracking-wide"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-3 pt-4 border-t border-apex-line">
              <Link to="/enquire" onClick={() => setOpen(false)} className="apex-btn apex-btn-ghost flex-1">
                Enquire
              </Link>
              <Link to="/apply" onClick={() => setOpen(false)} className="apex-btn apex-btn-primary flex-1">
                Apply
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-apex-line mt-32 bg-apex-ink">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5 space-y-4">
          <ApexLogo />
          <p className="text-apex-mute text-sm max-w-sm leading-relaxed pt-2">
            A private circle for founders, operators, and investors building the next
            chapter of Asia's economy. Membership is curated, not crowded.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://www.instagram.com/apexcirclesg/"
              target="_blank"
              rel="noreferrer"
              className="h-10 w-10 rounded-full border border-apex-line flex items-center justify-center hover:border-apex-gold hover:text-apex-gold-soft transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="mailto:aloycwl@gmail.com"
              className="h-10 w-10 rounded-full border border-apex-line flex items-center justify-center hover:border-apex-gold hover:text-apex-gold-soft transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="md:col-span-3 space-y-3 text-sm">
          <p className="apex-eyebrow">Discover</p>
          <ul className="space-y-2 text-apex-bone/80">
            <li>
              <a href="/#pillars" className="hover:text-apex-gold-soft transition-colors">
                Six Pillars
              </a>
            </li>
            <li>
              <a href="/#founders" className="hover:text-apex-gold-soft transition-colors">
                Founding Council
              </a>
            </li>
            <li>
              <a href="/#members" className="hover:text-apex-gold-soft transition-colors">
                Member Companies
              </a>
            </li>
            <li>
              <a href="/#membership" className="hover:text-apex-gold-soft transition-colors">
                Membership Tiers
              </a>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4 space-y-3 text-sm">
          <p className="apex-eyebrow">Join</p>
          <ul className="space-y-2 text-apex-bone/80">
            <li>
              <Link to="/apply" className="hover:text-apex-gold-soft transition-colors">
                Apply for membership →
              </Link>
            </li>
            <li>
              <Link to="/enquire" className="hover:text-apex-gold-soft transition-colors">
                Enquire about Apex Circle →
              </Link>
            </li>
            <li>
              <a
                href="mailto:aloycwl@gmail.com"
                className="hover:text-apex-gold-soft transition-colors"
              >
                aloycwl@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="apex-divider mx-6 lg:mx-10" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-apex-mute font-mono tracking-wider">
        <span>© {new Date().getFullYear()} APEX CIRCLE · SINGAPORE</span>
        <span>UNLOCKING INNOVATION & CAPITAL</span>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-apex-black text-apex-cream">
      <Nav />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
}
