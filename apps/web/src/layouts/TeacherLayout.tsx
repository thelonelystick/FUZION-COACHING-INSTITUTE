import { NavLink, Outlet } from "react-router-dom";
import { BookOpenText, LayoutGrid, PlayCircle, Video, FileText } from "lucide-react";

const links = [
  { to: "/teacher", label: "Workspace", icon: LayoutGrid },
  { to: "/teacher/materials", label: "Notes", icon: FileText },
  { to: "/teacher/classes", label: "Classes", icon: PlayCircle },
  { to: "/teacher/videos", label: "Videos", icon: Video },
];

export default function TeacherLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.12),_transparent_24%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)] p-4 lg:p-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row">
        <aside className="w-full rounded-[2rem] border border-slate-200/70 bg-slate-950/95 p-5 text-white shadow-[0_25px_100px_-30px_rgba(15,23,42,0.8)] lg:w-72 lg:p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-2 text-cyan-200"><BookOpenText size={18} /></div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Fuzion</p>
              <p className="text-sm font-semibold">Teacher studio</p>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.to} to={item.to} className={({ isActive }: { isActive: boolean }) => `flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm font-medium transition-all duration-300 ${isActive ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-100" : "border-transparent bg-white/5 text-slate-300 hover:border-white/10 hover:bg-white/10"}`}>
                  <Icon size={16} />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </aside>
        <main className="flex-1 rounded-[2rem] border border-slate-200/70 bg-white/70 p-4 shadow-[0_20px_90px_-34px_rgba(15,23,42,0.32)] backdrop-blur-xl lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
