"use client";

import dynamic from "next/dynamic";

const VisualizerLayout = dynamic(
  () => import("@/components/visualizador/VisualizerLayout"),
  {
    ssr: false,
    loading: () => <VisualizerSkeleton />,
  }
);

function VisualizerSkeleton() {
  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      {/* Panel skeleton */}
      <div className="w-[400px] flex-shrink-0 border-r border-[rgba(20,20,20,0.06)] p-6 flex flex-col gap-4">
        <div className="h-10 rounded-2xl bg-[rgba(20,20,20,0.05)] animate-pulse" />
        <div className="h-px bg-[rgba(20,20,20,0.06)]" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-11 rounded-2xl bg-[rgba(20,20,20,0.05)] animate-pulse" />
        ))}
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-11 rounded-2xl bg-[rgba(20,20,20,0.05)] animate-pulse" />
          ))}
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-12 rounded-2xl bg-[rgba(20,20,20,0.05)] animate-pulse" />
        ))}
      </div>
      {/* Canvas skeleton */}
      <div className="flex-1 flex items-center justify-center bg-[#F7F5F0]">
        <div className="flex flex-col items-center gap-3 text-muted">
          <div className="w-16 h-16 rounded-3xl bg-[rgba(20,20,20,0.06)] animate-pulse" />
          <p className="text-[13px]">Cargando visualizador 3D…</p>
        </div>
      </div>
    </div>
  );
}

export default function VisualizadorClient() {
  return <VisualizerLayout />;
}
