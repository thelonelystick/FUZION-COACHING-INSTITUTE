import { GraduationCap, Sparkles, Star } from "lucide-react";
import Container from "../../components/common/Container";
import Card from "../../components/ui/Card";

const faculty = [
  {
    name: "Dr. Pradeep Verma",
    subject: "Mathematics",
    experience: "15+ years",
    credentials: "M.Sc. Mathematics, JEE Specialist",
    description: "Known for turning complex concepts into usable problem-solving frameworks with calm, structured guidance.",
  },
  {
    name: "Akash Mavi",
    subject: "Physics & Science",
    experience: "10+ years",
    credentials: "B.Tech. Mechanical, NEET & JEE Mentor",
    description: "Brings intuitive teaching methods and crisp conceptual clarity that makes difficult topics feel approachable.",
  },
  {
    name: "Nisha Kapoor",
    subject: "Chemistry",
    experience: "12+ years",
    credentials: "M.Sc. Chemistry, Board & Entrance Expert",
    description: "Combines deep subject mastery with guided revision strategies that improve retention and speed.",
  },
  {
    name: "Rajat Sharma",
    subject: "English & Communication",
    experience: "8+ years",
    credentials: "MA English, Soft Skills Coach",
    description: "Supports confidence-building, expression, and result-oriented communication for student growth.",
  },
];

export default function FacultyPage() {
  return (
    <Container className="py-8 lg:py-12">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-blue-100 bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)] px-6 py-10 shadow-[0_30px_100px_-30px_rgba(0,67,255,0.24)] sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,67,255,0.08),_transparent_42%)]" />
        <div className="relative">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-blue-600/20 bg-blue-600/10 px-3 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">Faculty excellence</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Mentors who elevate every lesson, every test, and every outcome.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">Our faculty team blends academic mastery with a personal approach, helping students build clarity, confidence, and consistency.</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {faculty.map((person) => (
              <Card key={person.name} className="group border border-blue-100 bg-white/95 p-6 shadow-[0_20px_60px_-30px_rgba(0,67,255,0.2)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/20">
                  <GraduationCap size={20} />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-950">{person.name}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">{person.subject}</p>
                <p className="mt-3 text-sm text-slate-600">{person.credentials}</p>
                <div className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-700"><Star size={15} className="text-blue-700" /> {person.experience}</div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{person.description}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8 rounded-[1.75rem] border border-blue-100 bg-white/90 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-blue-700"><Sparkles size={16} /><h3 className="text-xl font-semibold text-slate-950">A culture of mentorship beyond the classroom</h3></div>
            <p className="mt-3 text-sm leading-7 text-slate-600">Mentors work closely with students on revision planning, exam strategy, and confidence-building to create a lasting edge.</p>
          </div>
        </div>
      </section>
    </Container>
  );
}

