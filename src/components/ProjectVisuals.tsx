import React from 'react';

interface VisualProps {
  repoName: string;
  className?: string;
}

export const ProjectVisualCanvas: React.FC<VisualProps> = ({ repoName, className = '' }) => {
  switch (repoName) {
    case 'study-os':
      return (
        <div
          className={`relative overflow-hidden bg-[#0A0C14] select-none flex flex-col ${className}`}
          style={{
            backgroundImage:
              'radial-gradient(circle at 85% 15%, rgba(242, 183, 5, 0.18), transparent 55%), radial-gradient(circle at 15% 85%, rgba(59, 130, 246, 0.14), transparent 55%)',
          }}
        >
          <div className="relative flex-1 w-full p-5 sm:p-6 flex flex-col gap-3.5 border-b lg:border-b-0 border-[#232738]">
            {/* 1. Top Window Bar */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#232738] text-xs font-mono shrink-0">
              <span className="truncate text-[#F4F4F6] font-semibold">
                StudyOS · Cross-Platform Workspace
              </span>
              <span className="text-[#F2B705] font-semibold shrink-0">
                Web · Electron · Android
              </span>
            </div>

            {/* 2. Workspace Navigation & Command Palette Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-[#111420]/90 border border-[#232738] text-[11px] font-mono shrink-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-[#F2B705] text-[#06070B] font-bold">
                  Dashboard
                </span>
                <span className="px-2 py-0.5 rounded bg-[#0A0C14] text-[#D4D4D8] border border-[#232738]">
                  Planner
                </span>
                <span className="px-2 py-0.5 rounded bg-[#0A0C14] text-[#38BDF8] border border-[#38BDF8]/30">
                  Lectures
                </span>
                <span className="px-2 py-0.5 rounded bg-[#0A0C14] text-[#34D399] border border-[#34D399]/30">
                  Modules
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#0A0C14] text-[#C084FC] border border-[#C084FC]/30">
                  Revision
                </span>
              </div>
              <span className="text-[#94A3B8] shrink-0">Ctrl+K Palette</span>
            </div>

            {/* 3. Main Workspace Grid (Expands smoothly with flex-1, zero awkward gap) */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-stretch">
              {/* Left Module: Focus Clock, Active Views & Study Progress */}
              <div className="sm:col-span-7 bg-[#111420]/90 border border-[#F2B705]/35 rounded-xl p-4 flex flex-col justify-between gap-3 shadow-[0_0_25px_rgba(242,183,5,0.06)]">
                <div className="flex items-center justify-between text-xs border-b border-[#232738] pb-2.5">
                  <span className="font-semibold text-[#F2B705]">Focus &amp; Pomodoro Engine</span>
                  <span className="font-mono text-[11px] text-[#38BDF8] font-semibold">
                    25:00 · 2,480 XP
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
                  <div className="p-2 rounded-lg bg-[#0A0C14] border border-[#F2B705]/30 text-[#F4F4F6] text-center">
                    Planner
                  </div>
                  <div className="p-2 rounded-lg bg-[#0A0C14] border border-[#38BDF8]/30 text-[#38BDF8] text-center">
                    Lectures
                  </div>
                  <div className="p-2 rounded-lg bg-[#0A0C14] border border-[#34D399]/30 text-[#34D399] text-center">
                    Revision
                  </div>
                </div>

                {/* Module Tracker Progress Bars */}
                <div className="space-y-2 pt-1">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-[#D4D4D8] truncate">Modules &amp; Backlog Tracker</span>
                      <span className="text-[#F2B705]">84%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#0A0C14] overflow-hidden border border-[#232738]">
                      <div className="h-full w-[84%] bg-gradient-to-r from-[#F2B705] to-[#38BDF8]" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-[#D4D4D8] truncate">Daily Study Goal &amp; Streak</span>
                      <span className="text-[#34D399]">6.5 / 7 hrs</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#0A0C14] overflow-hidden border border-[#232738]">
                      <div className="h-full w-[92%] bg-gradient-to-r from-[#38BDF8] to-[#34D399]" />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#232738] flex items-center justify-between text-[11px] font-mono text-[#A1A1AA]">
                  <span>IndexedDB (idb)</span>
                  <span className="text-[#F2B705]">Firestore Cloud Sync</span>
                </div>
              </div>

              {/* Right Module: Verified Architecture Stack Cards */}
              <div className="sm:col-span-5 flex flex-col justify-between gap-2.5 font-mono text-xs">
                <div className="flex-1 bg-[#111420]/90 border border-[#38BDF8]/30 rounded-xl px-3.5 py-2.5 flex flex-col justify-center">
                  <div className="text-[11px] text-[#38BDF8]">State &amp; Analytics</div>
                  <div className="text-[#F4F4F6] font-semibold mt-0.5">Zustand · Chart.js</div>
                  <div className="text-[10px] text-[#94A3B8] mt-0.5">XP &amp; Focus Telemetry</div>
                </div>
                <div className="flex-1 bg-[#111420]/90 border border-[#F2B705]/35 rounded-xl px-3.5 py-2.5 flex flex-col justify-center">
                  <div className="text-[11px] text-[#F2B705]">Gemini AI Assistant</div>
                  <div className="text-[#F4F4F6] font-semibold mt-0.5">3-Key Auto Failover</div>
                  <div className="text-[10px] text-[#94A3B8] mt-0.5">Image &amp; Context Chat</div>
                </div>
                <div className="flex-1 bg-[#111420]/90 border border-[#34D399]/30 rounded-xl px-3.5 py-2.5 flex flex-col justify-center">
                  <div className="text-[11px] text-[#34D399]">Native App Blocker</div>
                  <div className="text-[#F4F4F6] font-semibold mt-0.5">Electron &amp; Android</div>
                  <div className="text-[10px] text-[#94A3B8] mt-0.5">Java Service + Desktop</div>
                </div>
              </div>
            </div>

            {/* 4. Bottom File & Runtime Bar */}
            <div className="pt-3 border-t border-[#232738] flex items-center justify-between text-xs text-[#A1A1AA] font-mono shrink-0">
              <span className="truncate">capacitor.config.ts · firestore.rules</span>
              <span className="shrink-0 ml-2 text-[#F2B705]">React 18 · TypeScript · Vite 8</span>
            </div>
          </div>
        </div>
      );

    case 'JEE-OS':
      return (
        <div
          className={`relative overflow-hidden bg-[#090D18] select-none flex flex-col ${className}`}
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.22), transparent 60%), radial-gradient(circle at 15% 85%, rgba(6, 182, 212, 0.15), transparent 55%)',
          }}
        >
          <div className="relative flex-1 w-full p-5 flex flex-col gap-3 border-b border-[#1E293B]">
            <div className="flex items-center justify-between gap-2 text-xs font-mono shrink-0">
              <span className="truncate text-[#F4F4F6] font-semibold">JEE-OS · Exam Workspace</span>
              <span className="text-[#38BDF8] font-semibold shrink-0">React 19 + Express</span>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
              <div className="bg-[#0F172A]/90 border border-[#3B82F6]/40 rounded-xl p-3.5 flex flex-col justify-center">
                <div className="text-[11px] text-[#38BDF8] font-mono">Backup Protocol</div>
                <div className="text-xs font-mono font-semibold text-[#F4F4F6] mt-1">
                  IndexedDB + .studyos
                </div>
                <div className="text-[11px] text-[#94A3B8] mt-1">
                  Credential-safe export &amp; merge
                </div>
              </div>
              <div className="bg-[#0F172A]/90 border border-[#06B6D4]/40 rounded-xl p-3.5 flex flex-col justify-center">
                <div className="text-[11px] text-[#22D3EE] font-mono">AI &amp; Desktop</div>
                <div className="text-xs font-mono font-semibold text-[#F4F4F6] mt-1">
                  server.ts + NSIS
                </div>
                <div className="text-[11px] text-[#94A3B8] mt-1">
                  Mammoth DOCX &amp; LaTeX Math
                </div>
              </div>
            </div>

            <div className="text-xs font-mono text-[#94A3B8] truncate shrink-0">
              Physics · Chemistry · Mathematics · Chapter &amp; PYQ Tracker
            </div>
          </div>
        </div>
      );

    case 'MyTube':
      return (
        <div
          className={`relative overflow-hidden bg-[#140910] select-none flex flex-col ${className}`}
          style={{
            backgroundImage:
              'radial-gradient(circle at 85% 20%, rgba(244, 63, 94, 0.22), transparent 60%), radial-gradient(circle at 15% 85%, rgba(249, 115, 22, 0.14), transparent 55%)',
          }}
        >
          <div className="relative flex-1 w-full p-5 flex flex-col gap-3 border-b border-[#2D1622]">
            <div className="flex items-center justify-between gap-2 text-xs font-mono shrink-0">
              <span className="truncate text-[#F4F4F6] font-semibold">MyTube · Streaming SPA</span>
              <span className="text-[#FB7185] font-semibold shrink-0">8-Key Failover</span>
            </div>
            <div className="flex-1 bg-[#1F1018]/90 border border-[#F43F5E]/40 rounded-xl p-3.5 flex flex-col justify-center space-y-2">
              <div className="flex items-center justify-between text-xs text-[#F4F4F6] font-semibold">
                <span>YouTube Data API v3 Pool</span>
                <span className="font-mono text-[11px] text-[#FB7185]">React 19 · Router 7</span>
              </div>
              <div className="text-[11px] font-mono text-[#FDA4AF]/80 leading-relaxed">
                Auto-rotates VITE_API_HOME / SEARCH / VIDEO + 7 fallback keys on quota exhaustion
              </div>
            </div>
            <div className="text-xs font-mono text-[#F43F5E] truncate shrink-0">
              Google OAuth 2.0 · Shorts &le;60s · In-Memory Cache
            </div>
          </div>
        </div>
      );

    case 'Split-screen-':
      return (
        <div
          className={`relative overflow-hidden bg-[#071512] select-none flex flex-col ${className}`}
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.22), transparent 60%), radial-gradient(circle at 20% 85%, rgba(6, 182, 212, 0.14), transparent 55%)',
          }}
        >
          <div className="relative flex-1 w-full p-5 flex flex-col gap-3 border-b border-[#132E27]">
            <div className="flex items-center justify-between gap-2 text-xs font-mono shrink-0">
              <span className="truncate text-[#F4F4F6] font-semibold">
                SplitMe Modern · Android 15
              </span>
              <span className="text-[#34D399] font-semibold shrink-0">Kotlin 2.0.21</span>
            </div>
            <div className="flex-1 bg-[#0D231E]/90 border border-[#10B981]/40 rounded-xl p-3.5 font-mono text-xs flex flex-col justify-center space-y-2">
              <div className="flex items-center justify-between gap-2 text-[#F4F4F6] font-semibold">
                <span className="truncate">Quick Settings TileService</span>
                <span className="text-[11px] text-[#34D399] shrink-0">SDK 35 · minSdk 28</span>
              </div>
              <div className="text-[11px] text-[#A7F3D0]/80 leading-relaxed">
                Dispatches GLOBAL_ACTION_TOGGLE_SPLIT_SCREEN via AccessibilityService
              </div>
            </div>
            <div className="text-xs font-mono text-[#34D399] truncate shrink-0">
              AGP 8.7.3 · Gradle 8.9 · Zero Internet Permission
            </div>
          </div>
        </div>
      );

    case 'ANIME_FRONTIER':
      return (
        <div
          className={`relative overflow-hidden bg-[#11091C] select-none flex flex-col ${className}`}
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.24), transparent 60%), radial-gradient(circle at 20% 85%, rgba(236, 72, 153, 0.15), transparent 55%)',
          }}
        >
          <div className="relative flex-1 w-full p-5 flex flex-col gap-3 border-b border-[#2B1942]">
            <div className="flex items-center justify-between gap-2 text-xs font-mono shrink-0">
              <span className="truncate text-[#F4F4F6] font-semibold">
                AnimeFrontier · Discovery Portal
              </span>
              <span className="text-[#C084FC] font-semibold shrink-0">Jikan REST API</span>
            </div>
            <div className="flex-1 bg-[#1B102E]/90 border border-[#A855F7]/40 rounded-xl p-3.5 flex flex-col justify-center space-y-2">
              <div className="text-xs font-semibold text-[#F4F4F6]">
                Live Anime Catalogue, Character Rosters &amp; Trailers
              </div>
              <div className="text-[11px] font-mono text-[#E9D5FF]/80 leading-relaxed">
                TV series, movies, episode lists, YouTube trailer modals &amp; localStorage watchlist
              </div>
            </div>
            <div className="text-xs font-mono text-[#C084FC] truncate shrink-0">
              221.6 KB Zero-Build Bundle · PWA Web Manifest
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div
          className={`relative overflow-hidden bg-[#07141B] select-none flex flex-col ${className}`}
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.22), transparent 60%), radial-gradient(circle at 20% 85%, rgba(59, 130, 246, 0.15), transparent 55%)',
          }}
        >
          <div className="relative flex-1 w-full p-5 flex flex-col gap-3 border-b border-[#15313F]">
            <div className="flex items-center justify-between gap-2 text-xs font-mono shrink-0">
              <span className="truncate text-[#F4F4F6] font-semibold">
                BrightPath · Coaching Portal
              </span>
              <span className="text-[#22D3EE] font-semibold shrink-0">Fee Engine + WhatsApp</span>
            </div>
            <div className="flex-1 bg-[#0D222E]/90 border border-[#06B6D4]/40 rounded-xl p-3.5 flex flex-col justify-center space-y-2">
              <div className="text-xs font-semibold text-[#F4F4F6]">
                Interactive Fee Calculator &amp; Admissions Flow
              </div>
              <div className="text-[11px] font-mono text-[#A5F3FC]/80 leading-relaxed">
                JEE, NEET, Class 6–10 Foundation &amp; UPSC tracks with topper filters &amp; reviews
              </div>
            </div>
            <div className="text-xs font-mono text-[#22D3EE] truncate shrink-0">
              HTML5 · Custom CSS3 · Vanilla JS · 10-Digit Phone Validator
            </div>
          </div>
        </div>
      );
  }
};
