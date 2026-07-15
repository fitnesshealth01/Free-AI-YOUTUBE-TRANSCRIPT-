import React, { useState, useEffect } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  Calculator, 
  Youtube, 
  Sparkles, 
  Share2, 
  Info, 
  Award, 
  CheckCircle2, 
  Target, 
  ChevronRight,
  Tv,
  Coins,
  BadgeDollarSign
} from "lucide-react";

interface YouTubeCreatorCalculatorProps {
  theme: string;
  showToast: (msg: string) => void;
  onActivateTool?: (toolId: string) => void;
}

interface NicheOption {
  id: string;
  name: string;
  minRPM: number;
  maxRPM: number;
  description: string;
}

const NICHES: NicheOption[] = [
  { id: "finance", name: "Finance & Investing", minRPM: 12.0, maxRPM: 32.0, description: "Personal finance, stocks, crypto, banking, real estate." },
  { id: "tech", name: "Tech & Software", minRPM: 8.0, maxRPM: 18.0, description: "Gadget reviews, coding tutorials, software, tech news." },
  { id: "business", name: "Business & Startup", minRPM: 10.0, maxRPM: 24.0, description: "Entrepreneurship, marketing, e-commerce, SaaS, productivity." },
  { id: "education", name: "Education & Science", minRPM: 4.5, maxRPM: 11.0, description: "Academic subjects, documentary-style essays, math/science." },
  { id: "lifestyle", name: "Lifestyle & Beauty", minRPM: 3.0, maxRPM: 7.5, description: "Vlogs, fashion, makeup, travel, cooking, home decor." },
  { id: "gaming", name: "Gaming & Esports", minRPM: 1.5, maxRPM: 4.0, description: "Let's Plays, walkthroughs, reviews, stream highlights." },
  { id: "entertainment", name: "Entertainment & Comedy", minRPM: 2.0, maxRPM: 5.5, description: "Pranks, sketches, movie reviews, compilations." }
];

const LOCATIONS = [
  { id: "tier1", name: "US / UK / Canada (Tier 1)", multiplier: 1.3, desc: "Highest advertiser demand and premium bids." },
  { id: "tier2", name: "Europe / Australia (Tier 2)", multiplier: 1.0, desc: "Standard advertiser demand and competitive bids." },
  { id: "tier3", name: "Asia / LatAm (Tier 3)", multiplier: 0.5, desc: "Higher volume but lower individual ad bids." },
  { id: "mixed", name: "Global Mixed Audience", multiplier: 0.85, desc: "A healthy mix of global viewers from all regions." }
];

