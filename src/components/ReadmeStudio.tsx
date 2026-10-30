import React, { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { EnrichedRepository, GitHubUserProfile } from '../data/githubData';
import { soundEngine } from '../utils/soundEngine';

interface ReadmeStudioProps {
  profile: GitHubUserProfile;
  repos: EnrichedRepository[];
}

export const ReadmeStudio: React.FC<ReadmeStudioProps> = ({ profile, repos }) => {
  const [headlineRole, setHeadlineRole] = useState(
    'AI Enthusiast & Software Developer'
  );
  const [locationLine, setLocationLine] = useState('Bhabua, Kaimur, Bihar, India');
  const [currentFocus, setCurrentFocus] = useState(
    'Building StudyOS (Electron/Capacitor Academic OS), JEE-OS (React 19 + Express Exam Workspace), SplitMe Modern (Android SDK 35 Kotlin), and MyTube (React 19 Video Client)'
  );
  const [includeRepoTable, setIncludeRepoTable] = useState(true);
  const [includeTechStack, setIncludeTechStack] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatedMarkdown = `# Hi there, I'm ${profile.name} (@${profile.login})

**${headlineRole}**  
*Exploring AI, building useful apps, and creating tools that make everyday life smarter.*  
Location: ${locationLine} · Email: [${profile.email}](mailto:${profile.email}) · Telegram: [${profile.telegramHandle}](${profile.telegramUrl}) · GitHub: [github.com/${profile.login}](${profile.htmlUrl})

---

### Current Engineering Focus
- ${currentFocus}
- Designing local-first & cloud-synced workspaces with **React, TypeScript, Vite, IndexedDB, Electron, Capacitor, and Firebase Firestore**.
- Building resilient API clients and native **Kotlin (Android SDK 35)** utilities.

${
  includeTechStack
    ? `### Core Technical Stack
- **Languages:** TypeScript, JavaScript, Kotlin, Java, HTML5, CSS3
- **Runtimes & Frameworks:** React 18 & 19, React Router 7, Vite 8, Electron, Capacitor (Android), Node.js / Express (\`server.ts\`), Zustand, Chart.js
- **APIs & Cloud:** Firebase Auth & Firestore, Google Generative AI SDK, YouTube Data API v3, Jikan REST API`
    : ''
}

${
  includeRepoTable
    ? `### Public Repositories

| Repository | Project Title | Primary Stack | Summary |
| :--- | :--- | :--- | :--- |
${repos
  .map(
    (r) =>
      `| [**${r.name}**](${r.htmlUrl}) | ${r.displayName.split('—')[0].trim()} | ${r.primaryLanguage} · ${r.runtimes[0]} | ${r.suggestedGithubDescription} |`
  )
  .join('\n')}`
    : ''
}

---
*Generated from verified GitHub repository & README data for ${profile.name} ([@${profile.login}](${profile.htmlUrl})).*
`;

  const handleCopy = () => {
    soundEngine.playSuccess();
    navigator.clipboard?.writeText(generatedMarkdown)?.catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownload = () => {
    soundEngine.playSuccess();
    const blob = new Blob([generatedMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="readme-studio" className="py-20 md:py-28 border-t border-[#232329] bg-section-subtle">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-2.5">
            <div className="text-xs font-editorial italic text-[#F2B705]">
              07. Profile Monograph Generator · {profile.login}/{profile.login}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F4F4F6] text-balance">
              GitHub Profile README.md Studio
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA] max-w-2xl leading-relaxed">
              Generate a ready-to-commit top-level profile{' '}
              <span className="font-mono text-[#F4F4F6]">README.md</span> for{' '}
              <span className="font-mono text-[#F4F4F6]">{profile.login}/{profile.login}</span>{' '}
              using your verified repository data.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              onMouseEnter={() => soundEngine.playHover()}
              className="interactive-btn inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#070709] bg-[#F2B705] rounded-xl hover:bg-[#d9a404] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705] whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Markdown' : 'Copy Profile README.md'}</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              onMouseEnter={() => soundEngine.playHover()}
              className="interactive-btn inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-[#F4F4F6] bg-[#111116] border border-[#272732] rounded-xl hover:border-[#F2B705] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-[#111116] border border-[#272732] rounded-2xl p-6 sm:p-7 space-y-5">
            <div>
              <label htmlFor="readme-role" className="block text-xs font-medium text-[#A1A1AA] mb-2">
                Primary Role Headline
              </label>
              <input
                id="readme-role"
                type="text"
                value={headlineRole}
                onChange={(e) => setHeadlineRole(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-[#0B0C10] border border-[#232329] rounded-xl text-[#F4F4F6] focus:outline-none focus:border-[#F2B705]"
              />
            </div>

            <div>
              <label htmlFor="readme-location" className="block text-xs font-medium text-[#A1A1AA] mb-2">
                Location
              </label>
              <input
                id="readme-location"
                type="text"
                value={locationLine}
                onChange={(e) => setLocationLine(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-[#0B0C10] border border-[#232329] rounded-xl text-[#F4F4F6] focus:outline-none focus:border-[#F2B705]"
              />
            </div>

            <div>
              <label htmlFor="readme-focus" className="block text-xs font-medium text-[#A1A1AA] mb-2">
                Current Focus
              </label>
              <textarea
                id="readme-focus"
                rows={3}
                value={currentFocus}
                onChange={(e) => setCurrentFocus(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-[#0B0C10] border border-[#232329] rounded-xl text-[#F4F4F6] focus:outline-none focus:border-[#F2B705]"
              />
            </div>

            <div className="pt-4 border-t border-[#232329] space-y-3">
              <label className="flex items-center justify-between text-xs text-[#D4D4D8] cursor-pointer">
                <span>Include 6-Repository Table</span>
                <input
                  type="checkbox"
                  checked={includeRepoTable}
                  onChange={(e) => {
                    soundEngine.playClick();
                    setIncludeRepoTable(e.target.checked);
                  }}
                  className="accent-[#F2B705] w-4 h-4"
                />
              </label>
              <label className="flex items-center justify-between text-xs text-[#D4D4D8] cursor-pointer">
                <span>Include Technical Stack Breakdown</span>
                <input
                  type="checkbox"
                  checked={includeTechStack}
                  onChange={(e) => {
                    soundEngine.playClick();
                    setIncludeTechStack(e.target.checked);
                  }}
                  className="accent-[#F2B705] w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* Live Markdown Output Column */}
          <div className="lg:col-span-7 bg-[#111116] border border-[#272732] rounded-2xl overflow-hidden">
            <div className="px-6 py-3.5 border-b border-[#232329] bg-[#0B0C10] flex items-center justify-between text-xs font-mono text-[#8E8E99]">
              <span>{profile.login}/README.md</span>
              <span>{generatedMarkdown.length} chars · UTF-8</span>
            </div>
            <pre className="p-6 sm:p-7 text-xs font-mono text-[#D4D4D8] overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[460px] overflow-y-auto">
              {generatedMarkdown}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
