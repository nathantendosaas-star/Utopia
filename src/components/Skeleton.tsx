import React from 'react';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white/5 ${className}`} />
  );
}

export function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col">
      {/* Hero Skeleton */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Skeleton className="w-full h-full opacity-20" />
        </div>
        <div className="relative z-10 w-full px-6 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-white/10" />
            <Skeleton className="w-32 h-3" />
            <div className="w-12 h-px bg-white/10" />
          </div>
          <div className="mb-12 space-y-4">
            <Skeleton className="w-[clamp(200px,60vw,600px)] h-24 sm:h-48 mx-auto" />
            <Skeleton className="w-[clamp(150px,40vw,400px)] h-24 sm:h-48 mx-auto" />
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <Skeleton className="w-[240px] h-[60px]" />
            <Skeleton className="w-[240px] h-[60px]" />
          </div>
        </div>
      </section>
    </div>
  );
}
