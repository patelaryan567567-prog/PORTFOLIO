import React, { useState } from 'react';
import { soundEngine } from '../utils/soundEngine';
import { RotateCw, Calculator, Smartphone, Layers, CheckCircle2, AlertTriangle } from 'lucide-react';

export const InteractiveSandboxLab: React.FC = () => {
  const [activeSimulator, setActiveSimulator] = useState<'mytube' | 'brightpath' | 'splitme' | 'studyos'>('mytube');

  // 1. MyTube 8-Key Quota Failover State
  const [activeKeyIndex, setActiveKeyIndex] = useState<number>(0);
  const [exhaustedKeys, setExhaustedKeys] = useState<number[]>([0, 1]);
  const [lastRequestStatus, setLastRequestStatus] = useState<string>(
    '200 OK · Served via VITE_API_EXTRA2 (In-Memory Cache Hit: 14ms)'
  );

  const myTubeKeys = [
    { env: 'VITE_API_HOME', scope: 'India Popular Feed' },
    { env: 'VITE_API_SEARCH', scope: 'Autocomplete & Query' },
    { env: 'VITE_API_VIDEO', scope: 'Watch & Comments' },
    { env: 'VITE_API_EXTRA', scope: 'Failover Slot #1' },
    { env: 'VITE_API_EXTRA2', scope: 'Failover Slot #2' },
    { env: 'VITE_API_EXTRA3', scope: 'Failover Slot #3' },
    { env: 'VITE_API_EXTRA4', scope: 'Failover Slot #4' },
    { env: 'VITE_API_EXTRA5', scope: 'Failover Slot #5' },
  ];

  const simulateQuotaSpike = () => {
    soundEngine.playClick();
    const nextExhausted = [...exhaustedKeys];
    if (!nextExhausted.includes(activeKeyIndex)) {
      nextExhausted.push(activeKeyIndex);
    }
    if (nextExhausted.length >= myTubeKeys.length) {
      setExhaustedKeys([]);
      setActiveKeyIndex(0);
      setLastRequestStatus('All 8 keys reset · Primary VITE_API_HOME active (10,000 units available)');
      soundEngine.playSuccess();
      return;
    }
    let nextActive = (activeKeyIndex + 1) % myTubeKeys.length;
    while (nextExhausted.includes(nextActive)) {
      nextActive = (nextActive + 1) % myTubeKeys.length;
    }
    setExhaustedKeys(nextExhausted);
    setActiveKeyIndex(nextActive);
    setLastRequestStatus(
      `HTTP 403 quotaExceeded on ${myTubeKeys[activeKeyIndex].env} → Auto-switched to ${myTubeKeys[nextActive].env} in 4ms`
    );
    soundEngine.playSuccess();
  };

  // 2. BrightPath Coaching Centre Fee Calculator State
  const [selectedCourse, setSelectedCourse] = useState<'JEE' | 'NEET' | 'FOUNDATION' | 'UPSC'>('JEE');
  const [scholarshipTier, setScholarshipTier] = useState<number>(20);
  const [installmentPlan, setInstallmentPlan] = useState<'lumpsum' | 'quarterly'>('lumpsum');

  const coursePricing = {
    JEE: { title: 'JEE Main & Advanced (2-Year Classroom)', baseFee: 85000, batch: 'Patel Chowk Morning Batch' },
    NEET: { title: 'NEET UG Medical Intensive', baseFee: 82000, batch: 'Bhabua Road Target Batch' },
    FOUNDATION: { title: 'Class 6–10 Olympiad & NTSE Foundation', baseFee: 36000, batch: 'Evening Foundation Wing' },
    UPSC: { title: 'UPSC Civil Services GS + CSAT', baseFee: 95000, batch: 'Weekend & Regular Hybrid' },
  };

  const currentCourse = coursePricing[selectedCourse];
  const discountAmount = Math.round((currentCourse.baseFee * scholarshipTier) / 100);
  const lumpsumReduction = installmentPlan === 'lumpsum' ? 4000 : 0;
  const finalTuition = Math.max(12000, currentCourse.baseFee - discountAmount - lumpsumReduction);

  // 3. SplitMe Modern Android SDK 35 State Machine
  const [accessibilityEnabled, setAccessibilityEnabled] = useState<boolean>(true);
  const [isSplitScreenActive, setIsSplitScreenActive] = useState<boolean>(false);
  const [androidLog, setAndroidLog] = useState<string>(
    'TileService ready · Waiting for user tap on Quick Settings "Split Screen" tile'
  );

  const handleTapSplitTile = () => {
    soundEngine.playClick();
    if (!accessibilityEnabled) {
      setIsSplitScreenActive(false);
      setAndroidLog(
        'AccessibilityService disabled → Tile stays INACTIVE (commit 4b19a02: never mark tile active before system confirms)'
      );
      return;
    }
    const nextState = !isSplitScreenActive;
    setIsSplitScreenActive(nextState);
    setAndroidLog(
      nextState
        ? 'AccessibilityService.performGlobalAction(GLOBAL_ACTION_TOGGLE_SPLIT_SCREEN) → System multi-window confirmed → Tile STATE_ACTIVE'
        : 'Split-screen dismissed → Tile returned to STATE_INACTIVE'
    );
    soundEngine.playSuccess();
  };

  // 4. StudyOS / JEE OS .studyos Backup & Focus Simulator
  const [studySubject, setStudySubject] = useState<string>('Rotational Mechanics & Electrostatics');
  const [xpPoints, setXpPoints] = useState<number>(2480);
  const [androidBlockerArmed, setAndroidBlockerArmed] = useState<boolean>(true);

  const simulatorTabs = [
    { id: 'mytube' as const, label: 'MyTube Key Failover', icon: RotateCw, accent: '#F43F5E' },
    { id: 'brightpath' as const, label: 'BrightPath Fee Engine', icon: Calculator, accent: '#06B6D4' },
    { id: 'splitme' as const, label: 'SplitMe Android SDK 35', icon: Smartphone, accent: '#10B981' },
    { id: 'studyos' as const, label: 'StudyOS / JEE-OS Backup', icon: Layers, accent: '#F2B705' },
  ];

  return (
    <section id="interactive-lab" className="py-20 md:py-28 border-t border-[#232738]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="space-y-2.5">
            <div className="text-xs font-editorial italic text-[#38BDF8]">
              03. Interactive Architecture Sandbox
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F4F4F6] text-balance">
              Experience the Codebases Live
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA] max-w-2xl leading-relaxed">
              Test the core engineering mechanisms across my repositories—from multi-key API quota
              rotation to Android Quick Settings state synchronization and{' '}
              <span className="font-mono text-[#F2B705]">.studyos</span> backup validation.
            </p>
          </div>

          {/* Multi-Color Interactive Simulator Selector Tabs */}
          <div
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0D101A] border border-[#232738] rounded-xl shrink-0"
            role="tablist"
            aria-label="Interactive repository simulators"
          >
            {simulatorTabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeSimulator === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveSimulator(tab.id);
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  style={
                    isSelected
                      ? { backgroundColor: tab.accent, color: '#06070B' }
                      : undefined
                  }
                  className={`interactive-btn inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705] whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'shadow-sm'
                      : 'text-[#A1A1AA] hover:text-[#F4F4F6] hover:bg-[#161926]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SIMULATOR 1: MyTube 8-Key Quota Rotation (Coral Rose Theme) */}
        {activeSimulator === 'mytube' && (
          <div
            className="bg-[#11131E] border border-[#F43F5E]/40 rounded-2xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
            style={{
              backgroundImage:
                'radial-gradient(circle at 90% 10%, rgba(244, 63, 94, 0.12), transparent 50%)',
            }}
          >
            <div className="lg:col-span-5 space-y-5">
              <div className="text-xs font-mono text-[#FB7185]">
                MyTube · React 19 + YouTube Data API v3
              </div>
              <h3 className="text-2xl font-bold text-[#F4F4F6] tracking-tight">
                Automatic Multi-Key Quota Failover Engine
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                As documented in <span className="font-mono text-[#F4F4F6]">MyTube/README.md</span>,
                the API client assigns dedicated keys for Home, Search, and Video playback, then
                rotates across <span className="font-mono text-[#F4F4F6]">VITE_API_EXTRA</span> through{' '}
                <span className="font-mono text-[#F4F4F6]">VITE_API_EXTRA7</span> whenever a{' '}
                <span className="font-mono text-[#FB7185]">quotaExceeded</span> response occurs.
              </p>

              <div className="p-4 rounded-xl bg-[#090B11] border border-[#F43F5E]/30 font-mono text-xs text-[#FDA4AF] leading-relaxed">
                {lastRequestStatus}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={simulateQuotaSpike}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="interactive-btn px-4 py-2.5 text-xs font-semibold text-white bg-[#F43F5E] rounded-xl hover:bg-[#E11D48] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F43F5E] cursor-pointer whitespace-nowrap shrink-0"
                >
                  Simulate quotaExceeded &amp; Rotate Key
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setExhaustedKeys([]);
                    setActiveKeyIndex(0);
                    setLastRequestStatus('All API keys restored to 100% daily quota.');
                  }}
                  className="interactive-btn px-4 py-2.5 text-xs font-medium text-[#D4D4D8] bg-[#161926] hover:text-[#F4F4F6] border border-[#282D42] hover:border-[#F43F5E] rounded-xl cursor-pointer whitespace-nowrap shrink-0"
                >
                  Reset Key Pool
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {myTubeKeys.map((item, idx) => {
                const isExhausted = exhaustedKeys.includes(idx);
                const isCurrent = activeKeyIndex === idx && !isExhausted;
                return (
                  <button
                    key={item.env}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setActiveKeyIndex(idx);
                    }}
                    className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-[#22111B] border-[#F43F5E] shadow-[0_0_20px_rgba(244,63,94,0.15)]'
                        : isExhausted
                        ? 'bg-[#090A10] border-[#1E2231] opacity-55'
                        : 'bg-[#0B0D15] border-[#232738] hover:border-[#F43F5E]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-mono">
                      <span className="font-semibold text-[#F4F4F6] truncate">{item.env}</span>
                      <span
                        className={
                          isCurrent
                            ? 'text-[#FB7185] font-semibold shrink-0'
                            : isExhausted
                            ? 'text-[#71717A] shrink-0'
                            : 'text-[#34D399] shrink-0'
                        }
                      >
                        {isCurrent ? 'ACTIVE KEY' : isExhausted ? 'EXHAUSTED' : 'STANDBY'}
                      </span>
                    </div>
                    <div className="text-xs text-[#94A3B8] mt-1.5">{item.scope}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* SIMULATOR 2: BrightPath Coaching Centre Fee Calculator (Cyan Teal Theme) */}
        {activeSimulator === 'brightpath' && (
          <div
            className="bg-[#11131E] border border-[#06B6D4]/40 rounded-2xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
            style={{
              backgroundImage:
                'radial-gradient(circle at 90% 10%, rgba(6, 182, 212, 0.14), transparent 50%)',
            }}
          >
            <div className="lg:col-span-6 space-y-5">
              <div className="text-xs font-mono text-[#22D3EE]">
                coaching-centre · BrightPath Fee Calculator
              </div>
              <h3 className="text-2xl font-bold text-[#F4F4F6] tracking-tight">
                BrightPath Coaching Centre Fee &amp; Scholarship Calculator
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Interactive replica of the fee table logic in{' '}
                <span className="font-mono text-[#F4F4F6]">coaching-centre/script.js</span> for JEE,
                NEET, Class 6–10 Foundation, and UPSC programmes.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['JEE', 'NEET', 'FOUNDATION', 'UPSC'] as const).map((course) => (
                  <button
                    key={course}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedCourse(course);
                    }}
                    className={`interactive-btn py-2.5 px-3 text-xs font-semibold rounded-xl border cursor-pointer whitespace-nowrap shrink-0 ${
                      selectedCourse === course
                        ? 'bg-[#06B6D4] text-[#06070B] border-[#06B6D4]'
                        : 'bg-[#090B11] text-[#A1A1AA] border-[#232738] hover:text-[#F4F4F6] hover:border-[#06B6D4]/60'
                    }`}
                  >
                    {course}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#A1A1AA]">Merit / Entrance Test Scholarship</span>
                  <span className="font-mono text-[#22D3EE] font-semibold tabular-nums">
                    {scholarshipTier}% Waiver
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={5}
                  value={scholarshipTier}
                  onChange={(e) => {
                    soundEngine.playHover();
                    setScholarshipTier(Number(e.target.value));
                  }}
                  aria-label="Scholarship percentage"
                  className="w-full accent-[#06B6D4] cursor-pointer"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setInstallmentPlan('lumpsum');
                  }}
                  className={`interactive-btn px-4 py-2 text-xs font-medium rounded-xl border cursor-pointer whitespace-nowrap shrink-0 ${
                    installmentPlan === 'lumpsum'
                      ? 'bg-[#0D222E] border-[#06B6D4] text-[#22D3EE]'
                      : 'bg-[#090B11] border-[#232738] text-[#8E8E99] hover:text-[#D4D4D8]'
                  }`}
                >
                  Single Lumpsum (-₹4,000)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setInstallmentPlan('quarterly');
                  }}
                  className={`interactive-btn px-4 py-2 text-xs font-medium rounded-xl border cursor-pointer whitespace-nowrap shrink-0 ${
                    installmentPlan === 'quarterly'
                      ? 'bg-[#0D222E] border-[#06B6D4] text-[#22D3EE]'
                      : 'bg-[#090B11] border-[#232738] text-[#8E8E99] hover:text-[#D4D4D8]'
                  }`}
                >
                  Quarterly Installments
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#090C14] border border-[#06B6D4]/30 rounded-2xl p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-4 gap-3">
                <div>
                  <div className="text-xs text-[#94A3B8]">{currentCourse.batch}</div>
                  <div className="text-base font-semibold text-[#F4F4F6] mt-0.5">
                    {currentCourse.title}
                  </div>
                </div>
                <span className="font-mono text-xs text-[#22D3EE] shrink-0">BRIGHTPATH</span>
              </div>

              <div className="space-y-3 text-sm font-mono tabular-nums">
                <div className="flex justify-between text-[#A1A1AA]">
                  <span>Base Programme Tuition</span>
                  <span>₹{currentCourse.baseFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#34D399]">
                  <span>Merit Scholarship ({scholarshipTier}%)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#22D3EE]">
                  <span>Lumpsum Concession</span>
                  <span>-₹{lumpsumReduction.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-3 border-t border-[#1E293B] flex justify-between items-baseline">
                  <span className="font-sans text-sm font-semibold text-[#F4F4F6]">
                    Estimated Annual Fee
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-[#22D3EE]">
                    ₹{finalTuition.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-2 text-xs font-mono text-[#94A3B8]">
                WhatsApp Enquiry Payload: &ldquo;Hi BrightPath, interested in {selectedCourse} (Fee
                Estimate: ₹{finalTuition.toLocaleString('en-IN')})&rdquo;
              </div>
            </div>
          </div>
        )}

        {/* SIMULATOR 3: SplitMe Modern Kotlin 2.0.21 Android SDK 35 (Emerald Mint Theme) */}
        {activeSimulator === 'splitme' && (
          <div
            className="bg-[#11131E] border border-[#10B981]/40 rounded-2xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
            style={{
              backgroundImage:
                'radial-gradient(circle at 90% 10%, rgba(16, 185, 129, 0.14), transparent 50%)',
            }}
          >
            <div className="lg:col-span-6 space-y-5">
              <div className="text-xs font-mono text-[#34D399]">
                Split-screen- · Kotlin 2.0.21 · Android SDK 35
              </div>
              <h3 className="text-2xl font-bold text-[#F4F4F6] tracking-tight">
                SplitMe Modern Quick Settings Tile State Machine
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Demonstrates commit{' '}
                <span className="font-mono text-[#F4F4F6]">
                  &ldquo;Do not mark split-screen tile active before system state confirms it&rdquo;
                </span>
                . Toggle the Android Accessibility Service state below and tap the Quick Settings
                tile to see how the service verifies split-screen activation.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setAccessibilityEnabled(!accessibilityEnabled);
                    if (accessibilityEnabled) setIsSplitScreenActive(false);
                  }}
                  className={`interactive-btn inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border cursor-pointer whitespace-nowrap shrink-0 ${
                    accessibilityEnabled
                      ? 'bg-[#0D231E] border-[#10B981] text-[#34D399]'
                      : 'bg-[#090B11] border-[#272732] text-[#A1A1AA]'
                  }`}
                >
                  {accessibilityEnabled ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertTriangle className="w-4 h-4" />
                  )}
                  <span>
                    AccessibilityService: {accessibilityEnabled ? 'ENABLED' : 'DISABLED'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleTapSplitTile}
                  className="interactive-btn px-4 py-2.5 text-xs font-semibold text-[#06070B] bg-[#10B981] rounded-xl hover:bg-[#059669] cursor-pointer whitespace-nowrap shrink-0"
                >
                  Tap Quick Settings &ldquo;Split Screen&rdquo; Tile
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#090B11] border border-[#10B981]/30 font-mono text-xs text-[#A7F3D0] leading-relaxed">
                {androidLog}
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md bg-[#090C14] border border-[#10B981]/35 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#34D399] px-1">
                  <span>Android SDK 35 · minSdk 28</span>
                  <span>Zero Internet Permissions</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleTapSplitTile}
                    className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                      isSplitScreenActive
                        ? 'bg-[#10B981] text-[#06070B] border-[#10B981]'
                        : 'bg-[#111522] text-[#F4F4F6] border-[#232738] hover:border-[#10B981]/60'
                    }`}
                  >
                    <div className="text-xs font-bold">Split Screen</div>
                    <div
                      className={`text-[11px] font-mono mt-0.5 ${
                        isSplitScreenActive ? 'text-[#06070B]/80' : 'text-[#8E8E99]'
                      }`}
                    >
                      {isSplitScreenActive ? 'STATE_ACTIVE' : 'STATE_INACTIVE'}
                    </div>
                  </button>

                  <div className="p-3.5 rounded-xl bg-[#111522] border border-[#232738] text-left">
                    <div className="text-xs font-semibold text-[#34D399]">Gradle 8.9</div>
                    <div className="text-[11px] font-mono text-[#94A3B8] mt-0.5">
                      Kotlin 2.0.21 · JDK 17
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pt-1">
                  <div className="p-4 rounded-xl bg-[#111522] border border-[#232738]">
                    <div className="text-xs font-mono text-[#38BDF8]">PRIMARY PANE</div>
                    <div className="text-sm font-medium text-[#F4F4F6] mt-1">
                      Foreground Application Window
                    </div>
                  </div>
                  {isSplitScreenActive && (
                    <div className="p-4 rounded-xl bg-[#0D231E] border border-[#10B981]/60">
                      <div className="text-xs font-mono text-[#34D399]">
                        SECONDARY PANE (SPLIT-SCREEN ACTIVE)
                      </div>
                      <div className="text-sm font-medium text-[#F4F4F6] mt-1">
                        Multi-Window Companion View
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SIMULATOR 4: StudyOS / JEE OS .studyos Backup & XP Engine (Amber Gold Theme) */}
        {activeSimulator === 'studyos' && (
          <div
            className="bg-[#11131E] border border-[#F2B705]/45 rounded-2xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
            style={{
              backgroundImage:
                'radial-gradient(circle at 90% 10%, rgba(242, 183, 5, 0.14), transparent 50%)',
            }}
          >
            <div className="lg:col-span-6 space-y-5">
              <div className="text-xs font-mono text-[#F2B705]">
                study-os &amp; JEE-OS · Local-First IndexedDB + .studyos Backup
              </div>
              <h3 className="text-2xl font-bold text-[#F4F4F6] tracking-tight">
                Credential-Safe .studyos Backup &amp; XP Telemetry
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Both <span className="font-mono text-[#F4F4F6]">study-os</span> and{' '}
                <span className="font-mono text-[#F4F4F6]">JEE-OS</span> persist chapter progress,
                backlogs, and Pomodoro timers in IndexedDB and export validated{' '}
                <span className="font-mono text-[#F2B705]">.studyos</span> backups with API keys
                omitted.
              </p>

              <div className="space-y-2">
                <label htmlFor="sim-subject" className="block text-xs font-medium text-[#A1A1AA]">
                  Active Study Module
                </label>
                <input
                  id="sim-subject"
                  type="text"
                  value={studySubject}
                  onChange={(e) => setStudySubject(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-[#090B11] border border-[#232738] rounded-xl text-[#F4F4F6] focus:outline-none focus:border-[#F2B705]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playSuccess();
                    setXpPoints((p) => p + 150);
                  }}
                  className="interactive-btn px-4 py-2.5 text-xs font-semibold text-[#06070B] bg-[#F2B705] rounded-xl hover:bg-[#d9a404] cursor-pointer whitespace-nowrap shrink-0"
                >
                  Log Focus Session (+150 XP)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setAndroidBlockerArmed(!androidBlockerArmed);
                  }}
                  className="interactive-btn px-4 py-2.5 text-xs font-medium text-[#F4F4F6] bg-[#090B11] border border-[#282D42] rounded-xl hover:border-[#F2B705] cursor-pointer whitespace-nowrap shrink-0"
                >
                  Android App Blocker: {androidBlockerArmed ? 'ARMED' : 'PAUSED'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#090C14] border border-[#F2B705]/35 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-[#1E293B] bg-[#06070B] flex items-center justify-between text-xs font-mono text-[#8E8E99]">
                <span className="text-[#F4F4F6]">aryan-backup.studyos</span>
                <span className="text-[#34D399]">API KEYS OMITTED</span>
              </div>
              <pre className="p-5 text-xs font-mono text-[#FDE68A] overflow-x-auto leading-relaxed">
{JSON.stringify(
  {
    schemaVersion: 4,
    product: 'StudyOS / JEE-OS',
    owner: 'Aryan Singh (@patelaryan567567-prog)',
    activeChapter: studySubject,
    telemetry: {
      xpTotal: xpPoints,
      androidAppBlocker: androidBlockerArmed ? 'ACTIVE_SERVICE' : 'STANDBY',
    },
    securityAudit: {
      geminiApiKeysIncluded: false,
      firebaseTokensIncluded: false,
    },
  },
  null,
  2
)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
