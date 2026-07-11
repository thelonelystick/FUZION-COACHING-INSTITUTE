import type { MouseEventHandler } from "react";

export default function SessionWarningOverlay({
  message,
  onClose,
}: {
  message: string;
  onClose: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 sm:items-center">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[.24em] text-rose-500">Security alert</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">Session limit enforced</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{message}</p>
          </div>
          <button onClick={onClose} className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">Dismiss</button>
        </div>
      </div>
    </div>
  );
}
