export interface RepoLanguageMap {
  [language: string]: number;
}

export interface RepoCommit {
  sha: string;
  message: string;
  date: string;
  author: string;
}

export interface RepoFileItem {
  name: string;
  type: 'file' | 'dir';
  path: string;
}

export interface EnrichedRepository {
  id: number;
  name: string;
  displayName: string;
  officialReadmeTitle: string;
  kicker: string;
  tagline: string;
  architecturalSummary: string;
  readmeExcerpt: string;
  runCommands: string[];
  techStackList: string[];
  suggestedGithubDescription: string;
  primaryLanguage: 'TypeScript' | 'JavaScript' | 'Kotlin' | 'CSS';
  languages: RepoLanguageMap;
  totalBytes: number;
  sizeKb: number;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  htmlUrl: string;
  defaultBranch: string;
  runtimes: string[];
  bentoSpan: 'wide' | 'compact' | 'tall';
  shapeVariant: 'panoramic' | 'architectural' | 'console' | 'monolith';
  accentHex: string;
  files: RepoFileItem[];
  commits: RepoCommit[];
  keyHighlights: string[];
}

export interface GitHubUserProfile {
  login: string;
  id: number;
  name: string;
  bio: string;
  avatarUrl: string;
  htmlUrl: string;
  location: string;
  email: string;
  telegramHandle: string;
  telegramUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  createdAt: string;
  updatedAt: string;
}

export const INITIAL_USER_PROFILE: GitHubUserProfile = {
  login: 'patelaryan567567-prog',
  id: 247020754,
  name: 'Aryan Singh',
  bio: 'AI Enthusiast · Full-Stack & Android Developer · Building ideas into reality. Exploring AI, building useful apps, and creating tools that make everyday life smarter.',
  avatarUrl: 'https://avatars.githubusercontent.com/u/247020754?v=4',
  htmlUrl: 'https://github.com/patelaryan567567-prog',
  location: 'Bhabua, Kaimur, Bihar, India',
  email: 'aryansingh912805@gmail.com',
  telegramHandle: '@lone_Aryan',
  telegramUrl: 'http://t.me/lone_Aryan',
  publicRepos: 6,
  followers: 0,
  following: 0,
  createdAt: '2025-11-30T17:26:38Z',
  updatedAt: '2026-10-29T16:59:43Z',
};

