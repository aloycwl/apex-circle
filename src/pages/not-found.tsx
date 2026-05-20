import { Link } from "react-router-dom";
import Layout from "@/components/layout";

export default function NotFound() {
  return (
    <Layout>
      <section className="relative py-32 lg:py-44 text-center">
        <div className="absolute inset-0 apex-vignette" />
        <div className="relative max-w-2xl mx-auto px-6">
          <p className="apex-eyebrow mb-4">404 · Unmarked Door</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight">
            This room is <span className="apex-gold-text italic">empty</span>.
          </h1>
          <p className="text-apex-bone/70 mt-6 max-w-md mx-auto">
            The page you tried to enter does not exist — or is not yet open to guests.
          </p>
          <div className="mt-10">
            <Link to="/" className="apex-btn apex-btn-primary">
              ← Return to Apex Circle
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
