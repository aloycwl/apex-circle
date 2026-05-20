import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowUpRight, ShieldCheck, Loader2 } from "lucide-react";
import Layout from "@/components/layout";

const tierOptions = [
  { value: "community", label: "Community — Complimentary" },
  { value: "apex100", label: "Apex 100 — S$1,200 / year" },
  { value: "inner", label: "Inner Circle — Invite only" },
];

export default function Apply() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialTier = searchParams.get("tier") || "apex100";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    tier: initialTier,
    industry: "",
    linkedin: "",
    referral: "",
    why: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = searchParams.get("tier");
    if (t) setForm((f) => ({ ...f, tier: t }));
  }, [searchParams]);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }
      navigate("/thank-you?kind=apply");
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again or email aloycwl@gmail.com directly.");
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0 apex-vignette" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-10">
          <Link to="/" className="apex-eyebrow text-apex-mute hover:text-apex-gold transition-colors">
            ← Back to Apex Circle
          </Link>

          <div className="mt-8 mb-12">
            <p className="apex-eyebrow mb-4">Membership Application</p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight">
              Tell us who you <span className="apex-gold-text italic">are</span>, and
              what you're <span className="apex-gold-text italic">building</span>.
            </h1>
            <p className="text-apex-bone/70 mt-5 leading-relaxed">
              The Council reads every application personally. Be specific — vague
              applications are not advanced. We respond within five working days.
              Approval comes first; payment is only requested after you've been accepted.
            </p>
          </div>

          <form onSubmit={submit} className="apex-card rounded-2xl p-8 lg:p-10 space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Full name" required>
                <input
                  required
                  className="apex-input"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="Jane Tan"
                />
              </Field>
              <Field label="Email" required>
                <input
                  required
                  type="email"
                  className="apex-input"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@company.com"
                />
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Phone (with country code)">
                <input
                  className="apex-input"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+65 9123 4567"
                />
              </Field>
              <Field label="Membership tier" required>
                <select
                  required
                  className="apex-input"
                  value={form.tier}
                  onChange={(e) => update("tier", e.target.value)}
                >
                  {tierOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Company" required>
                <input
                  required
                  className="apex-input"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  placeholder="Aegis Fintech"
                />
              </Field>
              <Field label="Role">
                <input
                  className="apex-input"
                  value={form.role}
                  onChange={(e) => update("role", e.target.value)}
                  placeholder="Founder & CEO"
                />
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Industry">
                <input
                  className="apex-input"
                  value={form.industry}
                  onChange={(e) => update("industry", e.target.value)}
                  placeholder="Fintech · F&B · Healthcare · Web3"
                />
              </Field>
              <Field label="LinkedIn URL">
                <input
                  className="apex-input"
                  value={form.linkedin}
                  onChange={(e) => update("linkedin", e.target.value)}
                  placeholder="linkedin.com/in/..."
                />
              </Field>
            </div>

            <Field label="Referred by (member name, or how you found us)">
              <input
                className="apex-input"
                value={form.referral}
                onChange={(e) => update("referral", e.target.value)}
                placeholder="Bobby Yeoh · Instagram · Word of mouth"
              />
            </Field>

            <Field label="Why Apex Circle, and why now?" required>
              <textarea
                required
                rows={5}
                className="apex-input resize-none"
                value={form.why}
                onChange={(e) => update("why", e.target.value)}
                placeholder="The more honest, the better. Vague applications are not advanced."
              />
            </Field>

            {error && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 text-red-200 text-sm p-4">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <p className="text-xs text-apex-mute flex items-start gap-2 max-w-xs">
                <ShieldCheck className="h-4 w-4 text-apex-gold shrink-0 mt-0.5" />
                Your submission is read only by the Apex Council. Discretion guaranteed.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="apex-btn apex-btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                  </>
                ) : (
                  <>
                    Submit application <ArrowUpRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.2em] font-mono text-apex-bone/80">
        {label} {required && <span className="text-apex-gold">*</span>}
      </span>
      {children}
    </label>
  );
}
