/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ExternalLink,
  ArrowUpRight,
  Terminal,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  INITIAL_USER_PROFILE,
  INITIAL_REPOSITORIES,
  EnrichedRepository,
  GitHubUserProfile,
  formatBytes,
  formatShortDate,
} from './data/githubData';
import { ProjectVisualCanvas } from './components/ProjectVisuals';
import { RepositoryLightboxModal } from './components/RepositoryLightboxModal';
import { InteractiveSandboxLab } from './components/InteractiveSandboxLab';
import { soundEngine } from './utils/soundEngine';

const NAV_ITEMS = [
  { id: 'selected-works', label: 'Projects' },
  { id: 'about-identity', label: 'About & Skills' },
  { id: 'interactive-lab', label: 'Interactive Demos' },
  { id: 'contact', label: 'Contact' },
] as const;

const VERIFIED_SKILL_CATEGORIES = [
  {
    category: 'Languages',
    accent: '#F2B705',
    summary: 'Core programming and markup languages used across web, desktop, and Android repositories.',
    items: [
      { name: 'TypeScript', repos: 'study-os, JEE-OS' },
      { name: 'JavaScript (ES6+)', repos: 'MyTube, ANIME_FRONTIER, coaching-centre' },
      { name: 'HTML5 & CSS3', repos: 'coaching-centre, ANIME_FRONTIER, study-os, MyTube' },
      { name: 'Kotlin (2.0.21)', repos: 'Split-screen-' },
      { name: 'Java', repos: 'study-os (Android service)' },
      { name: 'Batch & PowerShell', repos: 'study-os (desktop scripts)' },
    ],
  },
  {
    category: 'Frontend & UI Engineering',
    accent: '#38BDF8',
    summary: 'Component frameworks, state management, routing, and data visualization libraries.',
    items: [
      { name: 'React 18 & React 19', repos: 'study-os, JEE-OS, MyTube' },
      { name: 'Vite 8', repos: 'study-os, JEE-OS, MyTube' },
      { name: 'React Router (v6 / v7)', repos: 'study-os, MyTube' },
      { name: 'Tailwind CSS', repos: 'study-os, JEE-OS, ANIME_FRONTIER' },
      { name: 'Zustand State Management', repos: 'study-os' },
      { name: 'Chart.js & Motion', repos: 'study-os, JEE-OS' },
    ],
  },
  {
    category: 'AI, APIs & Backend Services',
    accent: '#C084FC',
    summary: 'AI SDK integrations, server-side proxy routes, document parsing, and multi-key quota failover.',
    items: [
      { name: 'Google Gemini SDKs', repos: 'study-os, JEE-OS' },
      { name: 'Node.js & Express (server.ts)', repos: 'JEE-OS' },
      { name: 'YouTube Data API v3 & Axios', repos: 'MyTube, ANIME_FRONTIER' },
      { name: 'Jikan REST API (v4)', repos: 'ANIME_FRONTIER' },
      { name: 'Google OAuth 2.0 & JWT Decode', repos: 'MyTube' },
      { name: 'Mammoth (DOCX Parsing)', repos: 'JEE-OS' },
    ],
  },
  {
    category: 'Storage, Desktop & Android Runtimes',
    accent: '#34D399',
    summary: 'Local-first browser storage, cloud sync, desktop installers, and native Android system APIs.',
    items: [
      { name: 'IndexedDB (idb) & LocalStorage', repos: 'study-os, JEE-OS, ANIME_FRONTIER, coaching-centre' },
      { name: 'Firebase Auth & Firestore', repos: 'study-os' },
      { name: 'Electron & NSIS Packaging', repos: 'study-os, JEE-OS' },
      { name: 'Capacitor Android', repos: 'study-os' },
      { name: 'Android SDK 35 (TileService & AccessibilityService)', repos: 'Split-screen-' },
      { name: 'Gradle 8.9 & AGP 8.7.3', repos: 'Split-screen-, study-os' },
    ],
  },
] as const;

const DEVELOPER_INTEREST_AREAS = [
  {
    number: '01',
    accent: '#F2B705',
    title: 'Practical AI Integration & API Resilience',
    description:
      'Building AI-assisted workflows that remain reliable in real usage—such as contextual study assistants, document/image parsing, and automatic multi-key failover when API quotas are reached.',
    evidence: 'StudyOS · JEE-OS · MyTube',
  },
  {
    number: '02',
    accent: '#38BDF8',
    title: 'Focused Student & Productivity Software',
    description:
      'Designing distraction-aware study workspaces that combine planners, Pomodoro timers, chapter trackers, revision queues, and portable local backups.',
    evidence: 'StudyOS · JEE-OS · BrightPath Coaching Centre',
  },
  {
    number: '03',
    accent: '#34D399',
    title: 'Cross-Platform & Native Utility Engineering',
    description:
      'Packaging web applications for Windows desktop and Android while developing lightweight native Kotlin utilities that integrate with OS system settings.',
    evidence: 'StudyOS · JEE-OS · Split-screen-',
  },
] as const;

