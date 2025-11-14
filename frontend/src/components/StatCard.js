import React from 'react';

function StatCard({ icon: Icon, label, value, tone = 'default', loading }) {
  const toneClasses =
    tone === 'success'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
      : tone === 'danger'
      ? 'bg-rose-50 text-rose-700 border-rose-100'
      : 'bg-white text-slate-800 border-slate-100';

  return (
    <div
      className={`group flex items-center justify-between rounded-xl border ${toneClasses} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-transform transition-shadow px-4 py-3`}
    >
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
        <p className="mt-1 text-2xl font-semibold tabular-nums">
          {loading ? (
            <span className="inline-block h-6 w-16 rounded bg-slate-200 animate-pulse" />
          ) : (
            value
          )}
        </p>
      </div>
      {Icon && (
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-900/5 group-hover:bg-slate-900/10">
          <Icon className="text-lg opacity-70" />
        </div>
      )}
    </div>
  );
}

export default StatCard;
