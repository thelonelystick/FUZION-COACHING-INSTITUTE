import { useState } from "react";
import Container from "../../components/common/Container";

import Card from "../../components/ui/Card";
import PrimaryButton from "../../components/buttons/PrimaryButton";

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Container>
      <section className="py-12">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-blue-600">Book a Demo Class</h2>
            <p className="mt-3 text-slate-600">
              Premium learning starts with the right guidance.
            </p>
          </div>
        </div>

        <Card className="mt-8">
          {submitted ? (
            <div>
              <h3 className="text-xl font-semibold">Request received</h3>
              <p className="mt-2 text-slate-600">
                We’ll contact you shortly to confirm your demo class.
              </p>
              <div className="mt-6">
                <PrimaryButton onClick={() => setSubmitted(false)}>Book Another</PrimaryButton>
              </div>
            </div>
          ) : (
            <form
              className="grid gap-4 md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-slate-700">Student Name</span>
                <input required className="rounded-xl border bg-white px-4 py-3" />
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-medium text-slate-700">Parent Name</span>
                <input required className="rounded-xl border bg-white px-4 py-3" />
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-medium text-slate-700">Phone Number</span>
                <input required type="tel" className="rounded-xl border bg-white px-4 py-3" />
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-medium text-slate-700">Class</span>
                <select required className="rounded-xl border bg-white px-4 py-3">
                  {[...Array(12)].map((_, i) => {
                    const v = i + 1;
                    return (
                      <option value={v} key={v}>
                        {v}
                      </option>
                    );
                  })}
                </select>
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-medium text-slate-700">Course</span>
                <select required className="rounded-xl border bg-white px-4 py-3">
                  <option>Primary</option>
                  <option>Middle School</option>
                  <option>Secondary</option>
                  <option>Senior Secondary</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-medium text-slate-700">Preferred Branch</span>
                <input required className="rounded-xl border bg-white px-4 py-3" />
              </label>

              <div className="md:col-span-2">
                <PrimaryButton>
                  Register Request
                </PrimaryButton>
              </div>

              <p className="md:col-span-2 text-xs text-slate-500">
                This UI will store submissions in Firebase in the next step.
              </p>
            </form>
          )}
        </Card>
      </section>
    </Container>
  );
}

