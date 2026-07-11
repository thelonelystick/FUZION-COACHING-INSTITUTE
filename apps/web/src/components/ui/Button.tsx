import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className = "", ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-cyan-500/30 active:scale-[0.98] ${className}`.trim()}
    >
      {children}
    </button>
  );
}