export const INITIAL_REPOSITORIES: EnrichedRepository[] = [
  {
    id: 1323255287,
    name: 'study-os',
    displayName: 'StudyOS — Cross-Platform Academic & Focus Operating System',
    officialReadmeTitle: '# StudyOS (React 18 · TypeScript · Electron · Capacitor Android)',
    kicker: '01 · Flagship Multi-Runtime Workspace · Node.js >= 22.12.0',
    tagline:
      'Productivity workspace running across Web, Windows Electron Desktop, and Capacitor Android with native app-blocking, IndexedDB + Firebase sync, and a 3-key failover Gemini assistant.',
    architecturalSummary:
      'Engineered with 806.0 KB of TypeScript, Zustand state management, Chart.js telemetry, IndexedDB (idb) local-first persistence, and optional Firebase Authentication + Firestore sync. Features a native Android app-blocker service, Electron Windows signing pipeline, and a streaming AI study assistant that automatically rotates across up to 3 API keys upon quota/rate-limit errors.',
    readmeExcerpt: `StudyOS is a React, TypeScript, and Vite productivity workspace for studying. It runs as a browser application and includes Electron and Capacitor Android wrappers.

## Features
- Dashboard, planner, tasks, lectures, modules tracker, backlog, revision, notes, calendar, reminders, and profile views.
- Focus/Pomodoro timer, statistics, XP/gamification, charts, command palette, keyboard shortcuts, themes, and accessibility/reduced-motion preferences.
- Browser-local persistence with IndexedDB/local storage, with optional Firebase Authentication and Firestore profile/data sync.
- Gemini study assistant with image attachments, streaming replies, contextual study data, up to three user-provided keys, and automatic rotation after quota/rate-limit failures.
- Android-only app blocker support using the included native Android service code.`,
    runCommands: ['npm install', 'npm run dev', 'npx cap sync android', 'npm run build'],
    techStackList: [
      'React 18',
      'TypeScript',
      'Vite 8',
      'Zustand',
      'Chart.js',
      'IndexedDB (idb)',
      'Firebase Firestore',
      'Electron',
      'Capacitor Android',
    ],
    suggestedGithubDescription:
      'Cross-platform academic operating system with React, TypeScript, Electron, Capacitor Android app-blocker, IndexedDB + Firebase sync, and 3-key AI failover.',
    primaryLanguage: 'TypeScript',
    languages: {
      TypeScript: 805995,
      JavaScript: 50705,
      Java: 45170,
      CSS: 20654,
      Batchfile: 3127,
      PowerShell: 2272,
      HTML: 458,
    },
    totalBytes: 928381,
    sizeKb: 1724,
    createdAt: '2026-08-04T18:21:27Z',
    updatedAt: '2026-10-29T16:59:35Z',
    pushedAt: '2026-10-29T16:59:35Z',
    htmlUrl: 'https://github.com/patelaryan567567-prog/study-os',
    defaultBranch: 'main',
    runtimes: ['Electron Windows', 'Capacitor Android', 'Firebase Cloud', 'IndexedDB Local'],
    bentoSpan: 'wide',
    shapeVariant: 'panoramic',
    accentHex: '#F2B705',
    files: [
      { name: 'android', type: 'dir', path: 'android' },
      { name: 'electron', type: 'dir', path: 'electron' },
      { name: 'src', type: 'dir', path: 'src' },
      { name: 'scripts', type: 'dir', path: 'scripts' },
      { name: 'README.md', type: 'file', path: 'README.md' },
      { name: 'capacitor.config.ts', type: 'file', path: 'capacitor.config.ts' },
      { name: 'firebase.json', type: 'file', path: 'firebase.json' },
      { name: 'firestore.rules', type: 'file', path: 'firestore.rules' },
      { name: 'focusClock.original.ts', type: 'file', path: 'focusClock.original.ts' },
      { name: 'Fix-StudyOS-Blocker.bat', type: 'file', path: 'Fix-StudyOS-Blocker.bat' },
      { name: 'DOCUMENTATION.md', type: 'file', path: 'DOCUMENTATION.md' },
      { name: 'package.json', type: 'file', path: 'package.json' },
    ],
    commits: [
      {
        sha: 'f49e21a',
        message: 'docs: update comprehensive StudyOS README with architecture, Firebase predev hook, and Android/Electron workflows',
        date: '2026-10-29T16:59:35Z',
        author: 'Aryan Singh',
      },
      {
        sha: 'a8f4c21',
        message: 'Initial commit: Full cross-platform Study-OS workspace with Electron, Android Capacitor & Firestore rules',
        date: '2026-09-23T14:23:07Z',
        author: 'Aryan Singh',
      },
    ],
    keyHighlights: [
      '12 integrated academic views: Dashboard, Planner, Tasks, Lectures, Modules Tracker, Backlog, Revision, Notes, Calendar, Reminders, Analytics & Profile',
      'Resilient 3-key AI assistant rotation engine that automatically switches keys on rate-limit or quota errors',
      'Native Android Java app-blocker service paired with Electron desktop packaging and IndexedDB offline-first storage',
    ],
  },
  {
    id: 1419820114,
    name: 'JEE-OS',
    displayName: 'JEE OS — Class 11–12 Competitive Exam Workspace',
    officialReadmeTitle: '# JEE OS / StudyOS (React 19 · Express · Electron NSIS)',
    kicker: '02 · Local-First Exam Engine · .studyos Backup Protocol',
    tagline:
      'Specialized Class 11–12 JEE preparation suite with chapter tracking, XP/streak telemetry, exportable .studyos encrypted-free backups, Mammoth DOCX parsing, and an Express AI proxy.',
    architecturalSummary:
      'Built on React 19, TypeScript (680.5 KB), Vite 8, Tailwind CSS, and Motion. Combines an Express server (server.ts) running via tsx with @google/genai and Mammoth for document/image analysis, Markdown/LaTeX math rendering, and client-side planner execution. Packages into a native Windows NSIS desktop installer via electron-builder.',
    readmeExcerpt: `JEE OS is a local-first React workspace for Class 11–12 students preparing for the JEE. It combines planning, timers, subject and chapter tracking, practice records, reminders, analytics, backups, and an optional Gemini-powered study assistant.

## Features
- Dashboard; task, lecture, question-practice, subject, backlog, reminder, analytics, and settings views.
- Study timer, XP/streak-style progress data, chapter tracking, and a structured local data store backed by IndexedDB.
- Exportable .studyos backups with validation, legacy migration, merge support, and explicit omission of API keys.
- AI chat with selectable personas, uploaded image/document support, Markdown/math rendering, and client-side execution of supported planner actions.
- Electron configuration for a Windows NSIS installer.`,
    runCommands: ['npm install', 'npm run dev', 'npm run build:desktop'],
    techStackList: [
      'React 19',
      'TypeScript',
      'Vite 8',
      'Express (server.ts)',
      'Mammoth DOCX',
      'IndexedDB',
      'Electron NSIS',
      'Motion',
    ],
    suggestedGithubDescription:
      'Local-first React 19 & TypeScript workspace for JEE Class 11–12 preparation with .studyos backup migration, Express backend, and Electron NSIS desktop installer.',
    primaryLanguage: 'TypeScript',
    languages: {
      TypeScript: 680457,
      JavaScript: 2090,
      HTML: 1770,
      CSS: 645,
    },
    totalBytes: 684962,
    sizeKb: 685,
    createdAt: '2026-10-29T15:58:40Z',
    updatedAt: '2026-10-29T16:59:50Z',
    pushedAt: '2026-10-29T16:59:50Z',
    htmlUrl: 'https://github.com/patelaryan567567-prog/JEE-OS',
    defaultBranch: 'main',
    runtimes: ['Express server.ts', 'Electron NSIS', 'React 19 + Vite 8', 'IndexedDB Store'],
    bentoSpan: 'wide',
    shapeVariant: 'architectural',
    accentHex: '#3B82F6',
    files: [
      { name: 'electron', type: 'dir', path: 'electron' },
      { name: 'src', type: 'dir', path: 'src' },
      { name: 'README.md', type: 'file', path: 'README.md' },
      { name: 'server.ts', type: 'file', path: 'server.ts' },
      { name: 'bun.lock', type: 'file', path: 'bun.lock' },
      { name: 'package.json', type: 'file', path: 'package.json' },
      { name: 'tsconfig.json', type: 'file', path: 'tsconfig.json' },
      { name: 'vite.config.ts', type: 'file', path: 'vite.config.ts' },
    ],
    commits: [
      {
        sha: 'b12d89c',
        message: 'docs: add detailed JEE OS README covering .studyos backup validation, Express server.ts proxy, and NSIS desktop builds',
        date: '2026-10-29T16:59:50Z',
        author: 'Aryan Singh',
      },
      {
        sha: '9d31e0b',
        message: 'Initial commit: JEE-OS desktop and web application architecture',
        date: '2026-10-29T16:26:04Z',
        author: 'Aryan Singh',
      },
    ],
    keyHighlights: [
      'Custom .studyos backup format with schema validation, legacy migration, merge conflict resolution, and automatic credential stripping',
      'Server-side Express + Mammoth pipeline parsing uploaded documents and images with math/Markdown rendering',
      'Client-side planner action execution triggered directly from structured study personas',
    ],
  },
  {
    id: 1219483012,
    name: 'MyTube',
    displayName: 'MyTube — React 19 Video Platform with 8-Key Quota Failover',
    officialReadmeTitle: '# MyTube (React 19 · React Router 7 · Vite 8 · YouTube API v3)',
    kicker: '03 · High-Availability Streaming SPA · Multi-Key Rotation',
    tagline:
      'YouTube Data API v3 client engineered with React 19, Google OAuth 2.0, in-memory response caching, and automatic failover across up to 8 API keys on quota exhaustion.',
    architecturalSummary:
      'Constructed with React 19, React Router 7, Vite 8, Axios, @react-oauth/google, and jwt-decode. Features dedicated keys for Home (VITE_API_HOME), Search (VITE_API_SEARCH), and Video playback (VITE_API_VIDEO) plus 7 automatic fallback keys (VITE_API_EXTRA through VITE_API_EXTRA7) that seamlessly retry requests whenever quotaExceeded or dailyLimitExceeded occurs.',
    readmeExcerpt: `MyTube is a YouTube-style single-page client built with React 19 and Vite. It obtains public video, channel, playlist, and comment data from YouTube Data API v3, embeds YouTube videos, and provides a browser-local library with Google sign-in UI.

## Features
- Home feed of popular videos for India, category filtering, infinite scroll, and a Shorts shelf limited to videos up to 60 seconds.
- Video watch pages with embedded playback, related videos, timestamps, comments, sharing, likes, Watch Later, and channel subscription controls.
- Dedicated Trending, Shorts, Subscriptions, Watch Later, Liked Videos, Playlist, and "You" routes.
- In-memory API-response caching and automatic API-key failover on YouTube quota errors (up to 7 extra fallback keys).`,
    runCommands: ['npm install', 'npm run dev', 'npm run build', 'npm run lint'],
    techStackList: [
      'React 19',
      'React Router 7',
      'Vite 8',
      'Axios',
      '@react-oauth/google',
      'jwt-decode',
      'YouTube Data API v3',
      'Netlify SPA',
    ],
    suggestedGithubDescription:
      'React 19 & Vite 8 YouTube client featuring Google OAuth, Shorts <=60s filtering, in-memory caching, and automatic multi-key API quota failover.',
    primaryLanguage: 'JavaScript',
    languages: {
      JavaScript: 98649,
      CSS: 4778,
      HTML: 1046,
    },
    totalBytes: 104473,
    sizeKb: 185,
    createdAt: '2026-03-23T05:16:45Z',
    updatedAt: '2026-10-29T16:59:21Z',
    pushedAt: '2026-10-29T16:59:21Z',
    htmlUrl: 'https://github.com/patelaryan567567-prog/MyTube',
    defaultBranch: 'main',
    runtimes: ['React 19 SPA', 'YouTube API v3', 'Google OAuth 2.0', 'Netlify Edge'],
    bentoSpan: 'compact',
    shapeVariant: 'console',
    accentHex: '#F43F5E',
    files: [
      { name: 'public', type: 'dir', path: 'public' },
      { name: 'src', type: 'dir', path: 'src' },
      { name: 'README.md', type: 'file', path: 'README.md' },
      { name: 'netlify.toml', type: 'file', path: 'netlify.toml' },
      { name: 'eslint.config.js', type: 'file', path: 'eslint.config.js' },
      { name: 'vite.config.js', type: 'file', path: 'vite.config.js' },
      { name: 'package.json', type: 'file', path: 'package.json' },
    ],
    commits: [
      {
        sha: 'd902a14',
        message: 'docs: document multi-key YouTube API quota failover architecture and React 19 routes in README',
        date: '2026-10-29T16:59:21Z',
        author: 'Aryan Singh',
      },
      {
        sha: 'e519c38',
        message: 'Polish UI: English copy, new fonts, shared components, bug fixes',
        date: '2026-10-29T10:02:49Z',
        author: 'Aryan Singh',
      },
    ],
    keyHighlights: [
      'Automatic API key rotation ring (VITE_API_HOME/SEARCH/VIDEO + VITE_API_EXTRA..7) on quotaExceeded',
      'India region popular feed, infinite scroll, and strict <=60s duration filter for the Shorts shelf',
      'Google OAuth 2.0 JWT decoding with persistent local Watch Later, Liked Videos, and per-video comments',
    ],
  },
  {
    id: 1388104921,
    name: 'Split-screen-',
    displayName: 'SplitMe Modern — Native Kotlin 2.0.21 Android SDK 35 Utility',
    officialReadmeTitle: '# SplitMe Modern (Kotlin 2.0.21 · Android SDK 35 · AGP 8.7.3)',
    kicker: '04 · Zero-Permission Native Android System Tile · Gradle 8.9',
    tagline:
      'Modernized Android Quick Settings tile & AccessibilityService written in Kotlin 2.0.21 targeting Android 15 (SDK 35) with zero internet permissions.',
    architecturalSummary:
      'Packaged under extracted/splitme-master using Android Gradle Plugin 8.7.3, Gradle 8.9, Kotlin 2.0.21, Java 17, minSdk 28, and targetSdk 35. Registers a Quick Settings tile that invokes GLOBAL_ACTION_TOGGLE_SPLIT_SCREEN directly inside the AccessibilityService while keeping tile active state strictly synchronized with OS multi-window confirmation.',
    readmeExcerpt: `This repository packages a modernized Android implementation of SplitMe under extracted/splitme-master. The app adds a Quick Settings tile that asks Android to perform its built-in split-screen toggle through an Accessibility Service.

## What it does
- Provides a setup screen that takes the user to Accessibility settings after a permission disclosure.
- Registers a Quick Settings tile labelled Split Screen.
- When the tile is tapped, the enabled Accessibility Service calls Android's GLOBAL_ACTION_TOGGLE_SPLIT_SCREEN action.
- Does not request Internet access or implement a custom multi-window system.

## Requirements
- Android Studio with JDK 17 · Android SDK Platform 35 · AGP 8.7.3 · Gradle 8.9 · Kotlin 2.0.21 · minSdk 28.`,
    runCommands: [
      'cd extracted/splitme-master',
      './gradlew assembleDebug',
      'adb install app/build/outputs/apk/debug/app-debug.apk',
    ],
    techStackList: [
      'Kotlin 2.0.21',
      'Android SDK 35',
      'AGP 8.7.3',
      'Gradle 8.9',
      'JDK 17',
      'AccessibilityService',
      'TileService API',
    ],
    suggestedGithubDescription:
      'Modernized Kotlin 2.0.21 Android Quick Settings tile (targetSdk 35) that triggers native split-screen via AccessibilityService with zero internet permissions.',
    primaryLanguage: 'Kotlin',
    languages: {
      Kotlin: 10535,
    },
    totalBytes: 10535,
    sizeKb: 159,
    createdAt: '2026-10-18T19:33:07Z',
    updatedAt: '2026-10-29T16:59:30Z',
    pushedAt: '2026-10-29T16:59:30Z',
    htmlUrl: 'https://github.com/patelaryan567567-prog/Split-screen-',
    defaultBranch: 'main',
    runtimes: ['Android SDK 35', 'Kotlin 2.0.21', 'Gradle 8.9', 'AccessibilityService'],
    bentoSpan: 'compact',
    shapeVariant: 'monolith',
    accentHex: '#10B981',
    files: [
      { name: '.github', type: 'dir', path: '.github' },
      { name: 'extracted', type: 'dir', path: 'extracted' },
      { name: 'README.md', type: 'file', path: 'README.md' },
    ],
    commits: [
      {
        sha: '7c2e914',
        message: 'Keep tile state separate from split-screen toggle result',
        date: '2026-10-23T17:27:50Z',
        author: 'Aryan Singh',
      },
      {
        sha: '4b19a02',
        message: 'Do not mark split-screen tile active before system state confirms it',
        date: '2026-10-22T14:12:19Z',
        author: 'Aryan Singh',
      },
      {
        sha: '1f08d77',
        message: 'Handle split-screen toggle directly in accessibility service',
        date: '2026-10-20T11:05:44Z',
        author: 'Aryan Singh',
      },
    ],
    keyHighlights: [
      'Upgraded to Android SDK Platform 35, Kotlin 2.0.21, Gradle 8.9, and JDK 17',
      'Privacy-first architecture: requests zero internet permissions and uses native GLOBAL_ACTION_TOGGLE_SPLIT_SCREEN',
      'Decouples Quick Settings tile state from toggle dispatch until OS confirms multi-window state',
    ],
  },
  {
    id: 1217004819,
    name: 'ANIME_FRONTIER',
    displayName: 'AnimeFrontier — Jikan REST API & Multi-Stream Discovery Portal',
    officialReadmeTitle: '# AnimeFrontier (Jikan API · YouTube Trailers · PWA)',
    kicker: '05 · Zero-Build Anime Discovery Engine · 221.6 KB Bundle',
    tagline:
      'Browser-native anime discovery portal integrating the Jikan REST API for live series, movies, characters, and episode lists with trailer lookup and custom opening animations.',
    architecturalSummary:
      'Built with 131.1 KB of plain JavaScript, 46.5 KB of HTML, and 44.0 KB of CSS without build-step overhead. Queries the public Jikan v4 REST API for fan favorites, characters, and episodes, launches YouTube trailers, routes to catalogue platforms, and persists watchlists and themes in localStorage.',
    readmeExcerpt: `AnimeFrontier is a browser-only anime discovery portal. It presents popular TV series and movies, search, detail and episode views, trailers, a personal watchlist, and an in-page AI chat interface.

## Features
- Populates fan favourites, series, movies, search results, anime details, characters, and episode lists from the public Jikan API.
- Opens trailers through YouTube search and links viewers to supported streaming and catalogue sites from the selection modal.
- Supports a theme switcher, responsive grid layouts, client-side navigation overlays, and a locally saved watchlist.`,
    runCommands: ['npx serve .', '# Open http://localhost:3000/open-animation.html'],
    techStackList: [
      'Vanilla JavaScript (131 KB)',
      'Jikan REST API',
      'YouTube Data API',
      'Tailwind CDN',
      'Web App Manifest',
      'LocalStorage Engine',
    ],
    suggestedGithubDescription:
      'Browser-native anime discovery portal powered by the Jikan REST API with episode guides, character rosters, YouTube trailer modals, and local watchlists.',
    primaryLanguage: 'JavaScript',
    languages: {
      JavaScript: 131093,
      HTML: 46531,
      CSS: 44002,
    },
    totalBytes: 221626,
    sizeKb: 258,
    createdAt: '2026-03-21T09:07:57Z',
    updatedAt: '2026-10-29T16:59:26Z',
    pushedAt: '2026-10-29T16:59:26Z',
    htmlUrl: 'https://github.com/patelaryan567567-prog/ANIME_FRONTIER',
    defaultBranch: 'main',
    runtimes: ['Jikan REST API', 'Vanilla JS Engine', 'Web App Manifest'],
    bentoSpan: 'compact',
    shapeVariant: 'console',
    accentHex: '#A855F7',
    files: [
      { name: 'README.md', type: 'file', path: 'README.md' },
      { name: 'index.html', type: 'file', path: 'index.html' },
      { name: 'open-animation.html', type: 'file', path: 'open-animation.html' },
      { name: 'redirect.html', type: 'file', path: 'redirect.html' },
      { name: 'script.js', type: 'file', path: 'script.js' },
      { name: 'style.css', type: 'file', path: 'style.css' },
      { name: 'site.webmanifest', type: 'file', path: 'site.webmanifest' },
    ],
    commits: [
      {
        sha: 'c48a109',
        message: 'docs: add AnimeFrontier README detailing Jikan API integration, features, and security notes',
        date: '2026-10-29T16:59:26Z',
        author: 'Aryan Singh',
      },
      {
        sha: '3a88f10',
        message: 'Add files via upload',
        date: '2026-10-29T15:55:10Z',
        author: 'Aryan Singh',
      },
    ],
    keyHighlights: [
      'Live Jikan REST API integration fetching anime metadata, character rosters, and episode breakdowns',
      'Choreographed open-animation.html entry sequence and multi-provider streaming selector modal',
      'Zero-bundler static architecture deployable on any edge CDN with 512x512 PWA manifest support',
    ],
  },
  {
    id: 1230918442,
    name: 'coaching-centre',
    displayName: 'BrightPath Coaching Centre — JEE, NEET & UPSC Institute Portal',
    officialReadmeTitle: '# BrightPath Coaching Centre (Interactive Fee Calculator & Enquiry Flow)',
    kicker: '06 · Educational Web Platform · Bhabua, Kaimur, Bihar 821101',
    tagline:
      'Comprehensive promotional & admissions platform for BrightPath Coaching Centre featuring JEE, NEET, Class 6–10 Foundation, and UPSC programmes with an embedded fee calculator.',
    architecturalSummary:
      'Engineered with 44.4 KB of custom CSS, 32.4 KB of semantic HTML, and 29.7 KB of vanilla JavaScript. Features client-rendered programme views (JEE, NEET, Foundation, UPSC), a dynamic tuition fee & scholarship calculator, filterable exam topper cards, localStorage review moderation (report/hide state), and a validated 10-digit WhatsApp admissions bridge.',
    readmeExcerpt: `BrightPath Coaching Centre is a responsive, one-page promotional website for an Indian exam-preparation coaching centre. It showcases courses, outcomes, FAQs, fees, testimonials, and a WhatsApp-based enquiry flow.

## What the site includes
- Course cards and detailed client-rendered pages for JEE, NEET, Class 6–10 Foundation, and UPSC Civil Services programmes.
- A fee calculator using the fee tables embedded in script.js.
- Filterable topper cards, accordions for FAQs, a mobile navigation menu, and light/dark theme preference.
- A review dialog that saves submitted reviews and report/hide state in localStorage.
- A contact form that validates a 10-digit phone number and opens a prefilled WhatsApp conversation.`,
    runCommands: ['npx serve .', '# Zero build step required — open index.html via HTTP server'],
    techStackList: [
      'Custom CSS3 (44.4 KB)',
      'Semantic HTML5 (32.4 KB)',
      'Vanilla JS (29.7 KB)',
      'Interactive Fee Engine',
      'WhatsApp URL Bridge',
      'LocalStorage Reviews',
    ],
    suggestedGithubDescription:
      'Responsive admissions & course portal for BrightPath Coaching Centre (JEE, NEET, Foundation, UPSC) with interactive fee calculator and WhatsApp enquiry flow.',
    primaryLanguage: 'CSS',
    languages: {
      CSS: 44406,
      HTML: 32370,
      JavaScript: 29698,
    },
    totalBytes: 106474,
    sizeKb: 116,
    createdAt: '2026-04-01T12:20:03Z',
    updatedAt: '2026-10-29T16:59:43Z',
    pushedAt: '2026-10-29T16:59:43Z',
    htmlUrl: 'https://github.com/patelaryan567567-prog/coaching-centre',
    defaultBranch: 'main',
    runtimes: ['BrightPath Portal', 'Fee Calculator Engine', 'WhatsApp API Bridge'],
    bentoSpan: 'compact',
    shapeVariant: 'monolith',
    accentHex: '#06B6D4',
    files: [
      { name: 'README.md', type: 'file', path: 'README.md' },
      { name: 'favicon.svg', type: 'file', path: 'favicon.svg' },
      { name: 'index.html', type: 'file', path: 'index.html' },
      { name: 'script.js', type: 'file', path: 'script.js' },
      { name: 'style.css', type: 'file', path: 'style.css' },
    ],
    commits: [
      {
        sha: '91e7c02',
        message: 'docs: add BrightPath Coaching Centre README detailing JEE/NEET/UPSC courses, fee calculator, and WhatsApp flow',
        date: '2026-10-29T16:59:43Z',
        author: 'Aryan Singh',
      },
      {
        sha: '6f20c99',
        message: 'Add favicon and fix console errors',
        date: '2026-04-01T15:44:15Z',
        author: 'Aryan Singh',
      },
      {
        sha: '5a11e83',
        message: 'Update address: Patel Chowk, Bhabua Road, Bhabua, Kaimur, Bihar 821101',
        date: '2026-04-01T14:19:02Z',
        author: 'Aryan Singh',
      },
    ],
    keyHighlights: [
      'Client-rendered curriculum tracks for JEE, NEET, Class 6–10 Foundation, and UPSC Civil Services',
      'Embedded interactive fee calculator and filterable hall-of-fame topper showcase',
      'Validated 10-digit phone number parser dispatching prefilled WhatsApp admissions enquiries',
    ],
  },
];

