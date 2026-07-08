import React, { useState, useEffect } from "react";
import { Loader2, Sparkles } from "lucide-react";

export function WorkspaceSkeleton({ theme }: { theme: "light" | "dark" }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(5);

  const steps = [
    "🔍 Analyzing video stream properties & metadata...",
    "✍️ Extracting high-fidelity video transcript...",
    "🤖 Initializing Gemini AI Content Engine...",
    "📝 Generating flawless interactive transcript timestamps...",
    "💡 Summarizing main takeaways & executive reviews...",
    "🎨 Designing social media content planners...",
    "🧠 Building conceptual Knowledge Graph & mind map...",
    "🎓 Structuring educational study notes & practice quizzes...",
    "⚡ Compiling final workspace modules..."
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return 95;
        const increment = Math.max(1, Math.floor((98 - prev) / 8));
        return prev + increment;
      });
    }, 400);

    const stepInterval = setInterval(() => {
      setStepIndex(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto py-6" id="workspace-skeleton-container">
      {/* Centered Premium Loading Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
        <div className={`w-full max-w-md p-6 sm:p-8 rounded-3xl border shadow-2xl transition-all duration-300 ${
          theme === "dark" 
            ? "bg-slate-900/95 border-slate-800 text-white shadow-black/80" 
            : "bg-white/95 border-slate-200 text-slate-800 shadow-slate-200/50"
        } backdrop-blur-md`}>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full border-2 border-red-500/20 animate-ping" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-500 via-rose-600 to-amber-500 flex items-center justify-center shadow-xl shadow-red-500/20 relative z-10">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            </div>
          </div>

          <h3 className="text-lg font-extrabold tracking-tight mb-2 text-center">
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              TranscriptG Content Engine
            </span>
          </h3>
          <p className={`text-xs font-semibold mb-6 text-center ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
            Synthesizing Video Tools with Gemini AI
          </p>

          <div className="space-y-2 mb-6 text-left">
            <div className="flex justify-between text-[11px] font-mono font-bold">
              <span className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>PROCESSING STATUS</span>
              <span className="text-red-500">{progress}%</span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden border ${
              theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
            }`}>
              <div 
                className="h-full bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className={`p-4 rounded-xl border text-left flex items-start gap-3 min-h-[76px] ${
            theme === "dark" ? "bg-slate-950/60 border-slate-850" : "bg-gray-50 border-slate-150"
          }`}>
            <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-extrabold text-red-500 uppercase tracking-wider font-mono">Current Phase</p>
              <p className={`text-xs font-semibold leading-relaxed transition-all duration-300 ${
                theme === "dark" ? "text-slate-200" : "text-slate-700"
              }`}>
                {steps[stepIndex]}
              </p>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 mt-5 font-mono text-center">
            🔒 SECURE CLIENT-SIDE PIPELINE • NO DATA RETENTION
          </p>
        </div>
      </div>

      {/* Background Pulsing Skeletons */}
      <div className="space-y-8 animate-pulse w-full filter blur-[1px] opacity-25 pointer-events-none select-none">
        {/* Top Header Card Skeleton */}
        <div className={`p-5 rounded-2xl border ${
          theme === "dark" ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-sm"
        } flex flex-col md:flex-row items-center gap-5 justify-between`}>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-24 h-14 rounded-lg bg-slate-700/40 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-20 bg-slate-700/40 rounded" />
              <div className="h-5 w-48 sm:w-64 bg-slate-700/40 rounded" />
              <div className="h-3 w-16 bg-slate-700/40 rounded" />
            </div>
          </div>
          <div className="w-full md:w-48 h-10 bg-slate-700/30 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left sidebar tab skeleton */}
          <div className="lg:col-span-4 space-y-3">
            <div className="h-3.5 w-28 bg-slate-700/40 rounded mx-2" />
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className={`h-12 w-full rounded-xl border ${
                  theme === "dark" ? "bg-slate-900/40 border-slate-850" : "bg-white border-slate-200"
                } flex items-center gap-3 px-3`}>
                  <div className="w-6 h-6 rounded bg-slate-700/30 shrink-0" />
                  <div className="h-4 w-32 bg-slate-700/30 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Right workspace content skeleton */}
          <div className="lg:col-span-8">
            <div className={`p-6 rounded-2xl border min-h-[500px] ${
              theme === "dark" ? "bg-[#0c0f1a]/60 border-slate-800" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div className="space-y-6">
                {/* Media Player row */}
                <div className="h-48 w-full bg-slate-700/20 rounded-xl border border-slate-700/10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-slate-700/40 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-12 border-l-slate-900/60 ml-1" />
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="h-4 w-1/3 bg-slate-700/40 rounded" />
                  <div className="h-3 w-full bg-slate-700/20 rounded" />
                  <div className="h-3 w-5/6 bg-slate-700/20 rounded" />
                  <div className="h-3 w-2/3 bg-slate-700/20 rounded" />
                </div>
                <div className="pt-6 border-t border-slate-800/10 flex gap-3">
                  <div className="h-10 w-28 bg-slate-700/30 rounded-lg" />
                  <div className="h-10 w-28 bg-slate-700/30 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChannelSkeleton({ theme }: { theme: "light" | "dark" }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(5);

  const steps = [
    "🔍 Querying public YouTube channel database...",
    "📈 Extrapolating historical monthly views and growth curves...",
    "💰 Mapping category to localized RPM & CPM brackets...",
    "🤖 Running Gemini multi-revenue estimation algorithms...",
    "🔮 Forecasting 12-month earnings scenarios...",
    "📊 Structuring dynamic audit charts & interactive breakdowns..."
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return 95;
        const increment = Math.max(1, Math.floor((98 - prev) / 8));
        return prev + increment;
      });
    }, 400);

    const stepInterval = setInterval(() => {
      setStepIndex(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto py-10" id="channel-skeleton-container">
      {/* Centered Premium Loading Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
        <div className={`w-full max-w-md p-6 sm:p-8 rounded-3xl border shadow-2xl transition-all duration-300 ${
          theme === "dark" 
            ? "bg-slate-900/95 border-slate-800 text-white shadow-black/80" 
            : "bg-white/95 border-slate-200 text-slate-800 shadow-slate-200/50"
        } backdrop-blur-md`}>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full border-2 border-red-500/20 animate-ping" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-500 via-rose-600 to-amber-500 flex items-center justify-center shadow-xl shadow-red-500/20 relative z-10">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            </div>
          </div>

          <h3 className="text-lg font-extrabold tracking-tight mb-2 text-center">
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              TranscriptG Revenue Audit Engine
            </span>
          </h3>
          <p className={`text-xs font-semibold mb-6 text-center ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
            Calculating Earnings & Channel Valuation
          </p>

          <div className="space-y-2 mb-6 text-left">
            <div className="flex justify-between text-[11px] font-mono font-bold">
              <span className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>AUDIT PROGRESS</span>
              <span className="text-red-500">{progress}%</span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden border ${
              theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
            }`}>
              <div 
                className="h-full bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className={`p-4 rounded-xl border text-left flex items-start gap-3 min-h-[76px] ${
            theme === "dark" ? "bg-slate-950/60 border-slate-850" : "bg-gray-50 border-slate-150"
          }`}>
            <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-extrabold text-red-500 uppercase tracking-wider font-mono">Current Phase</p>
              <p className={`text-xs font-semibold leading-relaxed transition-all duration-300 ${
                theme === "dark" ? "text-slate-200" : "text-slate-700"
              }`}>
                {steps[stepIndex]}
              </p>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 mt-5 font-mono text-center">
            🔒 SECURE CLIENT-SIDE PIPELINE • NO DATA RETENTION
          </p>
        </div>
      </div>

      {/* Background Pulsing Skeletons */}
      <div className="space-y-8 animate-pulse w-full filter blur-[1px] opacity-25 pointer-events-none select-none">
        {/* Top channel bio card */}
        <div className={`p-6 rounded-3xl border ${
          theme === "dark" ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200"
        } flex flex-col sm:flex-row items-center gap-5`}>
          <div className="w-16 h-16 rounded-full bg-slate-700/40 shrink-0" />
          <div className="flex-1 space-y-2 w-full text-center sm:text-left">
            <div className="h-5 w-40 bg-slate-700/40 rounded mx-auto sm:mx-0" />
            <div className="h-3 w-64 bg-slate-700/40 rounded mx-auto sm:mx-0" />
          </div>
        </div>
        
        {/* Grid of stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`p-5 rounded-2xl border ${
              theme === "dark" ? "bg-[#0c0f1a]/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"
            } space-y-2`}>
              <div className="h-3.5 w-16 bg-slate-700/40 rounded" />
              <div className="h-6 w-24 bg-slate-700/40 rounded" />
            </div>
          ))}
        </div>
        
        {/* Huge graph skeleton */}
        <div className={`p-6 rounded-3xl border ${
          theme === "dark" ? "bg-slate-900/20 border-slate-800" : "bg-white border-slate-200 shadow-sm"
        } h-80 flex flex-col justify-between`}>
          <div className="h-4.5 w-48 bg-slate-700/40 rounded" />
          <div className="w-full h-48 bg-slate-700/20 rounded-xl" />
          <div className="flex justify-between">
            <div className="h-3 w-16 bg-slate-700/20 rounded" />
            <div className="h-3 w-16 bg-slate-700/20 rounded" />
            <div className="h-3 w-16 bg-slate-700/20 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PinterestSkeleton({ theme }: { theme: "light" | "dark" }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(10);

  const steps = [
    "🔗 Resolving Pinterest pin URL...",
    "📥 Downloading Pinterest web document...",
    "🔍 Scraping JSON-LD and Pinterest PWS data matrices...",
    "🎥 Locating high-resolution video streams...",
    "🖼️ Grabbing high-contrast thumbnail images...",
    "📦 Preparing secure downloader stream link..."
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return 95;
        const increment = Math.max(1, Math.floor((98 - prev) / 6));
        return prev + increment;
      });
    }, 300);

    const stepInterval = setInterval(() => {
      setStepIndex(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto py-10" id="pinterest-skeleton-container">
      {/* Centered Premium Loading Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
        <div className={`w-full max-w-md p-6 sm:p-8 rounded-3xl border shadow-2xl transition-all duration-300 ${
          theme === "dark" 
            ? "bg-slate-900/95 border-slate-800 text-white shadow-black/80" 
            : "bg-white/95 border-slate-200 text-slate-800 shadow-slate-200/50"
        } backdrop-blur-md`}>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full border-2 border-red-500/20 animate-ping" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-500 via-rose-600 to-amber-500 flex items-center justify-center shadow-xl shadow-red-500/20 relative z-10">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            </div>
          </div>

          <h3 className="text-lg font-extrabold tracking-tight mb-2 text-center">
            <span className="bg-gradient-to-r from-red-500 via-rose-600 to-amber-500 bg-clip-text text-transparent">
              KlickPin Pinterest Downloader
            </span>
          </h3>
          <p className={`text-xs font-semibold mb-6 text-center ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
            Scraping & Extracting HD Video Stream
          </p>

          <div className="space-y-2 mb-6 text-left">
            <div className="flex justify-between text-[11px] font-mono font-bold">
              <span className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>SCRAPE PROGRESS</span>
              <span className="text-red-500">{progress}%</span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden border ${
              theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
            }`}>
              <div 
                className="h-full bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className={`p-4 rounded-xl border text-left flex items-start gap-3 min-h-[76px] ${
            theme === "dark" ? "bg-slate-950/60 border-slate-850" : "bg-gray-50 border-slate-150"
          }`}>
            <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-extrabold text-red-500 uppercase tracking-wider font-mono">Current Phase</p>
              <p className={`text-xs font-semibold leading-relaxed transition-all duration-300 ${
                theme === "dark" ? "text-slate-200" : "text-slate-700"
              }`}>
                {steps[stepIndex]}
              </p>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 mt-5 font-mono text-center">
            🔒 SECURE CLIENT-SIDE STREAMING • NO SERVER STORAGE
          </p>
        </div>
      </div>

      {/* Background Pulsing Skeletons */}
      <div className="space-y-8 animate-pulse w-full filter blur-[1px] opacity-25 pointer-events-none select-none">
        {/* Top pin bio card */}
        <div className={`p-6 rounded-3xl border ${
          theme === "dark" ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200"
        } flex flex-col sm:flex-row items-center gap-5`}>
          <div className="w-16 h-16 rounded-full bg-slate-700/40 shrink-0" />
          <div className="flex-1 space-y-2 w-full text-center sm:text-left">
            <div className="h-5 w-40 bg-slate-700/40 rounded mx-auto sm:mx-0" />
            <div className="h-3 w-64 bg-slate-700/40 rounded mx-auto sm:mx-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
