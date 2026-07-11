import { useState } from "react";
import Container from "../../components/common/Container";
import Card from "../../components/ui/Card";

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    studentName: "",
    parentName: "",
    phone: "",
    classLevel: "9",
    course: "Secondary",
    branch: "Bharat City",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Demo booking state", form);
    setSubmitted(true);
  };

  return (
    <Container>
      <section className="py-14">
        <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-10 text-white shadow-2xl shadow-blue-950/30 sm:px-10">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Personalized campus preview</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Book a premium demo session for your child.</h2>
          <p className="mt-3 max-w-2xl text-slate-300">Experience our teaching methodology, learning analytics, and parent communication framework before you decide.</p>
        </div>

        <Card className="mt-8">
          {submitted ? (
            <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-6 text-emerald-700">
              <h3 className="text-xl font-semibold">Request received</h3>
              <p className="mt-2">We’ll contact you shortly to confirm your demo class and preferred schedule.</p>
              <button className="mt-5 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white" onClick={() => setSubmitted(false)}>
                Book Another
              </button>
            </div>
          ) : (
            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-slate-700">Student Name</span>
                <input required value={form.studentName} onChange={(event) => setForm({ ...form, studentName: event.target.value })} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-slate-700">Parent Name</span>
                <input required value={form.parentName} onChange={(event) => setForm({ ...form, parentName: event.target.value })} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-slate-700">Phone Number</span>
                <input required type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-slate-700">Class</span>
                <select required value={form.classLevel} onChange={(event) => setForm({ ...form, classLevel: event.target.value })} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  {Array.from({ length: 12 }, (_, index) => index + 1).map((level) => (
                    <option value={String(level)} key={level}>{level}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-slate-700">Course</span>
                <select required value={form.course} onChange={(event) => setForm({ ...form, course: event.target.value })} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <option>Primary</option>
                  <option>Middle School</option>
                  <option>Secondary</option>
                  <option>Senior Secondary</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-slate-700">Preferred Branch</span>
                <input required value={form.branch} onChange={(event) => setForm({ ...form, branch: event.target.value })} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
              </label>
              <div className="md:col-span-2">
                <button className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-700 px-5 py-3 font-semibold text-white" type="submit">
                  Reserve Session
                </button>
              </div>
            </form>
          )}
        </Card>
      </section>
    </Container>
  );
}