export default function App() {
  const [profile, setProfile] = useState<GitHubUserProfile>(INITIAL_USER_PROFILE);
  const [repos, setRepos] = useState<EnrichedRepository[]>(INITIAL_REPOSITORIES);
  const [heroPreviewRepoName, setHeroPreviewRepoName] = useState<string>('study-os');
  const [activeModalRepo, setActiveModalRepo] = useState<EnrichedRepository | null>(null);
  const [avatarError, setAvatarError] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('selected-works');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Silently refresh repository metadata from GitHub API on load
  useEffect(() => {
    let isMounted = true;
    const refreshFromGitHub = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/patelaryan567567-prog'),
          fetch('https://api.github.com/users/patelaryan567567-prog/repos?per_page=100&sort=updated'),
        ]);

        if (!isMounted) return;

        if (userRes.ok) {
          const userData = await userRes.json();
          setProfile((prev) => ({
            ...prev,
            name: userData.name || prev.name,
            bio: userData.bio ? userData.bio.replace(/\r?\n/g, ' · ') : prev.bio,
            publicRepos: userData.public_repos ?? prev.publicRepos,
            avatarUrl: userData.avatar_url || prev.avatarUrl,
            updatedAt: userData.updated_at || prev.updatedAt,
          }));
        }

        if (reposRes.ok) {
          const liveRepos = await reposRes.json();
          if (Array.isArray(liveRepos)) {
            setRepos((prevRepos) =>
              prevRepos.map((existing) => {
                const match = liveRepos.find(
                  (r: { name: string }) => r.name.toLowerCase() === existing.name.toLowerCase()
                );
                if (!match) return existing;
                return {
                  ...existing,
                  updatedAt: match.updated_at || existing.updatedAt,
                  pushedAt: match.pushed_at || existing.pushedAt,
                  sizeKb: match.size ?? existing.sizeKb,
                  tagline: match.description || existing.tagline,
                };
              })
            );
          }
        }
      } catch {
        // Gracefully retain verified repository data if offline or rate-limited
      }
    };

    refreshFromGitHub();
    return () => {
      isMounted = false;
    };
  }, []);

  // Track active section in viewport for navigation indicator
  useEffect(() => {
    const sectionIds = ['selected-works', 'about-identity', 'interactive-lab', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0.05 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    soundEngine.enabled = next;
    setSoundEnabled(next);
    if (next) {
      soundEngine.playSuccess();
    }
  };

  const heroActiveRepo = useMemo(
    () => repos.find((r) => r.name === heroPreviewRepoName) || repos[0],
    [repos, heroPreviewRepoName]
  );

  return (
    <div className="min-h-screen bg-workspace-canvas text-[#F4F4F6] flex flex-col">
      {/* Strict 3-Zone Top Navigation Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-8 px-6 py-4 border-b border-[#232738] bg-[#06070B]/85 backdrop-blur-md">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          onClick={() => soundEngine.playClick()}
          className="text-lg font-bold tracking-tight text-[#F4F4F6] hover:text-[#F2B705] transition-colors whitespace-nowrap shrink-0 font-display focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705]"
        >
          Aryan Singh
        </a>

        {/* Zone 2: Clean Section Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveSection(item.id);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`transition-colors whitespace-nowrap shrink-0 underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705] ${
                  isActive
                    ? 'text-[#F2B705] underline decoration-[#F2B705] decoration-2'
                    : 'text-[#A1A1AA] hover:text-[#F4F4F6] hover:underline'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center shrink-0">
          <a
            href="https://github.com/patelaryan567567-prog"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playClick()}
            onMouseEnter={() => soundEngine.playHover()}
            className="interactive-btn inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#06070B] bg-gradient-to-r from-[#F2B705] to-[#F59E0B] rounded-xl hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705] whitespace-nowrap shrink-0"
          >
            <span>GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Mobile Section Navigation Bar */}
        <nav
          aria-label="Mobile section navigation"
          className="flex md:hidden items-center gap-5 px-6 py-3 overflow-x-auto text-xs font-medium border-b border-[#232738] bg-[#0B0D15]/90"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveSection(item.id);
                }}
                className={`py-0.5 whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'text-[#F2B705] font-semibold underline underline-offset-4'
                    : 'text-[#A1A1AA] hover:text-[#F4F4F6]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Identity, Multi-Tone Headline, Concise Intro & Primary Actions */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col justify-between space-y-8"
            >
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-[#A1A1AA]">
                  <span className="font-semibold text-[#F4F4F6]">Aryan Singh</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-editorial italic text-[#F2B705]">
                    AI Enthusiast &amp; Software Developer
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-xs text-[#38BDF8]">@{profile.login}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#F4F4F6] leading-[1.08] text-balance">
                  AI Enthusiast &amp; Software Developer{' '}
                  <span className="font-editorial italic font-normal text-gradient-aurora">
                    Building Practical Tools
                  </span>{' '}
                  for Everyday Learning &amp; Media.
                </h1>

                <p className="text-base sm:text-lg text-[#D4D4D8] leading-relaxed max-w-2xl">
                  I am <span className="text-[#F4F4F6] font-semibold">Aryan Singh</span>, a software
                  developer exploring AI integration and building useful web, desktop, and Android
                  applications. My work focuses on turning everyday workflow ideas into clean,
                  functional software—including{' '}
                  <span className="text-[#F2B705] font-medium">StudyOS</span>,{' '}
                  <span className="text-[#38BDF8] font-medium">JEE-OS</span>,{' '}
                  <span className="text-[#FB7185] font-medium">MyTube</span>,{' '}
                  <span className="text-[#34D399] font-medium">Split-screen-</span>,{' '}
                  <span className="text-[#C084FC] font-medium">ANIME_FRONTIER</span>, and{' '}
                  <span className="text-[#22D3EE] font-medium">coaching-centre</span>.
                </p>
              </div>

              <div className="space-y-6 pt-2">
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#selected-works"
                    onClick={() => soundEngine.playClick()}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="interactive-btn inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-[#06070B] bg-gradient-to-r from-[#F2B705] to-[#F59E0B] rounded-xl hover:brightness-110 shadow-[0_0_25px_rgba(242,183,5,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705] whitespace-nowrap shrink-0"
                  >
                    <span>Explore My Projects</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <a
                    href="https://github.com/patelaryan567567-prog"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundEngine.playClick()}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="interactive-btn inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-[#F4F4F6] bg-[#11131E] border border-[#282D42] rounded-xl hover:border-[#38BDF8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] whitespace-nowrap shrink-0"
                  >
                    <span>View GitHub</span>
                    <ExternalLink className="w-4 h-4 text-[#38BDF8]" />
                  </a>
                </div>

                <div className="text-xs text-[#94A3B8] flex flex-wrap items-center gap-3 font-mono">
                  <a
                    href="https://github.com/patelaryan567567-prog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F2B705] hover:underline transition-colors"
                  >
                    github.com/{profile.login}
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href={profile.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#38BDF8] hover:underline transition-colors"
                  >
                    Telegram {profile.telegramHandle}
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-[#34D399] hover:underline transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Interactive Project Preview Card with Dynamic Accent Color */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col"
            >
              <div
                className="flex-1 bg-[#11131E] border rounded-2xl overflow-hidden flex flex-col justify-between transition-colors duration-300"
                style={{ borderColor: `${heroActiveRepo.accentHex}66` }}
              >
                <div className="p-5 sm:p-6 border-b border-[#232738] bg-[#0B0D15] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    {!avatarError ? (
                      <img
                        src={profile.avatarUrl}
                        alt="Aryan Singh GitHub avatar"
                        referrerPolicy="no-referrer"
                        onError={() => setAvatarError(true)}
                        className="w-11 h-11 rounded-xl object-cover border border-[#38BDF8]/40 shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-[#191C2B] border border-[#F2B705]/40 flex items-center justify-center font-display font-bold text-sm text-[#F2B705] shrink-0">
                        AS
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-[#F4F4F6] truncate">
                        Aryan Singh
                      </div>
                      <div className="text-xs font-mono text-[#38BDF8] truncate">
                        @{profile.login}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Project Preview Switcher */}
                  <div
                    className="flex flex-wrap items-center gap-1 p-1 bg-[#06070B] border border-[#232738] rounded-xl"
                    role="tablist"
                    aria-label="Preview featured repositories"
                  >
                    {['study-os', 'JEE-OS', 'MyTube', 'Split-screen-'].map((name) => {
                      const tabRepo = repos.find((r) => r.name === name);
                      const isSelected = heroPreviewRepoName === name;
                      return (
                        <button
                          key={name}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          onClick={() => {
                            soundEngine.playClick();
                            setHeroPreviewRepoName(name);
                          }}
                          onMouseEnter={() => soundEngine.playHover()}
                          style={
                            isSelected && tabRepo
                              ? { backgroundColor: tabRepo.accentHex, color: '#06070B' }
                              : undefined
                          }
                          className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isSelected
                              ? 'font-bold'
                              : 'text-[#94A3B8] hover:text-[#F4F4F6]'
                          }`}
                        >
                          {name === 'Split-screen-' ? 'SplitMe' : name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Architectural Preview Canvas */}
                <div className="flex-1 flex flex-col justify-between">
                  <ProjectVisualCanvas
                    repoName={heroActiveRepo.name}
                    className="flex-1 min-h-[240px]"
                  />

                  <div className="p-5 sm:p-6 bg-[#11131E] flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div
                        className="text-xs font-editorial italic truncate"
                        style={{ color: heroActiveRepo.accentHex }}
                      >
                        {heroActiveRepo.primaryLanguage} · {heroActiveRepo.runtimes[0]}
                      </div>
                      <div className="text-sm font-semibold text-[#F4F4F6] truncate mt-0.5">
                        {heroActiveRepo.displayName}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playModalOpen();
                        setActiveModalRepo(heroActiveRepo);
                      }}
                      onMouseEnter={() => soundEngine.playHover()}
                      style={{ backgroundColor: heroActiveRepo.accentHex }}
                      className="interactive-btn px-4 py-2 text-xs font-semibold text-[#06070B] rounded-xl hover:brightness-110 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Inspect Project
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 4 Color-Accented Engineering Focus Overview Cards */}
          <div className="mt-12 pt-10 border-t border-[#232738] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#11131E] border border-[#F2B705]/35 rounded-2xl p-6">
              <div className="text-xs font-mono text-[#F2B705]">01 · PUBLIC PROJECTS</div>
              <div className="text-2xl font-bold font-display text-[#F4F4F6] mt-2">
                6 Applications
              </div>
              <div className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                StudyOS, JEE-OS, MyTube, Split-screen-, ANIME_FRONTIER &amp; coaching-centre
              </div>
            </div>

            <div className="bg-[#11131E] border border-[#38BDF8]/35 rounded-2xl p-6">
              <div className="text-xs font-mono text-[#38BDF8]">02 · CORE LANGUAGES</div>
              <div className="text-2xl font-bold font-display text-[#F4F4F6] mt-2">
                TS, JS &amp; Kotlin
              </div>
              <div className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                TypeScript, JavaScript (React 18/19), Kotlin 2.0.21, Java, HTML5 &amp; CSS3
              </div>
            </div>

            <div className="bg-[#11131E] border border-[#34D399]/35 rounded-2xl p-6">
              <div className="text-xs font-mono text-[#34D399]">03 · TARGET PLATFORMS</div>
              <div className="text-2xl font-bold font-display text-[#F4F4F6] mt-2">
                Web, Desktop &amp; Android
              </div>
              <div className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                React + Vite SPAs, Electron Windows packaging, Capacitor &amp; Android SDK 35
              </div>
            </div>

            <div className="bg-[#11131E] border border-[#C084FC]/35 rounded-2xl p-6">
              <div className="text-xs font-mono text-[#C084FC]">04 · ARCHITECTURE</div>
              <div className="text-2xl font-bold font-display text-[#F4F4F6] mt-2">
                Local-First &amp; AI
              </div>
              <div className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                IndexedDB persistence, Firestore sync, Gemini SDKs &amp; multi-key API failover
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 01 — Featured Projects Showcase */}
        <section
          id="selected-works"
          className="border-t border-[#232738] max-w-7xl mx-auto px-6 py-20 md:py-28"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2.5">
              <div className="text-xs font-editorial italic text-[#F2B705]">
                01. Featured Work
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F4F4F6] text-balance">
                Projects &amp; Applications
              </h2>
            </div>
            <p className="text-sm text-[#A1A1AA] max-w-md leading-relaxed">
              Open any project on GitHub to view the repository, or click{' '}
              <span className="text-[#F4F4F6] font-medium">Inspect Details</span> to browse its
              architecture, README, and source file tree.
            </p>
          </div>

          {(() => {
            const flagshipRepo = repos.find((r) => r.name === 'study-os') || repos[0];
            const otherRepos = repos.filter((r) => r.name !== flagshipRepo.name);

            const studyOsVerifiedFeatures = [
              'Dashboard, planner, tasks, lectures, modules tracker, backlog, revision, notes, calendar, reminders, and profile views',
              'Focus/Pomodoro timer, study statistics, XP/gamification, charts, command palette, keyboard shortcuts, and reduced-motion preferences',
              'Browser-local persistence via IndexedDB and localStorage, with optional Firebase Authentication and Firestore sync',
              'Optional Gemini study assistant supporting image attachments, streaming replies, contextual study data, and rotation across up to 3 user-provided API keys on quota/rate-limit errors',
              'Electron Windows desktop wrapper and Capacitor Android project with native Android app-blocker service code',
            ];

            return (
              <div className="space-y-10">
                {/* Flagship Card: StudyOS */}
                <motion.article
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="interactive-card card-glow-flagship border border-[#F2B705]/60 hover:border-[#F2B705] rounded-2xl overflow-hidden"
                >
                  <div className="h-1.5 w-full bg-gradient-to-r from-[#F2B705] via-[#38BDF8] to-[#34D399]" />
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A1AA]">
                          <span className="font-semibold text-[#F2B705]">Flagship Project</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono text-[#38BDF8]">{flagshipRepo.name}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#34D399] font-medium">
                            {flagshipRepo.primaryLanguage}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F4F6] tracking-tight">
                            StudyOS
                          </h3>
                          <p className="text-sm sm:text-base text-[#D4D4D8] mt-2 leading-relaxed">
                            A React, TypeScript, and Vite productivity workspace designed around
                            studying, planning, and focus management. Runs in the browser and
                            includes Electron desktop and Capacitor Android wrappers.
                          </p>
                        </div>

                        <div className="pt-2 space-y-2">
                          <div className="text-xs font-semibold text-[#F4F4F6]">
                            Key Capabilities
                          </div>
                          <ul className="space-y-2 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                            {studyOsVerifiedFeatures.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="font-mono text-xs text-[#F2B705] shrink-0 mt-0.5">
                                  0{idx + 1}.
                                </span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2">
                          <div className="text-xs font-semibold text-[#38BDF8] mb-1.5">
                            Technology Stack
                          </div>
                          <p className="text-xs font-mono text-[#D4D4D8] leading-relaxed">
                            React 18 · TypeScript · Vite 8 · React Router · Tailwind CSS · Framer
                            Motion · Zustand · Chart.js · IndexedDB (idb) · Firebase Auth &amp;
                            Firestore · Google Generative AI SDK · Electron · Capacitor Android
                          </p>
                        </div>
                      </div>

                      <div className="pt-5 border-t border-[#232738] flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <a
                            href="https://github.com/patelaryan567567-prog/study-os"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => soundEngine.playClick()}
                            onMouseEnter={() => soundEngine.playHover()}
                            className="interactive-btn inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#06070B] bg-gradient-to-r from-[#F2B705] to-[#F59E0B] rounded-xl hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705] whitespace-nowrap shrink-0"
                          >
                            <span>View StudyOS on GitHub</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>

                          <button
                            type="button"
                            onClick={() => {
                              soundEngine.playModalOpen();
                              setActiveModalRepo(flagshipRepo);
                            }}
                            onMouseEnter={() => soundEngine.playHover()}
                            className="interactive-btn inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#F4F4F6] bg-[#161926] border border-[#282D42] rounded-xl hover:border-[#38BDF8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <span>Inspect Files &amp; README</span>
                            <ArrowUpRight className="w-4 h-4 text-[#38BDF8]" />
                          </button>
                        </div>

                        <span className="text-xs font-mono text-[#8E8E99]">
                          Updated {formatShortDate(flagshipRepo.updatedAt)}
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 lg:border-l border-[#232738] bg-[#0A0C14] flex flex-col justify-between">
                      <ProjectVisualCanvas
                        repoName={flagshipRepo.name}
                        className="flex-1"
                      />

                      {/* Verified Run Workflow & Multi-Runtime Summary Strip */}
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 bg-[#0A0C14] space-y-3 border-t border-[#232738]/70">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#38BDF8] font-semibold">
                            Quick Start &amp; Runtimes
                          </span>
                          <span className="text-[#34D399]">
                            {formatBytes(flagshipRepo.totalBytes)} Source
                          </span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#111420] border border-[#232738] font-mono text-xs text-[#D4D4D8] space-y-1">
                          <div>
                            <span className="text-[#F2B705]">$</span> npm install &amp;&amp; npm run dev
                          </div>
                          <div>
                            <span className="text-[#38BDF8]">$</span> npx cap sync android
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 text-[11px] font-mono">
                          <div className="px-3 py-2 rounded-lg bg-[#111420] border border-[#232738] text-[#A1A1AA]">
                            Desktop: <span className="text-[#F4F4F6]">Electron Windows</span>
                          </div>
                          <div className="px-3 py-2 rounded-lg bg-[#111420] border border-[#232738] text-[#A1A1AA]">
                            Mobile: <span className="text-[#34D399]">Capacitor Android</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>

                {/* Other 5 Projects Grid — Each with Subtle Radial Gradient & Signature Glow */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherRepos.map((repo, index) => (
                    <motion.article
                      key={repo.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{
                        duration: 0.3,
                        delay: Math.min(index * 0.05, 0.2),
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={
                        {
                          borderColor: `${repo.accentHex}50`,
                          backgroundImage: `radial-gradient(circle at 88% 58%, ${repo.accentHex}16, transparent 58%), linear-gradient(165deg, rgba(21, 25, 41, 0.96) 0%, rgba(12, 15, 25, 0.98) 100%)`,
                          '--glow-color': `${repo.accentHex}26`,
                          '--glow-hover': `${repo.accentHex}45`,
                        } as React.CSSProperties
                      }
                      className="interactive-card card-glow-surface bg-[#11131E] border rounded-2xl overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        <div
                          className="h-1 w-full"
                          style={{ backgroundColor: repo.accentHex }}
                        />
                        <ProjectVisualCanvas repoName={repo.name} className="h-48" />

                        <div className="p-6 space-y-4">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#94A3B8]">
                            <span
                              className="font-mono font-semibold"
                              style={{ color: repo.accentHex }}
                            >
                              {repo.name}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#F4F4F6] font-medium">
                              {repo.primaryLanguage}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums">
                              {formatBytes(repo.totalBytes)}
                            </span>
                          </div>

                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-[#F4F4F6] tracking-tight">
                              {repo.name}
                            </h3>
                            <p
                              className="text-xs font-editorial italic mt-0.5"
                              style={{ color: repo.accentHex }}
                            >
                              {repo.displayName}
                            </p>
                          </div>

                          <p className="text-sm text-[#A1A1AA] leading-relaxed">
                            {repo.tagline}
                          </p>

                          <div className="pt-1">
                            <div className="text-[11px] font-semibold text-[#D4D4D8] mb-1">
                              Tech Stack
                            </div>
                            <p className="text-xs font-mono text-[#94A3B8] leading-relaxed">
                              {repo.techStackList.join(' · ')}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="px-6 py-4 border-t border-[#232738] bg-[#0B0D15]/80 flex items-center justify-between gap-3">
                        <a
                          href={repo.htmlUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => soundEngine.playClick()}
                          onMouseEnter={() => soundEngine.playHover()}
                          style={{ backgroundColor: repo.accentHex }}
                          className="interactive-btn inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#06070B] rounded-lg hover:brightness-110 whitespace-nowrap shrink-0"
                        >
                          <span>GitHub Repo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            soundEngine.playModalOpen();
                            setActiveModalRepo(repo);
                          }}
                          onMouseEnter={() => soundEngine.playHover()}
                          className="interactive-btn inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#F4F4F6] bg-[#161926] border border-[#282D42] rounded-lg hover:border-[#F4F4F6] whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>Inspect Details</span>
                          <ArrowUpRight
                            className="w-3.5 h-3.5"
                            style={{ color: repo.accentHex }}
                          />
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            );
          })()}
        </section>

        {/* SECTION 02 — About Me, Developer Interests & Verified Skills */}
        <section
          id="about-identity"
          className="border-t border-[#232738] bg-section-subtle py-20 md:py-28"
        >
          <div className="max-w-7xl mx-auto px-6 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div
                style={
                  {
                    backgroundImage:
                      'radial-gradient(circle at 12% 15%, rgba(56, 189, 248, 0.14), transparent 50%), radial-gradient(circle at 88% 85%, rgba(242, 183, 5, 0.11), transparent 50%), linear-gradient(165deg, rgba(21, 25, 41, 0.96) 0%, rgba(12, 15, 25, 0.98) 100%)',
                    '--glow-color': 'rgba(56, 189, 248, 0.16)',
                    '--glow-hover': 'rgba(56, 189, 248, 0.28)',
                  } as React.CSSProperties
                }
                className="lg:col-span-7 interactive-card card-glow-surface bg-[#11131E] border border-[#38BDF8]/40 hover:border-[#38BDF8]/75 rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="text-xs font-editorial italic text-[#38BDF8]">
                    02. About Me
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F4F4F6] text-balance">
                    Aryan Singh — Building Useful Software &amp; Exploring Practical AI
                  </h2>
                  <p className="text-sm sm:text-base text-[#D4D4D8] leading-relaxed">
                    I am <span className="text-[#F4F4F6] font-semibold">Aryan Singh</span> (
                    <span className="font-mono text-xs text-[#F2B705]">@{profile.login}</span>), an
                    AI enthusiast and software developer who enjoys turning everyday ideas into
                    working web, desktop, and Android applications.
                  </p>
                  <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                    My focus is on building practical software people can use right away—from
                    local-first study and exam preparation workspaces (
                    <span className="text-[#F2B705]">StudyOS</span> and{' '}
                    <span className="text-[#38BDF8]">JEE-OS</span>) and quota-resilient media
                    platforms (<span className="text-[#FB7185]">MyTube</span> and{' '}
                    <span className="text-[#C084FC]">ANIME_FRONTIER</span>) to native Android
                    utilities (<span className="text-[#34D399]">Split-screen-</span>) and
                    responsive web portals (<span className="text-[#22D3EE]">coaching-centre</span>).
                  </p>

                  {/* Core Engineering Principles Grid with Subtle Subcard Glow */}
                  <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div
                      style={{ '--subcard-glow': 'rgba(242, 183, 5, 0.22)' } as React.CSSProperties}
                      className="subcard-glow-surface p-4 rounded-xl bg-[#090B11] border border-[#F2B705]/35 hover:border-[#F2B705]/70 space-y-1"
                    >
                      <div className="text-xs font-mono text-[#F2B705] font-semibold">
                        Local-First Data
                      </div>
                      <div className="text-xs text-[#A1A1AA] leading-relaxed">
                        Offline-ready IndexedDB &amp; localStorage stores with portable{' '}
                        <span className="font-mono text-[#F4F4F6]">.studyos</span> backups.
                      </div>
                    </div>

                    <div
                      style={{ '--subcard-glow': 'rgba(56, 189, 248, 0.22)' } as React.CSSProperties}
                      className="subcard-glow-surface p-4 rounded-xl bg-[#090B11] border border-[#38BDF8]/35 hover:border-[#38BDF8]/70 space-y-1"
                    >
                      <div className="text-xs font-mono text-[#38BDF8] font-semibold">
                        Resilient AI &amp; APIs
                      </div>
                      <div className="text-xs text-[#A1A1AA] leading-relaxed">
                        Multi-key rotation across Gemini and YouTube APIs to prevent quota downtime.
                      </div>
                    </div>

                    <div
                      style={{ '--subcard-glow': 'rgba(52, 211, 153, 0.22)' } as React.CSSProperties}
                      className="subcard-glow-surface p-4 rounded-xl bg-[#090B11] border border-[#34D399]/35 hover:border-[#34D399]/70 space-y-1"
                    >
                      <div className="text-xs font-mono text-[#34D399] font-semibold">
                        Multi-Runtime Builds
                      </div>
                      <div className="text-xs text-[#A1A1AA] leading-relaxed">
                        Web SPAs packaged for Windows (Electron NSIS) and Android (Capacitor &amp; Kotlin).
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-[#232738] flex flex-wrap items-center justify-between gap-4 text-xs text-[#A1A1AA]">
                  <div className="flex flex-wrap items-center gap-2 font-mono">
                    <span className="text-[#38BDF8]">Role:</span>
                    <span className="text-[#F4F4F6]">AI Enthusiast &amp; Software Developer</span>
                  </div>
                  <a
                    href={profile.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundEngine.playClick()}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="inline-flex items-center gap-1.5 font-semibold text-[#F2B705] hover:underline"
                  >
                    <span>github.com/{profile.login}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Developer Interests Column with Ambient Radial Gradients & Glows */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                {DEVELOPER_INTEREST_AREAS.map((interest) => (
                  <div
                    key={interest.number}
                    style={
                      {
                        borderColor: `${interest.accent}50`,
                        backgroundImage: `radial-gradient(circle at 90% 15%, ${interest.accent}18, transparent 55%), linear-gradient(165deg, rgba(21, 25, 41, 0.96) 0%, rgba(12, 15, 25, 0.98) 100%)`,
                        '--glow-color': `${interest.accent}24`,
                        '--glow-hover': `${interest.accent}42`,
                      } as React.CSSProperties
                    }
                    className="interactive-card card-glow-surface flex-1 bg-[#11131E] border rounded-2xl p-6 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div
                        className="text-xs font-mono font-semibold"
                        style={{ color: interest.accent }}
                      >
                        Focus Area {interest.number}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#F4F4F6]">
                        {interest.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                        {interest.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#232738] text-[11px] font-mono text-[#94A3B8]">
                      Projects: <span className="text-[#F4F4F6]">{interest.evidence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Skills & Technologies with Category Glow Surfaces */}
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                  <div className="text-xs font-editorial italic text-[#C084FC]">
                    Technical Stack
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#F4F4F6]">
                    Skills &amp; Technologies
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-md leading-relaxed">
                  Languages, frameworks, APIs, and runtimes actively used across my public projects.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {VERIFIED_SKILL_CATEGORIES.map((group) => (
                  <div
                    key={group.category}
                    style={
                      {
                        borderColor: `${group.accent}48`,
                        backgroundImage: `radial-gradient(circle at 88% 12%, ${group.accent}16, transparent 52%), linear-gradient(165deg, rgba(21, 25, 41, 0.96) 0%, rgba(12, 15, 25, 0.98) 100%)`,
                        '--glow-color': `${group.accent}22`,
                        '--glow-hover': `${group.accent}40`,
                      } as React.CSSProperties
                    }
                    className="interactive-card card-glow-surface bg-[#11131E] border rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-1.5">
                      <h4
                        className="text-lg font-bold flex items-center justify-between gap-2"
                        style={{ color: group.accent }}
                      >
                        <span>{group.category}</span>
                        <span className="text-xs font-mono text-[#94A3B8]">
                          {group.items.length} technologies
                        </span>
                      </h4>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">{group.summary}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {group.items.map((tech) => (
                        <div
                          key={tech.name}
                          style={
                            {
                              '--subcard-glow': `${group.accent}30`,
                            } as React.CSSProperties
                          }
                          className="subcard-glow-surface p-3.5 rounded-xl bg-[#090B11] border border-[#232738] hover:border-[#38BDF8]/55"
                        >
                          <div className="text-xs sm:text-sm font-semibold text-[#F4F4F6]">
                            {tech.name}
                          </div>
                          <div
                            className="text-[11px] font-mono mt-1 truncate"
                            style={{ color: group.accent }}
                            title={tech.repos}
                          >
                            {tech.repos}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03 — Interactive Architecture Demos */}
        <InteractiveSandboxLab />

        {/* SECTION 04 — Contact & GitHub Call to Action */}
        <section id="contact" className="border-t border-[#232738] py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <div
              className="bg-[#11131E] border border-[#38BDF8]/40 rounded-2xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 15% 20%, rgba(242, 183, 5, 0.12), transparent 45%), radial-gradient(circle at 85% 80%, rgba(56, 189, 248, 0.14), transparent 50%)',
              }}
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="text-xs font-editorial italic text-[#F2B705]">
                  04. Connect &amp; Collaborate
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F4F6] text-balance">
                  Explore My Code on GitHub or Get in Touch
                </h2>
                <p className="text-sm sm:text-base text-[#D4D4D8] max-w-2xl leading-relaxed">
                  Interested in inspecting source code, discussing AI-powered workflows, or
                  collaborating on web, desktop, or Android software? Visit my GitHub profile,
                  message me on Telegram (
                  <span className="font-mono text-[#38BDF8]">{profile.telegramHandle}</span>), or
                  reach out directly by email.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-wrap items-center lg:justify-end gap-3.5">
                <a
                  href="https://github.com/patelaryan567567-prog"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEngine.playClick()}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="interactive-btn inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#06070B] bg-gradient-to-r from-[#F2B705] to-[#F59E0B] rounded-xl hover:brightness-110 whitespace-nowrap shrink-0"
                >
                  <span>Visit GitHub Profile</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={profile.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEngine.playClick()}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="interactive-btn inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#06070B] bg-[#38BDF8] rounded-xl hover:bg-[#0EA5E9] whitespace-nowrap shrink-0"
                >
                  <span>Telegram {profile.telegramHandle}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${profile.email}`}
                  onClick={() => soundEngine.playClick()}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="interactive-btn inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium text-[#F4F4F6] bg-[#090B11] border border-[#34D399]/50 rounded-xl hover:border-[#34D399] whitespace-nowrap shrink-0"
                >
                  <span>Email {profile.email}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#34D399]" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Professional Footer */}
      <footer className="border-t border-[#232738] bg-[#080A11] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div className="flex flex-wrap items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#F2B705]" />
            <span className="text-[#F4F4F6] font-semibold">{profile.name}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[#38BDF8]">@{profile.login}</span>
            <span aria-hidden="true">·</span>
            <span>AI Enthusiast &amp; Software Developer</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href={profile.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playClick()}
              className="hover:text-[#F2B705] transition-colors"
            >
              GitHub
            </a>
            <a
              href={profile.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playClick()}
              className="hover:text-[#38BDF8] transition-colors"
            >
              Telegram ({profile.telegramHandle})
            </a>
            <a
              href={`mailto:${profile.email}`}
              onClick={() => soundEngine.playClick()}
              className="hover:text-[#34D399] transition-colors"
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={toggleSound}
              className="inline-flex items-center gap-1.5 text-[#94A3B8] hover:text-[#F4F4F6] transition-colors cursor-pointer"
              aria-label="Toggle UI sound effects"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-[#F2B705]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
              <span>{soundEnabled ? 'Sound On' : 'Muted'}</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Project Details, README & File Tree Lightbox Modal */}
      <RepositoryLightboxModal
        repo={activeModalRepo}
        onClose={() => setActiveModalRepo(null)}
      />
    </div>
  );
}