export default function YouTubeCreatorCalculator({ theme, showToast, onActivateTool }: YouTubeCreatorCalculatorProps) {
  // Input states
  const [monthlyViews, setMonthlyViews] = useState<number>(100000);
  const [selectedNiche, setSelectedNiche] = useState<string>("tech");
  const [selectedLocation, setSelectedLocation] = useState<string>("mixed");
  const [sponsorVideosCount, setSponsorVideosCount] = useState<number>(2);
  const [sponsorCPM, setSponsorCPM] = useState<number>(25);
  const [sponsorViewsPercent, setSponsorViewsPercent] = useState<number>(80);

  // Result states
  const [adsenseMinMonthly, setAdsenseMinMonthly] = useState<number>(0);
  const [adsenseMaxMonthly, setAdsenseMaxMonthly] = useState<number>(0);
  const [sponsorMonthly, setSponsorMonthly] = useState<number>(0);
  const [totalMinMonthly, setTotalMinMonthly] = useState<number>(0);
  const [totalMaxMonthly, setTotalMaxMonthly] = useState<number>(0);

  // Active sub-section
  const [calculatorTab, setCalculatorTab] = useState<"calculator" | "strategy">("calculator");

  // Recalculate earnings when inputs change
  useEffect(() => {
    const nicheObj = NICHES.find(n => n.id === selectedNiche) || NICHES[1];
    const locObj = LOCATIONS.find(l => l.id === selectedLocation) || LOCATIONS[3];

    // AdSense calculation
    // Views are divided by 1000 to apply RPM
    const baseMinRPM = nicheObj.minRPM * locObj.multiplier;
    const baseMaxRPM = nicheObj.maxRPM * locObj.multiplier;

    const minAdsense = (monthlyViews / 1000) * baseMinRPM;
    const maxAdsense = (monthlyViews / 1000) * baseMaxRPM;

    // Sponsorship calculation
    // Sponsors pay based on CPM (per 1000 views of the video)
    // Formula: Sponsor Views = Views per video * CPM * count
    // Estimated views per video = monthlyViews / (number of videos, assumed 4-8, let's say average views per video is proportional)
    // Simpler sponsor rate: (Sponsorship videos * Views per sponsored video * Sponsor CPM) / 1000
    // We assume each sponsored video gets (monthlyViews / 8) * (sponsorViewsPercent / 100) views
    const viewsPerVideo = Math.max(1000, Math.round(monthlyViews / 6));
    const sponsoredVideoViews = viewsPerVideo * (sponsorViewsPercent / 100);
    const monthlySponsorship = sponsorVideosCount * (sponsoredVideoViews / 1000) * sponsorCPM;

    setAdsenseMinMonthly(Math.round(minAdsense));
    setAdsenseMaxMonthly(Math.round(maxAdsense));
    setSponsorMonthly(Math.round(monthlySponsorship));
    setTotalMinMonthly(Math.round(minAdsense + monthlySponsorship));
    setTotalMaxMonthly(Math.round(maxAdsense + monthlySponsorship));
  }, [monthlyViews, selectedNiche, selectedLocation, sponsorVideosCount, sponsorCPM, sponsorViewsPercent]);

  const activeNiche = NICHES.find(n => n.id === selectedNiche) || NICHES[1];
  const activeLocation = LOCATIONS.find(l => l.id === selectedLocation) || LOCATIONS[3];

  const handleCopyEstimate = () => {
    const text = `YouTube Earnings Estimate:\n- Monthly Views: ${monthlyViews.toLocaleString()}\n- Niche: ${activeNiche.name}\n- AdSense Income: $${adsenseMinMonthly.toLocaleString()} - $${adsenseMaxMonthly.toLocaleString()}/mo\n- Sponsor Income: $${sponsorMonthly.toLocaleString()}/mo\n- Total Potential: $${totalMinMonthly.toLocaleString()} - $${totalMaxMonthly.toLocaleString()}/mo\nCalculated on TranscriptG Creator Engine.`;
    navigator.clipboard.writeText(text);
    showToast("Revenue projection copied to clipboard!");
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border text-left transition-all ${
      theme === "dark" 
        ? "bg-[#0c0f1a] border-slate-800/80 shadow-2xl shadow-red-500/5" 
        : "bg-white border-slate-200 shadow-xl shadow-slate-100"
    }`} id="creator-revenue-calculator-card">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/40 dark:border-slate-800/50">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-red-500/10 text-red-400 border border-red-500/20">
              <Coins className="w-3.5 h-3.5" />
              Creator Growth Lab
            </span>
            <span className="text-[10px] text-slate-400 font-mono">v2.4 Live Data</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            YouTube Creator Revenue Calculator
          </h2>
          <p className={`text-xs mt-1 leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
            Calculate your AdSense CPM & sponsorship value. See how repurposing your videos into articles, translations, and short-clips dramatically scales your RPM.
          </p>
        </div>

        {/* Tabs switcher */}
        <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200/50 dark:border-slate-800/60 shrink-0">
          <button
            onClick={() => setCalculatorTab("calculator")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              calculatorTab === "calculator"
                ? "bg-red-500 text-white shadow-md shadow-red-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
            id="tab-calc-main"
          >
            <Calculator className="w-3.5 h-3.5" />
            Calculator
          </button>
          <button
            onClick={() => setCalculatorTab("strategy")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              calculatorTab === "strategy"
                ? "bg-red-500 text-white shadow-md shadow-red-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
            id="tab-calc-strategy"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            RPM Scaler Plan
          </button>
        </div>
      </div>

      {calculatorTab === "calculator" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Inputs Section */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Range 1: Monthly Views */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className={`text-xs font-extrabold uppercase tracking-wider ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                  Monthly Video Views
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={monthlyViews}
                    onChange={(e) => setMonthlyViews(Math.max(1000, Number(e.target.value)))}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg border text-right w-28 ${
                      theme === "dark" 
                        ? "bg-slate-950 border-slate-800 text-emerald-400" 
                        : "bg-slate-50 border-slate-200 text-emerald-600"
                    }`}
                  />
                  <span className="text-[10px] text-slate-400">views</span>
                </div>
              </div>
              <input
                type="range"
                min="5000"
                max="5000000"
                step="5000"
                value={monthlyViews}
                onChange={(e) => setMonthlyViews(Number(e.target.value))}
                className="w-full accent-red-500 h-1.5 bg-slate-200 dark:bg-slate-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>5K views</span>
                <span>500K</span>
                <span>1M</span>
                <span>2.5M</span>
                <span>5M+ views</span>
              </div>
            </div>

            {/* Select 1: Channel Niche */}
            <div className="space-y-2">
              <label className={`text-xs font-extrabold uppercase tracking-wider block ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                Channel Content Niche
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {NICHES.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setSelectedNiche(n.id)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedNiche === n.id
                        ? "bg-red-500/10 border-red-500 text-red-400 font-bold"
                        : theme === "dark"
                          ? "bg-slate-950/50 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-300"
                          : "bg-slate-50 border-slate-250 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <span className="block text-xs truncate">{n.name}</span>
                    <span className="block text-[10px] text-slate-400 font-mono mt-0.5">
                      ${n.minRPM}-${n.maxRPM} RPM
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 leading-normal italic mt-1">
                Selected niche: {activeNiche.description}
              </p>
            </div>

            {/* Select 2: Primary Audience Region */}
            <div className="space-y-2 pt-2">
              <label className={`text-xs font-extrabold uppercase tracking-wider block ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                Audience Demographics Location
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                      selectedLocation === loc.id
                        ? "bg-red-500/10 border-red-500 text-red-400"
                        : theme === "dark"
                          ? "bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-300"
                          : "bg-slate-50 border-slate-250 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 ${
                      selectedLocation === loc.id ? "bg-red-500" : "bg-slate-600"
                    }`}></span>
                    <div>
                      <span className="block text-xs font-bold">{loc.name}</span>
                      <span className="block text-[10px] text-slate-400 leading-normal mt-0.5">{loc.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Section: Sponsorship Value Simulator */}
            <div className={`p-4 rounded-2xl border ${
              theme === "dark" ? "bg-slate-950/30 border-slate-900" : "bg-slate-50 border-slate-200"
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <Tv className="w-4 h-4 text-red-500" />
                <h4 className={`text-xs font-extrabold uppercase tracking-wider ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Sponsorship Income Simulator
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sliders */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400 font-semibold">Sponsored Videos / month</span>
                      <span className="font-mono text-red-400 font-bold">{sponsorVideosCount} vids</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      value={sponsorVideosCount}
                      onChange={(e) => setSponsorVideosCount(Number(e.target.value))}
                      className="w-full accent-red-500 h-1 bg-slate-200 dark:bg-slate-900 rounded"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400 font-semibold">Sponsor CPM (Rate/1000 views)</span>
                      <span className="font-mono text-red-400 font-bold">${sponsorCPM} CPM</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="120"
                      step="5"
                      value={sponsorCPM}
                      onChange={(e) => setSponsorCPM(Number(e.target.value))}
                      className="w-full accent-red-500 h-1 bg-slate-200 dark:bg-slate-900 rounded"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400 font-semibold">Audience Retention Score</span>
                      <span className="font-mono text-red-400 font-bold">{sponsorViewsPercent}% views</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      step="5"
                      value={sponsorViewsPercent}
                      onChange={(e) => setSponsorViewsPercent(Number(e.target.value))}
                      className="w-full accent-red-500 h-1 bg-slate-200 dark:bg-slate-900 rounded"
                    />
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-100/60 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50">
                    <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">Estimated Views Per Sponsored Video</span>
                    <span className={`text-sm font-black block font-mono mt-0.5 ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
                      {Math.round((Math.max(1000, monthlyViews / 6)) * (sponsorViewsPercent / 100)).toLocaleString()} <span className="text-[10px] text-slate-500">views</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Outputs/Projection Card Section */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className={`p-5 sm:p-6 rounded-2xl border overflow-hidden relative ${
              theme === "dark" 
                ? "bg-slate-950 border-slate-800/80 shadow-inner" 
                : "bg-slate-50 border-slate-250 shadow-sm"
            }`}>
              {/* Overlay pulse decoration */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-500/10 rounded-full blur-[40px] pointer-events-none"></div>

              <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block mb-4">
                ESTIMATED MONTHLY EARNINGS
              </span>

              {/* Range block */}
              <div className="mb-6">
                <span className="text-slate-400 text-xs block font-bold uppercase tracking-wider">Total Combined Projected Revenue</span>
                <div className="flex items-baseline gap-2 mt-1 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                    ${totalMinMonthly.toLocaleString()}
                  </span>
                  <span className="text-slate-400 font-bold text-lg">to</span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                    ${totalMaxMonthly.toLocaleString()}
                  </span>
                  <span className="text-slate-500 text-sm font-bold">/mo</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Yearly Projection: <strong className="text-emerald-400">${(totalMinMonthly * 12).toLocaleString()} - ${(totalMaxMonthly * 12).toLocaleString()} / year</strong>
                </span>
              </div>

              {/* Progress bar split display */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-red-500 block"></span>
                    AdSense Share
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-blue-500 block"></span>
                    Sponsorships Share
                  </span>
                </div>
                
                {/* Bar */}
                <div className="w-full h-3.5 rounded-full bg-slate-800/50 overflow-hidden flex">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-rose-600 transition-all duration-350"
                    style={{ width: `${Math.max(10, Math.min(90, (adsenseMaxMonthly / (adsenseMaxMonthly + sponsorMonthly || 1)) * 100))}%` }}
                  ></div>
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-sky-600 transition-all duration-350"
                    style={{ width: `${Math.max(10, Math.min(90, (sponsorMonthly / (adsenseMaxMonthly + sponsorMonthly || 1)) * 100))}%` }}
                  ></div>
                </div>
              </div>

              {/* Revenue Breakdowns */}
              <div className="space-y-3.5 border-t border-slate-200/40 dark:border-slate-800/80 pt-4 mb-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <BadgeDollarSign className="w-3.5 h-3.5 text-red-500" />
                    AdSense Revenue:
                  </span>
                  <span className={`font-mono font-bold ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
                    ${adsenseMinMonthly.toLocaleString()} - ${adsenseMaxMonthly.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Tv className="w-3.5 h-3.5 text-blue-400" />
                    Sponsorship Estimate:
                  </span>
                  <span className={`font-mono font-bold ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
                    ${sponsorMonthly.toLocaleString()} /mo
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-yellow-500" />
                    Calculated average RPM:
                  </span>
                  <span className={`font-mono font-bold ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
                    ${(activeNiche.minRPM * activeLocation.multiplier).toFixed(2)} - ${(activeNiche.maxRPM * activeLocation.multiplier).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleCopyEstimate}
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-black bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  id="btn-copy-calc-results"
                >
                  <Share2 className="w-3.5 h-3.5 text-red-400" />
                  Copy Estimate
                </button>
                <button
                  onClick={() => {
                    if (onActivateTool) {
                      onActivateTool("seo");
                    } else {
                      const el = document.getElementById("active-tool-workspace");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                    showToast("Jumped to YouTube SEO Toolkit to optimize CTR!");
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-black bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/10 transition-all cursor-pointer flex items-center justify-center gap-1"
                  id="btn-boost-rpm-link"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                  Boost My RPM
                </button>
              </div>

            </div>

            {/* Quick Tips Box */}
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
              theme === "dark" 
                ? "bg-slate-950/20 border-slate-900 text-slate-400" 
                : "bg-slate-50 border-slate-200 text-slate-600"
            }`}>
              <div className="flex gap-2">
                <Info className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className={`font-extrabold block mb-1 ${theme === "dark" ? "text-slate-300" : "text-slate-800"}`}>
                    Did you know?
                  </span>
                  Translating your video transcripts into languages like **Spanish or French** (using our free Subtitle Translator) can expand your viewership into Tier 2 European countries, lifting your weighted RPM average by **up to 40%**!
                </div>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Strategy Plan Tab */
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Strategy Step 1 */}
            <div className={`p-5 rounded-2xl border text-left space-y-3 ${
              theme === "dark" ? "bg-slate-950/50 border-slate-900" : "bg-slate-50 border-slate-200"
            }`}>
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400 font-extrabold text-sm">
                1
              </div>
              <h4 className={`text-sm font-black tracking-tight ${theme === "dark" ? "text-white" : "text-slate-950"}`}>
                Multi-Language Localization
              </h4>
              <p className={`text-xs leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                Don't settle for English-only. Over 70% of YouTube views are non-English. Run your script transcripts through our **YouTube Subtitle Translator** to output multi-lingual captions immediately, capturing massive global search traffic.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    if (onActivateTool) {
                      onActivateTool("translation");
                    } else {
                      const el = document.getElementById("active-tool-workspace");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                    showToast("Loading subtitle translator tool...");
                  }}
                  className="text-xs font-bold text-red-400 flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0"
                >
                  Load Translator Tool <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Strategy Step 2 */}
            <div className={`p-5 rounded-2xl border text-left space-y-3 ${
              theme === "dark" ? "bg-slate-950/50 border-slate-900" : "bg-slate-50 border-slate-200"
            }`}>
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400 font-extrabold text-sm">
                2
              </div>
              <h4 className={`text-sm font-black tracking-tight ${theme === "dark" ? "text-white" : "text-slate-950"}`}>
                Repurpose Video into SEO Blogs
              </h4>
              <p className={`text-xs leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                AdSense RPM for written blog websites is often **3x higher** than video RPM! Take your YouTube transcripts and convert them into fully formatted web articles using our **AI Blog Generator** to earn double ad revenue.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    if (onActivateTool) {
                      onActivateTool("blog");
                    } else {
                      const el = document.getElementById("active-tool-workspace");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                    showToast("Loading AI Blog Generator tool...");
                  }}
                  className="text-xs font-bold text-red-400 flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0"
                >
                  Load Blog Generator <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Strategy Step 3 */}
            <div className={`p-5 rounded-2xl border text-left space-y-3 ${
              theme === "dark" ? "bg-slate-950/50 border-slate-900" : "bg-slate-50 border-slate-200"
            }`}>
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400 font-extrabold text-sm">
                3
              </div>
              <h4 className={`text-sm font-black tracking-tight ${theme === "dark" ? "text-white" : "text-slate-950"}`}>
                Maximize Click-Through Rate (CTR)
              </h4>
              <p className={`text-xs leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                A 2% increase in CTR can double your monthly views! Draft higher-converting titles with our **AI YouTube SEO Toolkit** and grab high-impact thumbnail designs with our **Thumbnail Downloader** to conquer competitors.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    if (onActivateTool) {
                      onActivateTool("seo");
                    } else {
                      const el = document.getElementById("active-tool-workspace");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                    showToast("Loading AI YouTube SEO Toolkit...");
                  }}
                  className="text-xs font-bold text-red-400 flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0"
                >
                  Load SEO Toolkit <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

          <div className={`p-5 rounded-2xl border ${
            theme === "dark" ? "bg-slate-950 border-slate-900" : "bg-slate-50 border-slate-200"
          }`}>
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <h4 className={`text-sm font-black tracking-tight ${theme === "dark" ? "text-white" : "text-slate-950"}`}>
                  The 10x Creator Monetization Formula
                </h4>
                <p className={`text-xs mt-1 leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  Top creators don't rely solely on AdSense. By using **TranscriptG** to transcribe, translate, summarize, and blog-ify your video library, you multiply your exposure by **10x** on Google Search, Pinterest, and Twitter, opening highly lucrative premium sponsorship integrations.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
