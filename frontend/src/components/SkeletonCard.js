import React from 'react';

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 animate-pulse">
      <div className="h-32 w-full rounded-xl bg-slate-200 mb-4" />
      <div className="h-4 w-3/4 rounded bg-slate-200 mb-2" />
      <div className="h-3 w-1/2 rounded bg-slate-200 mb-4" />
      <div className="flex justify-between items-center">
        <div className="h-5 w-20 rounded-full bg-slate-200" />
        <div className="h-9 w-24 rounded-lg bg-slate-200" />
      </div>
    </div>
  );
}

export default SkeletonCard;
