import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { MissionSection } from "@/components/sections/MissionSection";
import { ConfessionsSection } from "@/components/sections/ConfessionsSection";
import { RealityStatsSection } from "@/components/sections/RealityStatsSection";
import { IntelligenceHubSection } from "@/components/sections/IntelligenceHubSection";
import { MissionPathwaysSection } from "@/components/sections/MissionPathwaysSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* Cinematic Scroll Storytelling */}
      <div className="relative z-10 flex flex-col pb-32">
        <HeroSection />

        {/* System Files Briefing */}
        <MissionSection />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent max-w-4xl mx-auto" />

        {/* Survivor Logs */}
        <ConfessionsSection />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/15 to-transparent max-w-4xl mx-auto" />

        {/* Reality Index */}
        <RealityStatsSection />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00f0ff]/15 to-transparent max-w-4xl mx-auto" />

        {/* Intelligence Hub */}
        <IntelligenceHubSection />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent max-w-4xl mx-auto" />

        {/* Mission Pathways */}
        <MissionPathwaysSection />

        {/* Final CTA */}
        <FinalCTASection />
      </div>
    </main>
  );
}