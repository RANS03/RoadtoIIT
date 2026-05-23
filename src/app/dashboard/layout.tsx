import { DashboardNav } from "@/components/layout/DashboardNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { GridOverlay } from "@/components/background/GridOverlay";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex flex-col lg:flex-row h-screen bg-black text-white overflow-hidden w-full max-w-full overflow-x-hidden">
        {/* Fixed sidebar */}
        <DashboardNav />

        {/* Main content area */}
        <main className="flex-1 relative overflow-y-auto pb-20 lg:pb-0 w-full overflow-x-hidden">
          {/* Subtle grid over entire dashboard */}
          <GridOverlay className="opacity-40" />

          {/* Ambient top-right glow */}
          <div className="pointer-events-none fixed top-0 right-0 w-[280px] h-[280px] md:w-[500px] md:h-[500px] bg-[#00f0ff]/4 blur-[80px] md:blur-[140px] rounded-full z-0" />
          <div className="pointer-events-none fixed bottom-0 left-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-[#8b5cf6]/4 blur-[70px] md:blur-[130px] rounded-full z-0" />

          <div className="relative z-10 min-h-full px-4 md:px-0">
            {children}
          </div>
        </main>

        {/* Mobile bottom navigation */}
        <MobileNav />
      </div>
    </AuthGuard>
  );
}
