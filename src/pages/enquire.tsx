import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowUpRight, Loader2, Mail, Instagram } from "lucide-react";
import Layout from "@/components/layout";

const topicOptions = [
  { value: "general", label: "General enquiry" },
  { value: "events", label: "Events & masterminds" },
  { value: "partnership", label: "Partnership / sponsorship" },
  { value: "speaking", label: "Speaking opportunity" },
  { value: "press", label: "Press / media" },
  { value: "inner", label: "Inner Circle introduction" },
];

export default function Enquire() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialTopic = searchParams.get("tier") === "inner" ? "inner" : "general";

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    topic: initialTopic,
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      const raw = await res.text();
      let data: any = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        data = { error: raw.slice(0, 200) };
      }
      if (!res.ok) {
        const msg =
          typeof data.error === "string"
            ? data.error
            : data.error
            ? JSON.stringify(data.error)
            : `Request failed (${res.status})`;
        throw new Error(msg);
      }
      navigate("/thank-you?kind=enquire");
    } catch (err: any) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : JSON.stringify(err);
      setError(msg || "Something went wrong. Please try again or email aloycwl@gmail.com directly.");
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0 apex-vignette" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
          <Link to="/" className="apex-eyebrow text-apex-mute hover:text-apex-gold transition-colors">
            ← Back to Apex Circle
          </Link>

          <div className="grid lg:grid-cols-5 gap-12 mt-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="apex-eyebrow mb-4">Enquire</p>
                <h1 className="font-serif text-4xl md:text-5xl leading-tight">
                  Have a <span className="apex-gold-text italic">question</span> for the Circle?
                </h1>
                <p className="text-apex-bone/70 mt-5 leading-relaxed">
                  Partnerships, speaking, press, or anything else — start here. The
                  Council reviews enquiries weekly.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:aloycwl@gmail.com"
                  className="flex items-center gap-3 group"
                >
                  <span className="h-10 w-10 rounded-full border border-apex-line flex items-center justify-center group-hover:border-apex-gold transition-colors">
                    <Mail className="h-4 w-4 text-apex-gold" />
                  </span>
                  <div className="text-sm">
                    <div className="apex-eyebrow text-apex-mute">Direct email</div>
                    <div className="text-apex-cream group-hover:text-apex-gold-soft transition-colors">
                      aloycwl@gmail.com
                    </div>
                  </div>
                </a>
                <a
                  href="https://www.instagram.com/apexcirclesg/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <span className="h-10 w-10 rounded-full border border-apex-line flex items-center justify-center group-hover:border-apex-gold transition-colors">
                    <Instagram className="h-4 w-4 text-apex-gold" />
                  </span>
                  <div className="text-sm">
                    <div className="apex-eyebrow text-apex-mute">Instagram</div>
                    <div className="text-apex-cream group-hover:text-apex-gold-soft transition-colors">
                      @apexcirclesg
                    </div>
                  </div>
                </a>
              </div>

              <div className="apex-divider" />
              <p className="text-xs text-apex-mute leading-relaxed font-serif italic">
                "Discretion is not a feature of Apex Circle. It is the foundation."
                <br />— The Council
              </p>
            </div>

            <form onSubmit={submit} className="lg:col-span-3 apex-card rounded-2xl p-8 lg:p-10 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Name" required>
                  <input
                    required
                    className="apex-input"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your name"
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
              <Field label="Company / organisation">
                <input
                  className="apex-input"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                />
              </Field>
              <Field label="Topic" required>
                <select
                  required
                  className="apex-input"
                  value={form.topic}
                  onChange={(e) => update("topic", e.target.value)}
                >
                  {topicOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Message" required>
                <textarea
                  required
                  rows={6}
                  className="apex-input resize-none"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell us what's on your mind."
                />
              </Field>

              {error && (
                <div className="rounded-lg border border-red-500/40 bg-red-500/10 text-red-200 text-sm p-4">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-end pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="apex-btn apex-btn-primary disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send enquiry <ArrowUpRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
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
