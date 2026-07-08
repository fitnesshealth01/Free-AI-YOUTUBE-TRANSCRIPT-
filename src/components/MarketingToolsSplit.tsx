import React from "react";
import { Copy, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { LANGUAGES } from "../lib/languages";

interface MarketingToolsSplitProps {
  activeTool: string;
  selectedVideo: any;
  theme: "light" | "dark";
  blogLength: "short" | "medium" | "long";
  setBlogLength: (val: "short" | "medium" | "long") => void;
  activeSocialTab: string;
  setActiveSocialTab: (val: string) => void;
  translationLanguage: string;
  setTranslationLanguage: (val: string) => void;
  translatedTranscript: any[];
  handleCopyToClipboard: (text: string) => void;
  isTranslating?: boolean;
}

export default function MarketingToolsSplit({
  activeTool,
  selectedVideo,
  theme,
  blogLength,
  setBlogLength,
  activeSocialTab,
  setActiveSocialTab,
  translationLanguage,
  setTranslationLanguage,
  translatedTranscript,
  handleCopyToClipboard,
  isTranslating
}: MarketingToolsSplitProps) {
  if (!selectedVideo) return null;

  const [metaTitle, setMetaTitle] = React.useState("");
  const [metaDesc, setMetaDesc] = React.useState("");

  React.useEffect(() => {
    if (selectedVideo) {
      setMetaTitle(selectedVideo.blog?.metaTitle || selectedVideo.seo?.titles?.[0] || selectedVideo.title || "");
      setMetaDesc(selectedVideo.blog?.metaDescription || selectedVideo.seo?.description?.slice(0, 150) || "");
    }
  }, [selectedVideo]);

  return (
    <div className="space-y-6">
      {/* 1. AI Blog Article Writer */}
      {activeTool === "blog" && (
        <div className="space-y-4 animate-fadeIn" id="tool-view-blog">
          {/* Length Selector */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">SELECT BLOG ARTICLE LENGTH:</span>
            <div className="flex gap-1.5">
              {["short", "medium", "long"].map((len) => (
                <button
                  key={len}
                  onClick={() => setBlogLength(len as any)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg uppercase border cursor-pointer bg-transparent ${
                    blogLength === len 
                      ? "bg-rose-500 text-white border-rose-600" 
                      : theme === "dark" ? "border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800" : "border-slate-200 bg-gray-50 text-slate-700 hover:bg-gray-100"
                  }`}
                >
                  {len}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Post Editor */}
          <div className={`p-6 rounded-xl border text-left space-y-5 overflow-y-auto max-h-[380px] ${
            theme === "dark" ? "bg-slate-950/60 border-slate-800/80" : "bg-gray-50/50 border-slate-200"
          }`}>
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-bold text-rose-400 tracking-wider block mb-1">Catchy Title Suggestion</span>
              <h1 className="text-xl font-extrabold tracking-tight">{selectedVideo.blog.title}</h1>
            </div>

            <div>
              <p className="text-sm leading-relaxed italic text-slate-300">
                "{selectedVideo.blog.intro}"
              </p>
            </div>

            {/* TOC */}
            <div className={`p-4 rounded-lg text-xs ${theme === "dark" ? "bg-slate-900/60" : "bg-gray-100"}`}>
              <span className="font-bold block mb-2 text-slate-400 uppercase tracking-widest">Table of Contents</span>
              <ol className="list-decimal list-inside space-y-1">
                {(selectedVideo.blog.sections ? selectedVideo.blog.sections.slice(0, blogLength === "short" ? 1 : blogLength === "medium" ? 2 : 4) : []).map((sec: any, idx: number) => (
                  <li key={idx} className="hover:text-red-400 cursor-pointer">{sec.heading}</li>
                ))}
              </ol>
            </div>

            {/* Blog content segments dynamically tailored by length selector */}
            <div className="space-y-5">
              {selectedVideo.blog.sections ? selectedVideo.blog.sections.slice(0, blogLength === "short" ? 1 : blogLength === "medium" ? 2 : 4).map((sec: any, idx: number) => {
                let contentElement;
                if (blogLength === "short") {
                  const sentences = sec.content.split('. ');
                  const condensedText = sentences.slice(0, Math.min(2, sentences.length)).join('. ') + (sentences.length > 2 ? '.' : '');
                  contentElement = (
                    <div className="space-y-1">
                      <p className="text-sm leading-relaxed text-slate-300">{condensedText}</p>
                      <div className="pl-3 border-l-2 border-rose-500/40 text-xs text-rose-400/80 italic mt-1">
                        Executive summary style. Optimized for rapid reading.
                      </div>
                    </div>
                  );
                } else if (blogLength === "medium") {
                  contentElement = (
                    <p className="text-sm leading-relaxed text-slate-300">{sec.content}</p>
                  );
                } else {
                  contentElement = (
                    <div className="space-y-3">
                      <p className="text-sm leading-relaxed text-slate-300">{sec.content}</p>
                      <div className={`p-4 rounded-xl border ${theme === "dark" ? "bg-slate-900/40 border-slate-800" : "bg-gray-150 border-slate-200"} space-y-2`}>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> Core Takeaways & Tactical Implementation
                        </h4>
                        <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400">
                          <li><strong>Strategic Application:</strong> Implement this methodology immediately to establish a solid content benchmark.</li>
                          <li><strong>Key Optimization Vector:</strong> Ensure you track progress dynamically, minimizing structural friction as explained.</li>
                          <li><strong>Common Pitfalls:</strong> Avoid relying on outdated parameters; prioritize iterative quality over pure output volume.</li>
                        </ul>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={idx} className="space-y-2 border-b border-slate-800/20 pb-4 last:border-b-0">
                    <h3 className="text-base font-bold text-red-500">## {sec.heading}</h3>
                    {contentElement}
                  </div>
                );
              }) : (
                <p className="text-sm leading-relaxed">Blog content loading...</p>
              )}
            </div>

            {/* FAQs in Blog */}
            {selectedVideo.blog.faqs && (
              <div className="border-t border-slate-800 pt-4 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Article FAQs</span>
                {selectedVideo.blog.faqs.map((f: any, idx: number) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-sm font-bold">{f.q}</p>
                    <p className="text-sm leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Conclusion */}
            <div className="border-t border-slate-800 pt-4">
              <p className="text-sm leading-relaxed font-semibold">{selectedVideo.blog.conclusion}</p>
            </div>

            {/* Metadata block */}
            <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${theme === "dark" ? "bg-slate-900/50 border-slate-800" : "bg-gray-100 border-slate-200"}`}>
              <span className="font-bold text-red-400">SEO META DATA PREVIEW</span>
              <p><strong>Meta Title:</strong> {selectedVideo.blog.metaTitle}</p>
              <p><strong>Meta Description:</strong> {selectedVideo.blog.metaDescription}</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. AI Social Media Hub */}
      {activeTool === "social" && (
        <div className="space-y-4 animate-fadeIn" id="tool-view-social">
          {/* Social Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
            {["twitter", "linkedin", "facebook", "instagram", "threads"].map((platform) => (
              <button
                key={platform}
                onClick={() => setActiveSocialTab(platform)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider transition-colors bg-transparent border-0 cursor-pointer ${
                  activeSocialTab === platform 
                    ? "bg-indigo-600 text-white" 
                    : theme === "dark" ? "bg-slate-900 text-slate-400 hover:bg-slate-800" : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                }`}
              >
                {platform}
              </button>
            ))}
          </div>

          <div className={`p-5 rounded-xl border text-left ${theme === "dark" ? "bg-slate-950/60 border-slate-800/80" : "bg-gray-50/50 border-slate-200"}`}>
            {activeSocialTab === "twitter" && (
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-400 block">X/TWITTER THREAD STARTERS</span>
                {selectedVideo.social.twitter ? selectedVideo.social.twitter.map((tweet: string, idx: number) => (
                  <div key={idx} className={`p-4 rounded-xl relative ${theme === "dark" ? "bg-slate-900" : "bg-white border border-slate-200"}`}>
                    <p className="text-sm leading-relaxed mb-3">{tweet}</p>
                    <button 
                      onClick={() => handleCopyToClipboard(tweet)}
                      className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                )) : (
                  <p className="text-sm">Twitter post loading...</p>
                )}
              </div>
            )}

            {activeSocialTab === "linkedin" && (
              <div className="space-y-4 relative">
                <span className="text-xs font-bold text-slate-400 block">PROFESSIONAL LINKEDIN ARTICLE</span>
                <div className={`p-4 rounded-xl relative ${theme === "dark" ? "bg-slate-900" : "bg-white border border-slate-200"}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{selectedVideo.social.linkedin}</p>
                  <button 
                    onClick={() => handleCopyToClipboard(selectedVideo.social.linkedin)}
                    className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeSocialTab === "facebook" && (
              <div className="space-y-4 relative">
                <span className="text-xs font-bold text-slate-400 block">FACEBOOK PUBLIC UPDATE</span>
                <div className={`p-4 rounded-xl relative ${theme === "dark" ? "bg-slate-900" : "bg-white border border-slate-200"}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{selectedVideo.social.facebook}</p>
                  <button 
                    onClick={() => handleCopyToClipboard(selectedVideo.social.facebook)}
                    className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeSocialTab === "instagram" && (
              <div className="space-y-4 relative">
                <span className="text-xs font-bold text-slate-400 block">INSTAGRAM AESTHETIC CAPTION</span>
                <div className={`p-4 rounded-xl relative ${theme === "dark" ? "bg-slate-900" : "bg-white border border-slate-200"}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{selectedVideo.social.instagram}</p>
                  <button 
                    onClick={() => handleCopyToClipboard(selectedVideo.social.instagram)}
                    className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeSocialTab === "threads" && (
              <div className="space-y-4 relative">
                <span className="text-xs font-bold text-slate-400 block">THREADS PUBLIC SHORT</span>
                <div className={`p-4 rounded-xl relative ${theme === "dark" ? "bg-slate-900" : "bg-white border border-slate-200"}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{selectedVideo.social.threads}</p>
                  <button 
                    onClick={() => handleCopyToClipboard(selectedVideo.social.threads)}
                    className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. AI YouTube SEO Toolkit */}
      {activeTool === "seo" && (
        <div className="space-y-4 animate-fadeIn" id="tool-view-seo">
          <div className="space-y-4 text-left">
            <div className={`p-4 rounded-xl border ${theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-gray-50 border-slate-200"}`}>
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest block mb-2">Alternative Video Titles</span>
              <ul className="space-y-1.5 text-left">
                {selectedVideo.seo.titles ? selectedVideo.seo.titles.map((title: string, idx: number) => (
                  <li key={idx} className="flex justify-between items-center text-sm p-1.5 hover:bg-slate-900 rounded group">
                    <span>{title}</span>
                    <button onClick={() => handleCopyToClipboard(title)} className="text-slate-500 hover:text-white bg-transparent border-0 cursor-pointer">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </li>
                )) : (
                  <p className="text-xs">Loading SEO titles...</p>
                )}
              </ul>
            </div>

            <div className={`p-4 rounded-xl border ${theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-gray-50 border-slate-200"}`}>
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest block mb-2">SEO Optimized Description</span>
              <p className="text-xs leading-relaxed whitespace-pre-wrap">{selectedVideo.seo.description}</p>
              <button 
                onClick={() => handleCopyToClipboard(selectedVideo.seo.description)}
                className={`mt-3 text-xs font-semibold px-3 py-1 rounded border flex items-center gap-1 cursor-pointer bg-transparent focus:outline-none ${
                  theme === "dark" ? "border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300" : "border-slate-200 bg-white hover:bg-gray-100 text-slate-700"
                }`}
              >
                <Copy className="w-3.5 h-3.5" /> Copy Description
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border ${theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-gray-50 border-slate-200"}`}>
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest block mb-2">Keywords & Tags</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedVideo.seo.keywords ? selectedVideo.seo.keywords.map((kw: string, idx: number) => (
                    <span key={idx} className={`text-xs px-2 py-0.5 rounded font-medium ${
                      theme === "dark" ? "bg-slate-900 text-slate-300" : "bg-gray-100 text-slate-700"
                    }`}>
                      {kw}
                    </span>
                  )) : (
                    <p className="text-xs">Keywords loading...</p>
                  )}
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-gray-50 border-slate-200"}`}>
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest block mb-2">Viral Hashtags</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedVideo.seo.hashtags ? selectedVideo.seo.hashtags.map((ht: string, idx: number) => (
                    <span key={idx} className="text-xs font-extrabold text-amber-400">
                      {ht}
                    </span>
                  )) : (
                    <p className="text-xs">Hashtags loading...</p>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive SEO Metadata Manager Section */}
            <div className={`p-5 rounded-2xl border mt-6 space-y-4 text-left ${
              theme === "dark" ? "bg-slate-900/60 border-slate-850" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div>
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest block mb-1">
                  Interactive SEO Metadata Manager
                </span>
                <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                  Live-edit your video's SEO meta title and meta description. Monitor character counts and preview exactly how this page would render in Google Search engine results.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Editor Inputs */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-slate-400">SEO META TITLE</label>
                      <span className={`text-[10px] font-mono font-bold ${
                        metaTitle.length > 60 ? "text-amber-500" : "text-emerald-500"
                      }`}>
                        {metaTitle.length}/60 chars
                      </span>
                    </div>
                    <input 
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-red-500 ${
                        theme === "dark" 
                          ? "bg-slate-950 border-slate-800 text-white" 
                          : "bg-gray-50 border-slate-200 text-slate-800"
                      }`}
                      placeholder="Enter meta title..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-slate-400">SEO META DESCRIPTION</label>
                      <span className={`text-[10px] font-mono font-bold ${
                        metaDesc.length > 160 ? "text-amber-500" : "text-emerald-500"
                      }`}>
                        {metaDesc.length}/160 chars
                      </span>
                    </div>
                    <textarea 
                      rows={3}
                      value={metaDesc}
                      onChange={(e) => setMetaDesc(e.target.value)}
                      className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-red-500 resize-none ${
                        theme === "dark" 
                          ? "bg-slate-950 border-slate-800 text-white" 
                          : "bg-gray-50 border-slate-200 text-slate-800"
                      }`}
                      placeholder="Enter meta description..."
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleCopyToClipboard(metaTitle);
                      }}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all bg-transparent cursor-pointer ${
                        theme === "dark" ? "border-slate-800 hover:bg-slate-900 text-slate-300" : "border-slate-200 hover:bg-gray-100 text-slate-700"
                      }`}
                    >
                      Copy Title
                    </button>
                    <button
                      onClick={() => {
                        handleCopyToClipboard(metaDesc);
                      }}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all bg-transparent cursor-pointer ${
                        theme === "dark" ? "border-slate-800 hover:bg-slate-900 text-slate-300" : "border-slate-200 hover:bg-gray-100 text-slate-700"
                      }`}
                    >
                      Copy Description
                    </button>
                  </div>
                </div>

                {/* Google Search Preview Card */}
                <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                  theme === "dark" ? "bg-slate-950 border-slate-900" : "bg-gray-50 border-slate-200"
                }`}>
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-3">
                      Google Desktop Search Preview
                    </span>
                    <div className="space-y-1">
                      {/* URL breadcrumb */}
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <span className="font-medium">https://www.youtube.com</span>
                        <span className="text-slate-600">›</span>
                        <span className="text-slate-500">watch</span>
                      </div>
                      {/* Google Title */}
                      <h3 className="text-[17px] hover:underline cursor-pointer font-sans leading-tight text-blue-600 dark:text-blue-400 font-medium truncate">
                        {metaTitle || "Please specify a title..."}
                      </h3>
                      {/* Description */}
                      <p className={`text-[12px] leading-relaxed font-sans ${
                        theme === "dark" ? "text-slate-300" : "text-slate-600"
                      }`}>
                        {metaDesc || "Please specify a description..."}
                      </p>
                    </div>
                  </div>
                  
                  {/* Performance Indicators */}
                  <div className="border-t border-slate-850 pt-3 mt-4 flex items-center justify-between text-[10px] font-semibold text-slate-400">
                    <span className="flex items-center gap-1">
                      Score: 
                      <span className={`font-bold ${
                        metaTitle.length >= 35 && metaTitle.length <= 60 && metaDesc.length >= 80 && metaDesc.length <= 160
                          ? "text-emerald-500" : "text-amber-500"
                      }`}>
                        {metaTitle.length >= 35 && metaTitle.length <= 60 && metaDesc.length >= 80 && metaDesc.length <= 160 ? "100/100 (Optimal)" : "75/100 (Improve length)"}
                      </span>
                    </span>
                    <span className="italic">TranscriptG Real-time Audit</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. AI Quote Extractor */}
      {activeTool === "quotes" && (
        <div className="space-y-4 animate-fadeIn" id="tool-view-quotes">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {/* Educational */}
            <div className={`p-4 rounded-xl border border-l-4 border-l-blue-500 relative group ${theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-gray-50 border-slate-200"}`}>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-2 font-mono">Educational Insight</span>
              <p className="text-xs italic leading-relaxed pr-6">
                "{selectedVideo.quotes.educational ? selectedVideo.quotes.educational[0] : 'Educational quotes loading...'}"
              </p>
              <button 
                onClick={() => handleCopyToClipboard(selectedVideo.quotes.educational ? selectedVideo.quotes.educational[0] : '')}
                className="absolute top-2 right-2 p-1 text-slate-500 hover:text-white bg-transparent border-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Motivational */}
            <div className={`p-4 rounded-xl border border-l-4 border-l-rose-500 relative group ${theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-gray-50 border-slate-200"}`}>
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest block mb-2 font-mono">Motivational Moment</span>
              <p className="text-xs italic leading-relaxed pr-6">
                "{selectedVideo.quotes.motivational ? selectedVideo.quotes.motivational[0] : 'Motivational quotes loading...'}"
              </p>
              <button 
                onClick={() => handleCopyToClipboard(selectedVideo.quotes.motivational ? selectedVideo.quotes.motivational[0] : '')}
                className="absolute top-2 right-2 p-1 text-slate-500 hover:text-white bg-transparent border-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Important */}
            <div className={`p-4 rounded-xl border border-l-4 border-l-amber-500 relative group ${theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-gray-50 border-slate-200"}`}>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-2 font-mono">Crucial Takeaway</span>
              <p className="text-xs italic leading-relaxed pr-6">
                "{selectedVideo.quotes.important ? selectedVideo.quotes.important[0] : 'Important quotes loading...'}"
              </p>
              <button 
                onClick={() => handleCopyToClipboard(selectedVideo.quotes.important ? selectedVideo.quotes.important[0] : '')}
                className="absolute top-2 right-2 p-1 text-slate-500 hover:text-white bg-transparent border-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Social */}
            <div className={`p-4 rounded-xl border border-l-4 border-l-emerald-500 relative group ${theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-gray-50 border-slate-200"}`}>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-2 font-mono">Tweetable Quote</span>
              <p className="text-xs italic leading-relaxed text-emerald-300 pr-6">
                "{selectedVideo.quotes.social ? selectedVideo.quotes.social[0] : 'Social quotes loading...'}"
              </p>
              <button 
                onClick={() => handleCopyToClipboard(selectedVideo.quotes.social ? selectedVideo.quotes.social[0] : '')}
                className="absolute top-2 right-2 p-1 text-slate-500 hover:text-white bg-transparent border-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. AI Translation */}
      {activeTool === "translation" && (
        <div className="space-y-4 animate-fadeIn" id="tool-view-translation">
          <div className="flex items-center gap-3 justify-start text-left">
            <span className="text-xs font-bold text-slate-400 uppercase">TRANSLATE INTO:</span>
            <select
              value={translationLanguage}
              onChange={(e) => setTranslationLanguage(e.target.value)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border focus:outline-none focus:ring-0 ${
                theme === "dark" ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
              }`}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>

          <div className={`max-h-[350px] overflow-y-auto space-y-3.5 pr-2 border rounded-xl p-4 text-left ${
            theme === "dark" ? "bg-slate-950/60 border-slate-800/80" : "bg-gray-50/50 border-slate-200"
          }`}>
            {isTranslating ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-3">
                <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
                <p className="text-sm font-semibold text-slate-400">Gemini translating transcript...</p>
              </div>
            ) : translatedTranscript && translatedTranscript.length > 0 ? (
              translatedTranscript.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-4 p-2 rounded-lg hover:bg-amber-500/5 transition-colors group">
                  <span className="text-xs font-bold text-amber-500 shrink-0 font-mono">
                    {item.time}
                  </span>
                  <p className="text-sm leading-relaxed flex-1">{item.text}</p>
                  <button 
                    onClick={() => handleCopyToClipboard(item.text)}
                    className="text-slate-500 hover:text-amber-400 bg-transparent border-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 text-center py-6">Translation text loading...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
