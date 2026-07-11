import { Sparkles } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/20">
        <Sparkles size={18} />
      </div>
      <div className="leading-none">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-blue-700">Fuzion</p>
        <p className="mt-1 text-[0.75rem] font-semibold uppercase tracking-[0.3em] text-slate-900">Coaching</p>
      </div>
    </div>
  );
}
