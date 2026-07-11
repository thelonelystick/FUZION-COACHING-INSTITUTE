import { useState } from "react";
import { ArrowRight, BarChart3, BookOpenText, GraduationCap, PlayCircle, ShieldCheck, Sparkles, Video } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Container from "../../components/common/Container";
import { submitAdmission } from "../../lib/admissions";

type ModalType = "admission" | "demo" | null;

export default function HomePage() {
  const [modal, setModal] = useState<ModalType>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [admissionForm, setAdmissionForm] = useState({
    studentName: "",
    parentName: "",
    phone: "",
    classLevel: "9",
    course: "Secondary",
    branch: "Bharat City",
  });
  const [demoForm, setDemoForm] = useState({
    studentName: "",
    phone: "",
    preferredSlot: "Weekend",
    branch: "Bharat City",
  });

  const handleAdmissionSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback("Submitting your admission request...");
    try {
      const payload = { ...admissionForm, source: "homepage-modal" };
      await submitAdmission(payload);
      setFeedback("Admission request submitted successfully. Our team will contact you shortly.");
      setAdmissionForm({ studentName: "", parentName: "", phone: "", classLevel: "9", course: "Secondary", branch: "Bharat City" });
      setModal(null);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to submit admission.");
    }
  };

  const handleDemoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = { ...demoForm, source: "homepage-demo-modal" };
    console.log("Demo request state", payload);
    setFeedback("Your visit request has been received. We’ll confirm your preferred slot shortly.");
    setDemoForm({ studentName: "", phone: "", preferredSlot: "Weekend", branch: "Bharat City" });
    setModal(null);
  };

  const stats = [
    { label: "Expert Faculties", value: "15+", icon: GraduationCap },
    { label: "Selections", value: "500+", icon: ShieldCheck },
    { label: "Success Rate", value: "95%", icon: BarChart3 },
  ];

  const features = [
    { title: "AI-Driven Study Rooms", description: "Immersive live sessions, smart revision, and personal progress insights.", icon: Sparkles },
    { title: "Weekly Result Analytics", description: "Track every mock test, ranking trend, and performance milestone in real time.", icon: BarChart3 },
    { title: "On-Demand Lecture Vault", description: "Revisit every class and solve doubts with recorded lecture access anytime.", icon: Video },
  ];

  const highlights = ["24/7 academic guidance", "Parent pulse updates", "Personalized counseling"];

  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-blue-100 bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)] px-6 py-10 shadow-[0_30px_100px_-30px_rgba(0,67,255,0.24)] sm:px-10 lg:px-12 lg:py-16">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(0,67,255,0.06)_48%,transparent_100%)] opacity-70" />
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-600/10 px-3 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
              <Sparkles size={16} /> Redefining academic excellence through advanced analytics & elite mentorship
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">Elite mentorship, advanced analytics, and a future-ready learning ecosystem.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Fuzion Coaching Institute unites expert faculty, structured mentorship, and intelligent progress tracking under a premium, modern experience.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button className="border border-blue-600/20 bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-3 text-sm shadow-[0_16px_45px_-14px_rgba(0,67,255,0.45)]" onClick={() => setModal("admission")}>Apply for Admission</Button>
              <button type="button" className="flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:border-blue-600 hover:bg-blue-50" onClick={() => setModal("demo")}>
                Schedule a Visit <ArrowRight size={16} />
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
              {highlights.map((item) => (
                <span key={item} className="rounded-full border border-blue-100 bg-white/80 px-3 py-2 shadow-sm">{item}</span>
              ))}
            </div>
            {feedback ? <p className="mt-5 max-w-xl rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">{feedback}</p> : null}
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-blue-100 bg-white/95 p-5 shadow-[0_20px_80px_-24px_rgba(0,67,255,0.25)] backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Institute pulse</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">Growth +24% this term</p>
                </div>
                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-3 text-blue-700">
                  <BarChart3 size={19} />
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {stats.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-2xl border border-blue-100 bg-slate-50 p-3 text-left">
                      <div className="flex items-center gap-2 text-blue-700"><Icon size={15} /> <span className="text-[11px] uppercase tracking-[0.2em]">{item.label}</span></div>
                      <div className="mt-2 text-xl font-semibold text-slate-950">{item.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[1.5rem] border border-blue-100 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-blue-700"><BookOpenText size={16} /><span className="text-sm font-semibold">Premium Notes</span></div>
                <p className="mt-3 text-sm leading-7 text-slate-600">Structured learning kits tailored to parent and student goals.</p>
              </div>
              <div className="rounded-[1.5rem] border border-blue-100 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-blue-700"><PlayCircle size={16} /><span className="text-sm font-semibold">Recorded Classes</span></div>
                <p className="mt-3 text-sm leading-7 text-slate-600">Every session is available on demand for focused revision.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="border border-blue-100 bg-white/95 p-6 shadow-[0_20px_60px_-30px_rgba(0,67,255,0.2)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/20">
                <Icon size={20} />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-slate-950">{feature.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
            </Card>
          );
        })}
      </section>

      {modal ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[2rem] border border-white/15 bg-slate-950/95 p-6 text-white shadow-[0_32px_120px_-24px_rgba(2,8,23,0.95)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{modal === "admission" ? "Admission request" : "Visit request"}</p>
                <h3 className="mt-2 text-2xl font-semibold">{modal === "admission" ? "Start your child’s journey" : "Schedule a guided campus visit"}</h3>
              </div>
              <button className="rounded-full border border-white/10 px-3 py-2 text-sm text-slate-300 transition-all duration-300 transform hover:-translate-y-0.5" onClick={() => setModal(null)}>
                Close
              </button>
            </div>
            {modal === "admission" ? (
              <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleAdmissionSubmit}>
                <label className="grid gap-2 text-sm text-slate-300">
                  <span>Student Name</span>
                  <input required value={admissionForm.studentName} onChange={(event) => setAdmissionForm({ ...admissionForm, studentName: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" />
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  <span>Parent Name</span>
                  <input required value={admissionForm.parentName} onChange={(event) => setAdmissionForm({ ...admissionForm, parentName: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" />
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  <span>Phone</span>
                  <input required type="tel" value={admissionForm.phone} onChange={(event) => setAdmissionForm({ ...admissionForm, phone: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" />
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  <span>Class</span>
                  <select value={admissionForm.classLevel} onChange={(event) => setAdmissionForm({ ...admissionForm, classLevel: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20">
                    {Array.from({ length: 12 }, (_, index) => index + 1).map((level) => <option value={String(level)} key={level}>{level}</option>)}
                  </select>
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  <span>Course</span>
                  <select value={admissionForm.course} onChange={(event) => setAdmissionForm({ ...admissionForm, course: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20">
                    <option>Primary</option>
                    <option>Middle School</option>
                    <option>Secondary</option>
                    <option>Senior Secondary</option>
                    <option>Olympiad</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  <span>Branch</span>
                  <input value={admissionForm.branch} onChange={(event) => setAdmissionForm({ ...admissionForm, branch: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" />
                </label>
                <div className="md:col-span-2 flex flex-wrap gap-3">
                  <button className="rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-3 font-semibold text-white transition-all duration-300 transform hover:-translate-y-0.5" type="submit">Submit Admission</button>
                  <button className="rounded-full border border-white/10 px-5 py-3 text-slate-300 transition-all duration-300 transform hover:-translate-y-0.5" type="button" onClick={() => setModal(null)}>Cancel</button>
                </div>
              </form>
            ) : (
              <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleDemoSubmit}>
                <label className="grid gap-2 text-sm text-slate-300">
                  <span>Student Name</span>
                  <input required value={demoForm.studentName} onChange={(event) => setDemoForm({ ...demoForm, studentName: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" />
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  <span>Phone</span>
                  <input required type="tel" value={demoForm.phone} onChange={(event) => setDemoForm({ ...demoForm, phone: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" />
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  <span>Preferred Slot</span>
                  <select value={demoForm.preferredSlot} onChange={(event) => setDemoForm({ ...demoForm, preferredSlot: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20">
                    <option>Weekend</option>
                    <option>Weekday Evening</option>
                    <option>Morning Batch</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  <span>Branch</span>
                  <input value={demoForm.branch} onChange={(event) => setDemoForm({ ...demoForm, branch: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" />
                </label>
                <div className="md:col-span-2 flex flex-wrap gap-3">
                  <button className="rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-3 font-semibold text-white transition-all duration-300 transform hover:-translate-y-0.5" type="submit">Schedule Visit</button>
                  <button className="rounded-full border border-white/10 px-5 py-3 text-slate-300 transition-all duration-300 transform hover:-translate-y-0.5" type="button" onClick={() => setModal(null)}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </Container>
  );
}


