import { INSTITUTE } from "../../constants/institute";

export default function Footer() {
  return (
    <footer className="border-t border-blue-100 bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 text-center text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold uppercase tracking-[0.3em] text-blue-700">{INSTITUTE.name}</p>
        <p>© 2026 {INSTITUTE.name} · Premium coaching with structured mentorship and real progress tracking.</p>
      </div>
    </footer>
  );
}
