import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Folder, FileCode, Copy, Check, RefreshCw, ArrowLeft, BookOpen } from 'lucide-react';
import { EnrichedRepository, RepoFileItem, formatBytes, formatShortDate } from '../data/githubData';
import { ProjectVisualCanvas } from './ProjectVisuals';
import { soundEngine } from '../utils/soundEngine';

interface LightboxModalProps {
  repo: EnrichedRepository | null;
  onClose: () => void;
}

export const RepositoryLightboxModal: React.FC<LightboxModalProps> = ({ repo, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'readme' | 'files' | 'commits'>('overview');
  const [currentPath, setCurrentPath] = useState<string>('');
  const [directoryItems, setDirectoryItems] = useState<RepoFileItem[]>([]);
  const [loadingFiles, setLoadingFiles] = useState<boolean>(false);
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [loadingContent, setLoadingContent] = useState<boolean>(false);
  const [liveReadmeText, setLiveReadmeText] = useState<string>('');
  const [loadingReadme, setLoadingReadme] = useState<boolean>(false);
  const [copiedClone, setCopiedClone] = useState<boolean>(false);

  useEffect(() => {
    if (!repo) return;
    setActiveTab('overview');
    setCurrentPath('');
    setDirectoryItems(repo.files);
    setSelectedFilePath(null);
    setFileContent('');
    setLiveReadmeText(repo.readmeExcerpt);
  }, [repo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundEngine.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!repo) return null;

  const fetchLiveReadme = async () => {
    setLoadingReadme(true);
    soundEngine.playClick();
    try {
      const res = await fetch(
        `https://raw.githubusercontent.com/patelaryan567567-prog/${repo.name}/${repo.defaultBranch}/README.md`
      );
      if (res.ok) {
        const text = await res.text();
        setLiveReadmeText(text);
        soundEngine.playSuccess();
      }
    } catch {
      // Retain cached excerpt if offline
    } finally {
      setLoadingReadme(false);
    }
  };

  const fetchDirectory = async (path: string) => {
    setLoadingFiles(true);
    setSelectedFilePath(null);
    soundEngine.playClick();
    try {
      const url = path
        ? `https://api.github.com/repos/patelaryan567567-prog/${repo.name}/contents/${path}`
        : `https://api.github.com/repos/patelaryan567567-prog/${repo.name}/contents`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          const mapped: RepoFileItem[] = data.map((item: { name: string; type: string; path: string }) => ({
            name: item.name,
            type: item.type === 'dir' ? 'dir' : 'file',
            path: item.path,
          }));
          mapped.sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type === 'dir' ? -1 : 1));
          setDirectoryItems(mapped);
          setCurrentPath(path);
        }
      }
    } catch {
      // Retain baseline snapshot if offline
    } finally {
      setLoadingFiles(false);
    }
  };

  const inspectFile = async (item: RepoFileItem) => {
    if (item.type === 'dir') {
      await fetchDirectory(item.path);
      return;
    }
    soundEngine.playClick();
    setActiveTab('files');
    setSelectedFilePath(item.path);
    setLoadingContent(true);
    try {
      const rawUrl = `https://raw.githubusercontent.com/patelaryan567567-prog/${repo.name}/${repo.defaultBranch}/${item.path}`;
      const res = await fetch(rawUrl);
      if (res.ok) {
        const text = await res.text();
        setFileContent(text.slice(0, 14000));
        soundEngine.playSuccess();
      } else {
        setFileContent(`Unable to fetch raw file preview from ${rawUrl} (HTTP ${res.status}).`);
      }
    } catch {
      setFileContent(`Source preview unavailable offline. View directly on GitHub: ${repo.htmlUrl}/blob/${repo.defaultBranch}/${item.path}`);
    } finally {
      setLoadingContent(false);
    }
  };

  const handleCopyClone = () => {
    soundEngine.playSuccess();
    navigator.clipboard?.writeText(`git clone ${repo.htmlUrl}.git`)?.catch(() => {});
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const languageEntries = Object.entries(repo.languages) as [string, number][];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 sm:p-6 md:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-repo-title"
      onClick={() => {
        soundEngine.playClick();
        onClose();
      }}
    >
      <div
        className="relative w-full max-w-5xl bg-[#111116] border border-[#272732] rounded-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 sm:py-5 border-b border-[#232329] bg-[#0B0C10]">
          <div className="min-w-0">
            <div className="text-xs text-[#8E8E99] flex flex-wrap items-center gap-2">
              <span className="font-editorial italic text-[#F2B705]">{repo.kicker}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">patelaryan567567-prog/{repo.name}</span>
            </div>
            <h2 id="modal-repo-title" className="text-lg sm:text-xl md:text-2xl font-bold text-[#F4F4F6] tracking-tight truncate mt-1">
              {repo.displayName}
            </h2>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playClick()}
              className="interactive-btn inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-semibold text-[#070709] bg-[#F2B705] rounded-xl hover:bg-[#d9a404] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705] whitespace-nowrap shrink-0"
            >
              <span>Open on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              aria-label="Close modal"
              className="interactive-btn inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[#272732] text-[#A1A1AA] hover:text-[#F4F4F6] hover:border-[#F2B705] hover:bg-[#19191F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705] shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Tab Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-3 border-b border-[#232329] bg-[#0B0C10]/60">
          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#070709] border border-[#232329] rounded-xl" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'overview'}
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('overview');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#F2B705] text-[#070709] font-semibold'
                  : 'text-[#8E8E99] hover:text-[#F4F4F6]'
              }`}
            >
              Architecture &amp; Stack
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'readme'}
              onClick={() => {
                setActiveTab('readme');
                fetchLiveReadme();
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'readme'
                  ? 'bg-[#F2B705] text-[#070709] font-semibold'
                  : 'text-[#8E8E99] hover:text-[#F4F4F6]'
              }`}
            >
              README.md
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'files'}
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('files');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'files'
                  ? 'bg-[#F2B705] text-[#070709] font-semibold'
                  : 'text-[#8E8E99] hover:text-[#F4F4F6]'
              }`}
            >
              File Tree ({repo.files.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'commits'}
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('commits');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'commits'
                  ? 'bg-[#F2B705] text-[#070709] font-semibold'
                  : 'text-[#8E8E99] hover:text-[#F4F4F6]'
              }`}
            >
              Commits ({repo.commits.length})
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyClone}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono text-[#A1A1AA] hover:text-[#F4F4F6] border border-[#232329] hover:border-[#F2B705] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>git clone {repo.name}.git</span>
            {copiedClone ? <Check className="w-3.5 h-3.5 text-[#F2B705]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#232329]">
                  <ProjectVisualCanvas repoName={repo.name} className="h-full min-h-[240px]" />
                </div>

                <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs text-[#8E8E99]">
                      <span>Primary Language: {repo.primaryLanguage}</span>
                      <span aria-hidden="true"> · </span>
                      <span>Branch: {repo.defaultBranch}</span>
                      <span aria-hidden="true"> · </span>
                      <span>Updated {formatShortDate(repo.updatedAt)}</span>
                    </div>
                    <p className="text-sm text-[#D4D4D8] leading-relaxed mt-3">
                      {repo.architecturalSummary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#232329]">
                    <div className="text-xs font-semibold text-[#F4F4F6] mb-2.5">
                      Verified Repository Features
                    </div>
                    <ul className="space-y-2 text-xs text-[#A1A1AA] leading-relaxed">
                      {repo.keyHighlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="font-mono text-[#F2B705] shrink-0">0{idx + 1}.</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Language Byte Breakdown */}
              <div className="pt-6 border-t border-[#232329]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                  <span className="text-sm font-semibold text-[#F4F4F6]">
                    Verified Language Breakdown
                  </span>
                  <span className="text-xs font-mono text-[#8E8E99] tabular-nums">
                    Total Source Volume: {formatBytes(repo.totalBytes)}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  {languageEntries.map(([lang, bytes]) => {
                    const pct = ((bytes / repo.totalBytes) * 100).toFixed(1);
                    return (
                      <div key={lang} className="p-3.5 rounded-xl bg-[#0B0C10] border border-[#232329]">
                        <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
                          <span>{lang}</span>
                          <span className="font-mono text-[#F2B705] tabular-nums">{pct}%</span>
                        </div>
                        <div className="text-sm font-mono font-semibold text-[#F4F4F6] mt-1 tabular-nums">
                          {formatBytes(bytes)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {activeTab === 'readme' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA]">
                  <BookOpen className="w-4 h-4 text-[#F2B705]" />
                  <span>{repo.name}/README.md</span>
                </div>
                <button
                  type="button"
                  onClick={fetchLiveReadme}
                  className="interactive-btn inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#F2B705] border border-[#272732] rounded-lg hover:border-[#F2B705] hover:bg-[#191922] cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingReadme ? 'animate-spin' : ''}`} />
                  <span>Refresh from GitHub Raw</span>
                </button>
              </div>
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0B0C10] border border-[#232329] font-mono text-xs text-[#D4D4D8] whitespace-pre-wrap leading-relaxed max-h-[420px] overflow-y-auto">
                {liveReadmeText}
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-[#8E8E99] truncate">
                    /{repo.name}/{currentPath}
                  </div>
                  {currentPath && (
                    <button
                      type="button"
                      onClick={() => {
                        const parts = currentPath.split('/');
                        parts.pop();
                        fetchDirectory(parts.join('/'));
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-[#F2B705] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Up directory</span>
                    </button>
                  )}
                </div>

                <div className="border border-[#232329] rounded-2xl divide-y divide-[#232329] bg-[#0B0C10] max-h-[380px] overflow-y-auto">
                  {loadingFiles ? (
                    <div className="p-6 text-xs text-[#8E8E99] flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#F2B705]" />
                      <span>Querying GitHub Contents API...</span>
                    </div>
                  ) : (
                    directoryItems.map((item) => (
                      <button
                        key={item.path}
                        type="button"
                        onClick={() => inspectFile(item)}
                        className={`w-full px-4 py-2.5 text-left text-xs font-mono flex items-center justify-between hover:bg-[#16161D] transition-colors cursor-pointer ${
                          selectedFilePath === item.path ? 'bg-[#191922] text-[#F2B705]' : 'text-[#D4D4D8]'
                        }`}
                      >
                        <span className="flex items-center gap-2.5 truncate">
                          {item.type === 'dir' ? (
                            <Folder className="w-3.5 h-3.5 text-[#F2B705] shrink-0" />
                          ) : (
                            <FileCode className="w-3.5 h-3.5 text-[#8E8E99] shrink-0" />
                          )}
                          <span className="truncate">{item.name}</span>
                        </span>
                        <span className="text-[11px] text-[#8E8E99] ml-2 shrink-0">
                          {item.type === 'dir' ? 'dir' : 'view'}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="border border-[#232329] rounded-2xl bg-[#070709] h-full min-h-[300px] max-h-[410px] flex flex-col overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-[#232329] bg-[#0B0C10] flex items-center justify-between text-xs font-mono text-[#8E8E99]">
                    <span className="truncate">
                      {selectedFilePath ? selectedFilePath : 'Select a file to stream raw source from GitHub'}
                    </span>
                    {selectedFilePath && (
                      <a
                        href={`${repo.htmlUrl}/blob/${repo.defaultBranch}/${selectedFilePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F2B705] hover:underline whitespace-nowrap shrink-0 ml-2"
                      >
                        Raw on GitHub
                      </a>
                    )}
                  </div>
                  <div className="p-4 overflow-auto flex-1 font-mono text-xs text-[#D4D4D8] leading-relaxed">
                    {loadingContent ? (
                      <div className="text-[#8E8E99] flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#F2B705]" />
                        <span>Fetching raw file from raw.githubusercontent.com...</span>
                      </div>
                    ) : selectedFilePath ? (
                      <pre className="whitespace-pre-wrap break-words">{fileContent}</pre>
                    ) : (
                      <div className="text-[#8E8E99] space-y-2">
                        <p>Click any file in the left tree (such as <span className="text-[#F4F4F6]">README.md</span>, <span className="text-[#F4F4F6]">server.ts</span>, or <span className="text-[#F4F4F6]">package.json</span>) to stream its source code from GitHub.</p>
                        <p>Click any folder to traverse deeper into the repository tree.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'commits' && (
            <div className="space-y-3">
              <div className="text-xs text-[#8E8E99]">
                Verified Commit History on <span className="font-mono text-[#F4F4F6]">{repo.defaultBranch}</span>
              </div>
              <div className="border border-[#232329] rounded-2xl divide-y divide-[#232329] bg-[#0B0C10]">
                {repo.commits.map((c) => (
                  <div key={c.sha} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-[#F4F4F6]">{c.message}</div>
                      <div className="text-xs text-[#8E8E99]">
                        <span>Author: {c.author}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{formatShortDate(c.date)}</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#F2B705] shrink-0 tabular-nums">
                      {c.sha}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
