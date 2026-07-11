import { Link, NavLink, Outlet } from "react-router-dom";

type Props = {
  title: string;
  links: Array<{ label: string; to: string }>;
};

export default function PortalShell({ title, links }: Props) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#dbeafe,_#f8fafc_60%)]">
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div>
            <Link to="/" className="text-lg font-semibold text-slate-900">
              FUZION COACHING INSTITUTE
            </Link>
            <p className="text-sm text-slate-500">{title}</p>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }: { isActive: boolean }) =>
                  `rounded-full px-3 py-2 transition ${isActive ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
