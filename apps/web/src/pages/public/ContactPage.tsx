import { useState } from "react";
import { ArrowRight, Building2, Mail, MapPin, Phone } from "lucide-react";
import Container from "../../components/common/Container";
import Card from "../../components/ui/Card";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Enquiry submitted", form);
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <Container className="py-8 lg:py-12">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-blue-100 bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)] px-6 py-10 shadow-[0_30px_100px_-30px_rgba(0,67,255,0.24)] sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,67,255,0.08),_transparent_32%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="border border-blue-100 bg-white/95 p-6 shadow-[0_20px_60px_-30px_rgba(0,67,255,0.2)]">
            <p className="inline-flex rounded-full border border-blue-600/20 bg-blue-600/10 px-3 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">Enquiry form</p>
            <h2 className="mt-5 text-3xl font-semibold text-slate-950">Start the conversation with our admissions team.</h2>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="rounded-2xl border border-blue-100 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-blue-600" placeholder="Your name" />
                <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="rounded-2xl border border-blue-100 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-blue-600" placeholder="Email address" />
              </div>
              <input required type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="w-full rounded-2xl border border-blue-100 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-blue-600" placeholder="Phone number" />
              <textarea required rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="w-full rounded-2xl border border-blue-100 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-blue-600" placeholder="Tell us about the batch, campus visit, or admission support you need." />
              <button type="submit" className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 transform hover:-translate-y-0.5">
                Send enquiry <ArrowRight size={16} />
              </button>
              {submitted ? <p className="text-sm font-medium text-blue-700">Thanks! Our team will reach out shortly.</p> : null}
            </form>
          </Card>
          <Card className="border border-blue-100 bg-white/95 p-6 shadow-[0_20px_60px_-30px_rgba(0,67,255,0.2)]">
            <div className="flex items-center gap-2 text-blue-700"><Building2 size={16} /><h3 className="text-xl font-semibold text-slate-950">Visit our institute</h3></div>
            <div className="mt-4 aspect-video w-full rounded-[1.5rem] border border-blue-100 bg-[linear-gradient(135deg,_#eff6ff_0%,_#dbeafe_100%)] p-4">
              <div className="flex h-full items-center justify-center rounded-[1.25rem] border border-dashed border-blue-300 text-sm font-medium text-blue-700">
                Map placeholder — Bharat City campus location
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-slate-50 p-3"><Phone size={16} className="text-blue-700" /><span>+91 98765 43210</span></div>
              <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-slate-50 p-3"><Mail size={16} className="text-blue-700" /><span>admissions@fuzioncoaching.in</span></div>
              <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-slate-50 p-3"><MapPin size={16} className="text-blue-700" /><span>Bharat City, Gurugram, Haryana</span></div>
            </div>
          </Card>
        </div>
      </section>
    </Container>
  );
}

