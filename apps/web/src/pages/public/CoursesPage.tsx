import { ArrowRight, BadgeCheck, Clock3, Users } from "lucide-react";
import Container from "../../components/common/Container";
import Card from "../../components/ui/Card";

const batches = [
  {
    title: "IIT-JEE Elite",
    tag: "Rank-focused",
    fee: "₹54,000",
    duration: "2 years",
    seats: "120 seats",
    description: "Rigorous problem-solving, conceptual depth, and test readiness for aspirants targeting top engineering institutes.",
  },
  {
    title: "NEET Prime",
    tag: "Medical pathway",
    fee: "₹48,000",
    duration: "2 years",
    seats: "96 seats",
    description: "Balanced science mastery, exam drills, and high-frequency revision for medical entrance confidence.",
  },
  {
    title: "Foundation",
    tag: "Early edge",
    fee: "₹32,000",
    duration: "1 year",
    seats: "180 seats",
    description: "A strong base for grades 6–10 learners aiming to build future-ready academic habits early.",
  },
];

const extras = ["Olympiad preparation", "Spoken English", "Computer fundamentals"];

export default function CoursesPage() {
  return (
    <Container className="py-8 lg:py-12">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-blue-100 bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)] px-6 py-10 shadow-[0_30px_100px_-30px_rgba(0,67,255,0.24)] sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,67,255,0.08),_transparent_30%)]" />
        <div className="relative">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-blue-600/20 bg-blue-600/10 px-3 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">Program portfolio</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Modern course pathways for ambitious learners at every stage.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">Every batch is built to combine academic rigor, live doubt resolution, and consistent mentorship in a high-touch environment.</p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {batches.map((batch) => (
              <Card key={batch.title} className="group border border-blue-100 bg-white/95 p-6 shadow-[0_20px_60px_-30px_rgba(0,67,255,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_-24px_rgba(0,67,255,0.28)]">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">{batch.tag}</span>
                  <div className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white">{batch.fee}</div>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-slate-950">{batch.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{batch.description}</p>
                <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                  <div className="rounded-2xl border border-blue-100 bg-slate-50 p-3"><div className="flex items-center gap-2 text-blue-700"><Clock3 size={15} /> Duration</div><p className="mt-2 font-semibold text-slate-950">{batch.duration}</p></div>
                  <div className="rounded-2xl border border-blue-100 bg-slate-50 p-3"><div className="flex items-center gap-2 text-blue-700"><Users size={15} /> Seats</div><p className="mt-2 font-semibold text-slate-950">{batch.seats}</p></div>
                </div>
                <button type="button" className="mt-5 flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition-all duration-300 hover:bg-blue-100">
                  Enroll now <ArrowRight size={15} />
                </button>
              </Card>
            ))}
          </div>
          <div className="mt-8 rounded-[1.75rem] border border-blue-100 bg-white/90 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-blue-700"><BadgeCheck size={16} /><h3 className="text-xl font-semibold text-slate-950">Additional Programs</h3></div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {extras.map((item) => (
                <div key={item} className="rounded-2xl border border-blue-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

