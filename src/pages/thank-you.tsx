import { Link, useSearchParams } from "react-router-dom";
import { Instagram } from "lucide-react";
import Layout from "@/components/layout";

export default function ThankYou() {
  const [params] = useSearchParams();
  const kind = params.get("kind") || "apply";
  const isApply = kind === "apply";

  return (
    <Layout>
      <section className="relative py-28 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 apex-vignette" />
        <div className="relative max-w-2xl mx-auto px-6 lg:px-10 text-center">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full border border-apex-gold/40 bg-apex-ink mb-8">
            <svg viewBox="0 0 64 64" className="h-12 w-12">
              <defs>
                <linearGradient id="ty-g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ecd391" />
                  <stop offset="100%" stopColor="#8a6a30" />
                </linearGradient>
              </defs>
              <path
                d="M32 14 L52 50 L42 50 L37 40 L27 40 L22 50 L12 50 Z M30 32 L34 32 L32 26 Z"
                fill="url(#ty-g)"
              />
            </svg>
          </div>

          <p className="apex-eyebrow mb-4">
            {isApply ? "Application Received" : "Enquiry Received"}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight">
            Thank you. <span className="apex-gold-text italic">We'll be in touch.</span>
          </h1>
          <p className="text-apex-bone/75 mt-7 max-w-lg mx-auto leading-relaxed">
            {isApply ? (
              <>
                Your application has reached the Council. Every submission is read
                personally. Expect a response within five working days at the email you
                provided.
              </>
            ) : (
              <>
                Your enquiry has reached the Council. We review enquiries weekly and
                will respond at the email you provided.
              </>
            )}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="apex-btn apex-btn-ghost">
              ← Back to home
            </Link>
            <a
              href="https://www.instagram.com/apexcirclesg/"
              target="_blank"
              rel="noreferrer"
              className="apex-btn apex-btn-primary"
            >
              <Instagram className="h-4 w-4" /> Follow @apexcirclesg
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
