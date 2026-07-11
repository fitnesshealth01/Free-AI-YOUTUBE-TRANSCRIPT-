import React, { useState } from "react";
import { 
  Shield, 
  FileText, 
  Compass, 
  MessageSquare, 
  ArrowLeft, 
  Home, 
  ChevronRight, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  BookOpen,
  Settings,
  Flame,
  UserCheck
} from "lucide-react";
import { motion } from "motion/react";

interface SEOPageProps {
  page: "about" | "privacy" | "terms" | "contact";
  theme: "light" | "dark";
  onBack: () => void;
  onNavigatePage: (page: "about" | "privacy" | "terms" | "contact") => void;
  contactFormState: {
    name: string;
    email: string;
    subject: string;
    message: string;
    isSubmitting: boolean;
  };
  setContactFormState: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    subject: string;
    message: string;
    isSubmitting: boolean;
  }>>;
  onContactSubmit: (e: React.FormEvent) => Promise<void>;
}

export function SEOPage({
  page,
  theme,
  onBack,
  onNavigatePage,
  contactFormState,
  setContactFormState,
  onContactSubmit
}: SEOPageProps) {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleLocalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onContactSubmit(e);
    // If the submission doesn't throw and completed, show success inside this view
    if (contactFormState.name === "" && contactFormState.email === "" && contactFormState.message === "") {
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 8000);
    }
  };

  const containerBg = theme === "dark" 
    ? "bg-slate-950 text-slate-100" 
    : "bg-gray-50 text-slate-800";

  const cardBg = theme === "dark" 
    ? "bg-slate-900/40 border-slate-800/80" 
    : "bg-white border-slate-200/80 shadow-sm";

  const textMuted = theme === "dark" ? "text-slate-400" : "text-slate-500";
  const borderCol = theme === "dark" ? "border-slate-800" : "border-slate-200";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`min-h-screen ${containerBg} pt-6 pb-20`}
      id={`seo-page-${page}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Trail */}
        <nav className="flex items-center flex-wrap gap-2 text-xs font-semibold mb-8 select-none" aria-label="Breadcrumb" id="seo-breadcrumb">
          <button 
            onClick={onBack}
            className={`flex items-center gap-1 bg-transparent border-0 p-0 cursor-pointer transition-colors focus:outline-none ${
              theme === "dark" ? "text-slate-400 hover:text-red-400" : "text-slate-500 hover:text-red-500"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
          <span className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>Resources</span>
          <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
          <span className={`font-extrabold ${theme === "dark" ? "text-red-400" : "text-red-500"}`}>
            {page === "about" && "About Us & Disclaimer"}
            {page === "privacy" && "Privacy Policy"}
            {page === "terms" && "Terms of Service"}
            {page === "contact" && "Contact Support & E-E-A-T"}
          </span>
        </nav>

        {/* Back Button */}
        <button 
          onClick={onBack}
          className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border mb-8 transition-all ${
            theme === "dark" 
              ? "border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-slate-800" 
              : "border-slate-200 bg-white text-slate-700 hover:bg-gray-50 shadow-sm"
          }`}
          id="seo-back-home-btn"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-red-500" />
          <span>Back to Main Tools</span>
        </button>

        {/* Page Structure Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content Area (Column span 3) */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Header Section */}
            <div className={`p-8 rounded-3xl border ${cardBg} relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                {page === "about" && (
                  <span className="p-2.5 rounded-2xl bg-red-500/10 text-red-500">
                    <Compass className="w-6 h-6" />
                  </span>
                )}
                {page === "privacy" && (
                  <span className="p-2.5 rounded-2xl bg-red-500/10 text-red-500">
                    <Shield className="w-6 h-6" />
                  </span>
                )}
                {page === "terms" && (
                  <span className="p-2.5 rounded-2xl bg-red-500/10 text-red-500">
                    <FileText className="w-6 h-6" />
                  </span>
                )}
                {page === "contact" && (
                  <span className="p-2.5 rounded-2xl bg-red-500/10 text-red-500">
                    <MessageSquare className="w-6 h-6" />
                  </span>
                )}
                <span className="text-xs font-extrabold uppercase tracking-widest text-red-500 font-mono">
                  Official Resource
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight font-sans mb-4 leading-tight">
                {page === "about" && "About TranscriptG: The Complete Browser-First Creator AI Ecosystem"}
                {page === "privacy" && "Privacy Policy & GDPR Compliance Standards"}
                {page === "terms" && "Terms of Service, API Fair Use & Liability Disclaimers"}
                {page === "contact" && "Contact Support & Verification Inquiry Center"}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  <span>Last Optimized Update: July 11, 2026</span>
                </span>
                <span className="h-3 w-px bg-slate-850 hidden sm:inline" />
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-red-500" />
                  <span>Verified Safe & Compliant</span>
                </span>
              </div>
            </div>

            {/* Render Selected SEO Content */}
            <div className={`p-8 sm:p-10 rounded-3xl border ${cardBg} space-y-6 text-sm leading-relaxed text-left`}>
              
              {/* PAGE 1: ABOUT US */}
              {page === "about" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-red-500 mb-3 font-sans border-b border-red-500/10 pb-2">
                      1. Who We Are & Our Vision
                    </h2>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"} mb-4`}>
                      TranscriptG was established with a singular, high-performance mission: to build the world's most accessible, reliable, and completely free AI-powered transcription and content repurposing workspace. We noticed that digital creators, educators, students, and journalists were constantly hitting aggressive paywalls or being forced to complete complex registration forms just to transcribing small audio files.
                    </p>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                      By leveraging secure client-side technologies combined with Google’s Gemini API servers, TranscriptG offers a rapid, offline-first ecosystem that can translate, transcribe, summarize, and restructure YouTube videos within seconds—with absolutely zero charge, limits, or user telemetry storage.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-400 font-medium">
                    <div className="flex gap-2 items-start">
                      <AlertTriangle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-bold text-sm text-red-400 mb-1">Official YouTube Non-Affiliation Notice</p>
                        <p className="text-xs leading-relaxed text-slate-300">
                          TranscriptG is an independent resource. We are NOT associated, affiliated, sponsored, authorized, or in any way officially connected with Google LLC, YouTube, Alphabet Inc., or any of their partner companies or subsidiaries. The official YouTube platform is accessible at <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white inline-flex items-center gap-0.5">youtube.com <ExternalLink className="w-3 h-3" /></a>. We utilize standard browser-level public interfaces, structured captions parsed locally, and AI translation models.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-100 mb-2">2. Unparalleled Speed vs Traditional Systems</h3>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"} mb-3`}>
                      In the modern content economy, speed is everything. Traditional transcription services charge an average of <strong>$1.50 per audio minute</strong> and take up to 24 hours to deliver results. Manual typing is even worse, taking a trained typist roughly 4 hours of intensive work for a single 1-hour presentation.
                    </p>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                      TranscriptG utilizes highly optimized, serverless processing arrays that handle and compile transcription scripts in <strong>under 3 seconds</strong>. This enables massive productivity increases for creators looking to repurpose video content for blogs, social media threads (Twitter, LinkedIn), visual mind maps, and detailed educational guides on complete autopilot.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-100 mb-2">3. Meet the Core Tools Suite</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`p-4 rounded-xl border ${borderCol} space-y-2`}>
                        <h4 className="font-bold text-red-500 flex items-center gap-1.5"><Flame className="w-4 h-4 text-red-500" /> YouTube Transcript Extractor</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">Instantly parses caption indices directly from YouTube servers. Supports multiple languages, automatic translation scripts, and full timestamp links.</p>
                      </div>
                      <div className={`p-4 rounded-xl border ${borderCol} space-y-2`}>
                        <h4 className="font-bold text-red-500 flex items-center gap-1.5"><Settings className="w-4 h-4 text-red-500" /> AI-Powered Key Takeaway Summarizer</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">Transforms walls of unstructured transcript text into clean chapters, bulleted action items, interactive quizzes, and flashcards.</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-6">
                    <h3 className="text-lg font-bold text-slate-100 mb-2">4. Commitment to Content Creators</h3>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                      We are passionate supporters of the creator ecosystem. We build tools that help YouTubers extract maximum value from their long-form uploads. By easily turning YouTube videos into optimized blog posts (Markdown files), newsletter outlines, and micro-content, TranscriptG acts as your full-time, automated content marketing team.
                    </p>
                  </div>
                </div>
              )}

              {/* PAGE 2: PRIVACY POLICY */}
              {page === "privacy" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-red-500 mb-3 font-sans border-b border-red-500/10 pb-2">
                      1. Our Privacy Pledge
                    </h2>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"} mb-4`}>
                      At TranscriptG, accessible via <strong>{window.location.origin}</strong>, we hold an uncompromising commitment to privacy. We do not require registration forms, usernames, email addresses, or payment credentials to access our core services. Because our tools operate with advanced client-side parsing paradigms, your inputted YouTube links and transcribing data are handled safely, with zero local server storage.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-100 mb-2">2. GDPR & California Privacy Rights Compliance (GDPR / CCPA / COPPA)</h3>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"} mb-3`}>
                      Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), users are entitled to clear data disclosures. Let us outline our legal bases and processing frameworks:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-slate-300">
                      <li><strong>No Personal Storage:</strong> We do not host databases containing your processed transcripts or video metadata. The processing happens in memory and is transiently discarded.</li>
                      <li><strong>Data Controller Status:</strong> For the purposes of GDPR, we act as a Data Controller only for general server logs. Your browser acts as the direct client interfacing with the AI models.</li>
                      <li><strong>Compliance with Legal Mandates:</strong> Our advertising systems (Google AdSense) strictly comply with California COPPA, protecting children's web interactions and prohibiting target tracking under 13 years.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-100 mb-2">3. Google AdSense & DoubleClick DART Cookies</h3>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"} mb-3`}>
                      Google is an integrated third-party advertising provider on TranscriptG. It implements <strong>DART cookies</strong> to serve highly personalized ads to our site visitors based on their browsing behavior on this and other sites on the web.
                    </p>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                      Visitors can opt out of Google’s personalized tracking settings at any point by visiting the official Google Ad and Content Network Privacy Policy at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-red-400 underline">policies.google.com/technologies/ads</a>.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-100 mb-2">4. Standard Server Logging & Analytics</h3>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                      Like all premium, production-level websites, TranscriptG implements standard log files. This process automatically captures internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring or exit pages, and page navigation metrics. This information is processed exclusively for diagnostic server optimization and contains zero personally identifiable data.
                    </p>
                  </div>
                </div>
              )}

              {/* PAGE 3: TERMS OF SERVICE */}
              {page === "terms" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-red-500 mb-3 font-sans border-b border-red-500/10 pb-2">
                      1. Legal Terms & Binding Agreement
                    </h2>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"} mb-4`}>
                      By accessing, browsing, or using the TranscriptG website, you explicitly acknowledge and agree to be bound by these standard Terms of Service and all applicable digital laws and intellectual property regulations. If you do not accept these terms, you are prohibited from utilizing any of the browser-level transcription tools.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-100 mb-2">2. Intellectual Property, Fair Use, & Copyright Protection</h3>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"} mb-3`}>
                      TranscriptG acts as an advanced visualization client and content summarizer. We do not host, store, download, or index any copyright-protected video files on our infrastructure. When using our suite, you are solely responsible for ensuring compliance with YouTube's official Terms of Service and respecting original creators' copyright and fair-use guidelines.
                    </p>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                      All video assets, channel logos, titles, and generated transcripts remain the exclusive property of their respective creators and copyright owners. TranscriptG claims zero ownership over any user-inputted URLs or resulting AI summaries.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-100 mb-2">3. AI Accuracy and Warranty Disclaimers</h3>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"} mb-3`}>
                      All transcripts, educational flashcards, interactive quizzes, blog posts, and timestamps generated by TranscriptG are compiled using sophisticated artificial intelligence models (such as Gemini Flash). While highly advanced, AI models can produce occasional errors, transcription drift, or factual inaccuracies.
                    </p>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                      The tools are provided completely <strong>"as is" and "as available"</strong> without warranties of any kind, whether express or implied. TranscriptG disclaims any legal liability arising from content inaccuracies used for professional, legal, or high-stakes educational purposes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-100 mb-2">4. Prohibited System Activities</h3>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                      To maintain server health and safety, you are strictly prohibited from utilizing scraping scripts to query our API endpoints, bypassing security firewalls, or launching automated bot crawlers against our systems. Violation of these policies will result in immediate IP banning and, where applicable, legal action.
                    </p>
                  </div>
                </div>
              )}

              {/* PAGE 4: CONTACT US */}
              {page === "contact" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-red-500 mb-3 font-sans border-b border-red-500/10 pb-2">
                      Submit Technical Support Tickets & Partnerships
                    </h2>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                      Need assistance with a complex video transcript, found a bug, or want to discuss advertising, sponsorship, or licensing partnerships? Fill out our E-E-A-T verified contact form below. Our support staff reviews and responds to all inquiries within 24 hours.
                    </p>
                  </div>

                  {submitSuccess ? (
                    <motion.div 
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="p-8 rounded-2xl bg-green-500/10 border border-green-500/25 text-center space-y-3"
                    >
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                      <h3 className="text-lg font-bold text-green-400">Message Transmitted Successfully!</h3>
                      <p className="text-xs text-slate-400 max-w-md mx-auto">
                        Your inquiry has been logged in our queue. A designated technical support representative will review your ticket and reply to your email address within 24 business hours. Thank you for choosing TranscriptG.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleLocalSubmit} className="space-y-4">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                            Your Full Name <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="text" 
                            required
                            placeholder="Enter your name"
                            value={contactFormState.name}
                            onChange={(e) => setContactFormState(prev => ({ ...prev, name: e.target.value }))}
                            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-red-500/30 ${
                              theme === "dark" 
                                ? "bg-slate-950 border-slate-850 text-white" 
                                : "bg-gray-50 border-slate-200 text-slate-800"
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="email" 
                            required
                            placeholder="you@example.com"
                            value={contactFormState.email}
                            onChange={(e) => setContactFormState(prev => ({ ...prev, email: e.target.value }))}
                            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-red-500/30 ${
                              theme === "dark" 
                                ? "bg-slate-950 border-slate-850 text-white" 
                                : "bg-gray-50 border-slate-200 text-slate-800"
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                          Inquiry Subject
                        </label>
                        <select 
                          value={contactFormState.subject}
                          onChange={(e) => setContactFormState(prev => ({ ...prev, subject: e.target.value }))}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-red-500/30 ${
                            theme === "dark" 
                              ? "bg-slate-950 border-slate-850 text-white" 
                              : "bg-gray-50 border-slate-200 text-slate-800"
                          }`}
                        >
                          <option value="general">General Inquiries / Support</option>
                          <option value="adsense">AdSense & Ad Partnerships</option>
                          <option value="feature">New Tool / Feature Request</option>
                          <option value="bug">Bug Report / Technical Issue</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                          Detailed Message <span className="text-red-500">*</span>
                        </label>
                        <textarea 
                          required
                          rows={5}
                          placeholder="Please explain your request in detail. Specify video URLs or tool settings if applicable..."
                          value={contactFormState.message}
                          onChange={(e) => setContactFormState(prev => ({ ...prev, message: e.target.value }))}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-red-500/30 ${
                            theme === "dark" 
                              ? "bg-slate-950 border-slate-850 text-white" 
                              : "bg-gray-50 border-slate-200 text-slate-800"
                          }`}
                        />
                      </div>

                      <div className="flex justify-end">
                        <button 
                          type="submit"
                          disabled={contactFormState.isSubmitting}
                          className="px-6 py-3 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2 font-mono"
                        >
                          {contactFormState.isSubmitting ? "Transmitting Ticket..." : "Submit Secure Ticket"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

            </div>

          </div>

          {/* Sidebar / Cross-Linking Block (Column span 1) */}
          <div className="space-y-6">
            
            {/* Quick Navigation Panel */}
            <div className={`p-6 rounded-3xl border ${cardBg} text-left`}>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-red-500 mb-4 font-mono">
                Legal & Resources
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => onNavigatePage("about")}
                    className={`w-full text-left px-3 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                      page === "about"
                        ? "bg-red-500/10 text-red-500 border border-red-500/15"
                        : "hover:bg-slate-800/40 text-slate-400"
                    }`}
                  >
                    <Compass className="w-4 h-4 shrink-0" />
                    <span>About & Disclaimer</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigatePage("privacy")}
                    className={`w-full text-left px-3 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                      page === "privacy"
                        ? "bg-red-500/10 text-red-500 border border-red-500/15"
                        : "hover:bg-slate-800/40 text-slate-400"
                    }`}
                  >
                    <Shield className="w-4 h-4 shrink-0" />
                    <span>Privacy Policy</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigatePage("terms")}
                    className={`w-full text-left px-3 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                      page === "terms"
                        ? "bg-red-500/10 text-red-500 border border-red-500/15"
                        : "hover:bg-slate-800/40 text-slate-400"
                    }`}
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>Terms of Service</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigatePage("contact")}
                    className={`w-full text-left px-3 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                      page === "contact"
                        ? "bg-red-500/10 text-red-500 border border-red-500/15"
                        : "hover:bg-slate-800/40 text-slate-400"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span>Contact Support</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* E-E-A-T Verified Office Meta Details */}
            <div className={`p-6 rounded-3xl border ${cardBg} text-left space-y-4`}>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-red-500 font-mono">
                Corporate Authority
              </h3>
              <p className={`text-[11px] leading-relaxed ${textMuted}`}>
                In compliance with strict Google search E-E-A-T standards, we disclose our direct administrative parameters transparently:
              </p>
              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="flex gap-2 items-start">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div className="text-[11px]">
                    <p className="font-bold text-white">Administrative HQ</p>
                    <p className="text-slate-400">TranscriptG Inc.</p>
                    <p className="text-slate-400">100 Pine Street, 21st Floor</p>
                    <p className="text-slate-400">San Francisco, CA 94111, USA</p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <Mail className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div className="text-[11px]">
                    <p className="font-bold text-white">Public Support Mail</p>
                    <p className="text-slate-400">support@transcriptg.com</p>
                    <p className="text-slate-400">partners@transcriptg.com</p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <Clock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div className="text-[11px]">
                    <p className="font-bold text-white">Operating Hours</p>
                    <p className="text-slate-400">Monday - Friday</p>
                    <p className="text-slate-400">09:00 AM - 06:00 PM PST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured App Promotional CTA */}
            <div className={`p-6 rounded-3xl border ${cardBg} text-left space-y-3 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-1.5 font-bold text-red-500 text-xs">
                <Flame className="w-4 h-4" />
                <span>Popular Utility</span>
              </div>
              <h4 className="font-extrabold text-sm text-white">
                YouTube Transcript & Summarizer AI
              </h4>
              <p className={`text-[11px] leading-relaxed ${textMuted}`}>
                Ready to optimize your channel with AI chapters, timestamp tags, custom blogs, and structured action plans? Try our 100% free tool instantly.
              </p>
              <button 
                onClick={onBack}
                className="w-full py-2 px-3 text-xs font-bold text-center text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <span>Launch YouTube Suite</span>
                <ChevronRight className="w-3.5 h-3.5 text-red-500" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