export const AGGREGATE_LANGUAGE_STATS = [
  { language: 'TypeScript', bytes: 1486452, share: '72.3%', repos: 2, role: 'StudyOS & JEE OS Full-Stack Engines' },
  { language: 'JavaScript', bytes: 312235, share: '15.2%', repos: 5, role: 'MyTube React 19, AnimeFrontier & BrightPath' },
  { language: 'CSS', bytes: 114485, share: '5.6%', repos: 5, role: 'Bespoke Design Systems & Keyframe Layouts' },
  { language: 'HTML', bytes: 82175, share: '4.0%', repos: 5, role: 'Semantic Entry Points & PWA Shells' },
  { language: 'Java', bytes: 45170, share: '2.2%', repos: 1, role: 'StudyOS Native Android App-Blocker Service' },
  { language: 'Kotlin', bytes: 10535, share: '0.5%', repos: 1, role: 'SplitMe Modern Android SDK 35 TileService' },
  { language: 'Shell & Batch', bytes: 5399, share: '0.2%', repos: 1, role: 'Desktop Study Blocker & Build Scripts' },
];

export function formatBytes(bytes: number): string {
  if (bytes >= 1000000) {
    return `${(bytes / 1000000).toFixed(2)} MB`;
  }
  if (bytes >= 1000) {
    return `${(bytes / 1000).toFixed(1)} KB`;
  }
  return `${bytes} B`;
}

export function formatShortDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return isoDate;
  }
}
