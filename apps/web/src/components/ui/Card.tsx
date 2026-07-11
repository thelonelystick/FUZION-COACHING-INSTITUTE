import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div className={`rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-8 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.35)] backdrop-blur-xl ${className ?? ""}`.trim()}>
      {children}
    </div>
  );
}
