import React from "react";
import { Search, Clock, Copy, Download, Check, HelpCircle } from "lucide-react";

interface CoreToolsSplitProps {
  activeTool: string;
  selectedVideo: any;
  theme: "light" | "dark";
  transcriptSearch: string;
  setTranscriptSearch: (val: string) => void;
  showTimestamps: boolean;
  setShowTimestamps: (val: boolean) => void;
  handleDownload: (format: "txt" | "srt" | "json" | "markdown") => void;
  handleCopyToClipboard: (text: string) => void;
  activeSummaryTab: "short" | "detailed" | "executive" | "takeaways";
  setActiveSummaryTab: (tab: "short" | "detailed" | "executive" | "takeaways") => void;
}

export default function CoreToolsSplit({
  activeTool,
  selectedVideo,
  theme,
  transcriptSearch,
  setTranscriptSearch,
  showTimestamps,
  setShowTimestamps,
  handleDownload,
  handleCopyToClipboard,
  activeSummaryTab,
  setActiveSummaryTab
}: CoreToolsSplitProps) {
  if (!selectedVideo) return null;

  // Filter transcript segments
  const filteredTranscript = (selectedVideo.transcript || []).filter((t: any) =>
    t.text.toLowerCase().includes(transcriptSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. AI YouTube Transcript */}
      {activeTool === "transcript" && (
        <div className="space-y-4 animate-fadeIn" id="tool-view-transcript">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border ${
              theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-gray-50 border-slate-200"
            }`}>
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search keywords inside transcript..."
                value={transcriptSearch}
                onChange={(e) => setTranscriptSearch(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none"
              />
            </div>

            {/* Interactive Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowTimestamps(!showTimestamps)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
                  showTimestamps 
                    ? "bg-red-500/10 border-red-500/30 text-red-400" 
                    : theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700" : "bg-white border-slate-200 text-slate-600 hover:bg-gray-50"
                }`}
                title="Toggle Timestamps"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{showTimestamps ? "Timestamps On" : "Timestamps Off"}</span>
              </button>

              {/* Quick copy buttons */}
              <button
                onClick={() => {
                  const rawText = (selectedVideo.transcript || []).map((t: any) => t.text).join(" ");
                  handleCopyToClipboard(rawText);
                }}
                className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
                  theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700" : "bg-white border-slate-200 text-slate-600 hover:bg-gray-50"
                }`}
                title="Copy full plain text transcript"
              >
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy Plain Text</span>
              </button>
            </div>
          </div>

          {/* Download Format Strip - Superior to Youtubetranscript.com */}
          <div className={`p-3 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
            theme === "dark" ? "bg-slate-950/45 border-slate-800/80" : "bg-gray-50 border-slate-200"
          }`}>
            <span className="text-xs font-bold text-slate-400">Download Transcript:</span>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => handleDownload("txt")}
                className="px-2.5 py-1.5 text-[10px] font-extrabold bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg uppercase tracking-wider transition-colors border border-red-500/20 cursor-pointer"
              >
                TXT
              </button>
              <button 
                onClick={() => handleDownload("srt")}
                className="px-2.5 py-1.5 text-[10px] font-extrabold bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg uppercase tracking-wider transition-colors border border-red-500/20 cursor-pointer"
              >
                SRT
              </button>
              <button 
                onClick={() => handleDownload("json")}
                className="px-2.5 py-1.5 text-[10px] font-extrabold bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg uppercase tracking-wider transition-colors border border-red-500/20 cursor-pointer"
              >
                JSON
              </button>
              <button 
                onClick={() => handleDownload("markdown")}
                className="px-2.5 py-1.5 text-[10px] font-extrabold bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg uppercase tracking-wider transition-colors border border-red-500/20 cursor-pointer"
              >
                Markdown
              </button>
            </div>
          </div>

          {/* Interactive Text Display Scroller */}
          <div className={`max-h-[350px] overflow-y-auto space-y-3.5 pr-2 border rounded-xl p-4 text-left ${
            theme === "dark" ? "bg-slate-950/60 border-slate-800/80" : "bg-gray-50/50 border-slate-200"
          }`}>
            {filteredTranscript.length > 0 ? (
              filteredTranscript.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-4 p-2 rounded-lg hover:bg-red-500/5 transition-colors group">
                  {showTimestamps && (
                    <span className="text-xs font-bold text-red-500 shrink-0 font-mono">
                      {item.time}
                    </span>
                  )}
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">{item.text}</p>
                  </div>
                  <button 
                    onClick={() => handleCopyToClipboard(item.text)}
                    className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent border-0 p-0 cursor-pointer"
                    title="Copy statement"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-center text-slate-500 py-6">No matching keywords found.</p>
            )}
          </div>
        </div>
      )}

      {/* 2. AI Video Summary */}
      {activeTool === "summary" && (
        <div className="space-y-4 animate-fadeIn" id="tool-view-summary">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
            {["short", "detailed", "executive", "takeaways"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSummaryTab(tab as any)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider transition-colors bg-transparent border-0 cursor-pointer ${
                  activeSummaryTab === tab 
                    ? "bg-red-500 text-white" 
                    : theme === "dark" ? "bg-slate-900 text-slate-400 hover:bg-slate-800" : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={`p-5 rounded-xl border text-left ${theme === "dark" ? "bg-slate-950/60 border-slate-800/80" : "bg-gray-50/50 border-slate-200"}`}>
            {activeSummaryTab === "short" && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">TL;DR Overview</span>
                <p className="text-sm leading-relaxed font-medium">{selectedVideo.summary.short}</p>
              </div>
            )}
            {activeSummaryTab === "detailed" && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">Comprehensive Analysis</span>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{selectedVideo.summary.detailed}</p>
              </div>
            )}
            {activeSummaryTab === "executive" && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">Commercial/Educational Impact</span>
                <p className="text-sm leading-relaxed italic">{selectedVideo.summary.executive}</p>
              </div>
            )}
            {activeSummaryTab === "takeaways" && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">Key Lessons Learned</span>
                <ul className="space-y-2">
                  {selectedVideo.summary.takeaways ? selectedVideo.summary.takeaways.map((item: string, idx: number) => (
                    <li key={idx} className="flex gap-2 text-sm leading-relaxed">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  )) : (
                    (selectedVideo.summary.bullets || []).map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-2 text-sm leading-relaxed">
                        <span className="text-red-500 font-bold shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. AI Video Chapters */}
      {activeTool === "chapters" && (
        <div className="space-y-4 animate-fadeIn" id="tool-view-chapters">
          <div className="relative border-l-2 border-red-500/30 pl-6 ml-3 space-y-6 text-left">
            {selectedVideo.chapters ? selectedVideo.chapters.map((chapter: any, idx: number) => (
              <div key={idx} className="relative group">
                {/* Dot indicator */}
                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-red-500 border border-[#0c0f1a] rounded-full group-hover:scale-125 transition-transform"></div>
                
                <div className="flex items-center gap-3">
                  <span className="text-xs font-extrabold text-red-500 bg-red-500/10 px-2 py-0.5 rounded">
                    {chapter.time}
                  </span>
                  <h3 className="text-sm font-extrabold group-hover:text-red-400 transition-colors">{chapter.title}</h3>
                </div>
                <p className={`text-xs mt-1 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                  {chapter.description}
                </p>
              </div>
            )) : (
              <p className="text-sm">Chapters loading...</p>
            )}
          </div>
        </div>
      )}

      {/* 4. AI Frequently Asked Questions */}
      {activeTool === "faq" && (
        <div className="space-y-4 animate-fadeIn" id="tool-view-faq">
          <div className="space-y-4 text-left">
            {selectedVideo.faq ? selectedVideo.faq.map((item: any, idx: number) => (
              <div 
                key={idx} 
                className={`p-4 rounded-xl border text-left ${
                  theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-gray-50 border-slate-200"
                }`}
              >
                <h3 className="text-sm font-extrabold flex gap-2">
                  <span className="text-red-500">Q:</span>
                  {item.q}
                </h3>
                <p className={`text-xs mt-2 leading-relaxed pl-5 border-l border-slate-800 ${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}>
                  {item.a}
                </p>
              </div>
            )) : (
              <p className="text-sm">FAQs loading...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
