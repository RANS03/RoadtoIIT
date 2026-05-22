import { DashboardNav } from "@/components/layout/DashboardNav";
import { GridOverlay } from "@/components/background/GridOverlay";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Fixed sidebar */}
      <DashboardNav />

      {/* Main content area */}
      <main className="flex-1 relative overflow-y-auto">
        {/* Subtle grid over entire dashboard */}
        <GridOverlay className="opacity-40" />

        {/* Ambient top-right glow */}
        <div className="pointer-events-none fixed top-0 right-0 w-[500px] h-[500px] bg-[#00f0ff]/4 blur-[140px] rounded-full z-0" />
        <div className="pointer-events-none fixed bottom-0 left-1/4 w-[400px] h-[400px] bg-[#8b5cf6]/4 blur-[130px] rounded-full z-0" />

        <div className="relative z-10 min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
