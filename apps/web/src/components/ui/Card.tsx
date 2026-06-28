import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props){
 return(
  <div className={`rounded-3xl bg-white p-8 shadow-lg ${className ?? ""}`.trim()}>
    {children}
  </div>
 )
}
