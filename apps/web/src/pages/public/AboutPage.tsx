import { ArrowRight, BadgeCheck, Compass, TrendingUp } from "lucide-react";
import Container from "../../components/common/Container";
import Card from "../../components/ui/Card";

const timeline = [
  { year: "2018", title: "Foundation", description: "Launched with a singular promise: high-quality coaching that turns ambition into measurable results." },
  { year: "2020", title: "Digital Expansion", description: "Introduced live classes, recorded lectures, and structured parent visibility to support every learner." },
  { year: "2023", title: "Analytics-first Growth", description: "Integrated performance tracking, test analysis, and faculty collaboration to accelerate student outcomes." },
  { year: "2026", title: "Elite Vision", description: "Evolved into a premium academic platform combining mentorship, strategy, and data-led learning." },
];

export default function AboutPage() {
  return (
    <Container className="py-8 lg:py-12">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-blue-100 bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)] px-6 py-10 shadow-[0_30px_100px_-30px_rgba(0,67,255,0.24)] sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,67,255,0.08),_transparent_32%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="inline-flex rounded-full border border-blue-600/20 bg-blue-600/10 px-3 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">About Fuzion</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">A premium institute designed for ambitious learners and caring families.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">Fuzion Coaching Institute is powered by elite faculty, result-driven pedagogy, and a deeply personalized learning experience that keeps every student, teacher, and parent aligned.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-full border border-blue-100 bg-white px-3 py-2 text-sm font-medium text-slate-700">Concept-first teaching</div>
              <div className="rounded-full border border-blue-100 bg-white px-3 py-2 text-sm font-medium text-slate-700">Weekly assessment loops</div>
              <div className="rounded-full border border-blue-100 bg-white px-3 py-2 text-sm font-medium text-slate-700">Parent visibility</div>
            </div>
          </div>
          <Card className="border border-blue-100 bg-white/95 p-6 shadow-[0_20px_60px_-30px_rgba(0,67,255,0.2)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-2 text-blue-700"><Compass size={18} /></div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Mission</p>
                <p className="text-lg font-semibold text-slate-950">Make learning simple, structured, and result-oriented.</p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-2 text-blue-700"><TrendingUp size={18} /></div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Vision</p>
                <p className="text-lg font-semibold text-slate-950">Empower every student with strong foundations and exam-ready skills.</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="relative mt-10 grid gap-4 lg:grid-cols-4">
          {timeline.map((item) => (
            <div key={item.year} className="rounded-[1.5rem] border border-blue-100 bg-white/90 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-blue-700"><BadgeCheck size={16} /><span className="text-sm font-semibold uppercase tracking-[0.25em]">{item.year}</span></div>
              <h3 className="mt-3 text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}

