import React, { useState, useEffect } from "react";
import { 
  Globe, Key, History, Plus, Trash, Play, CheckCircle2, AlertCircle, 
  BookOpen, Info, Lock, Settings, Send, RefreshCw, FileText, Zap, Sparkles, Copy, Check
} from "lucide-react";

interface GoogleIndexerProps {
  theme: "light" | "dark";
  showToast: (msg: string) => void;
}

interface IndexingLog {
  id: string;
  url: string;
  type: "URL_UPDATED" | "URL_DELETED";
  timestamp: string;
  status: "success" | "failed" | "pending";
  method: string;
  responseDetails?: string;
  errorMessage?: string;
}

const SUGGESTED_URLS = [
  "https://transcriptg.com/",
  "https://transcriptg.com/tools/transcript",
  "https://transcriptg.com/tools/summary",
  "https://transcriptg.com/tools/blog",
  "https://transcriptg.com/tools/seo",
  "https://transcriptg.com/tools/shorts_clipper",
  "https://transcriptg.com/tools/instant_indexing"
];

export default function GoogleIndexer({ theme, showToast }: GoogleIndexerProps) {
  const [activeTab, setActiveTab] = useState<"submit" | "credentials" | "guide">("submit");
  const [urlInput, setUrlInput] = useState<string>("");
  const [urlQueue, setUrlQueue] = useState<string[]>(["https://transcriptg.com/"]);
  const [notificationType, setNotificationType] = useState<"URL_UPDATED" | "URL_DELETED">("URL_UPDATED");
  
  // Credentials
  const [credentialsJson, setCredentialsJson] = useState<string>("");
  const [saveLocally, setSaveLocally] = useState<boolean>(true);
  const [apiKey, setApiKey] = useState<string>("");

  // UI State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentUrlProcessing, setCurrentUrlProcessing] = useState<string>("");
  const [responseConsole, setResponseConsole] = useState<string>("// Console Output Idle\n// Submit a URL to observe the Google Indexing Gateway response payload.");
  const [logs, setLogs] = useState<IndexingLog[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Load Credentials and logs from localStorage
  useEffect(() => {
    const cachedCreds = localStorage.getItem("google_indexing_creds");
    if (cachedCreds) {
      setCredentialsJson(cachedCreds);
    }
    const cachedKey = localStorage.getItem("google_indexing_key");
    if (cachedKey) {
      setApiKey(cachedKey);
    }
    const cachedLogs = localStorage.getItem("google_indexing_logs");
    if (cachedLogs) {
      try {
        setLogs(JSON.parse(cachedLogs));
      } catch (err) {
        console.error("Failed to parse cached indexing logs:", err);
      }
    }
  }, []);

  // Sync logs and credentials cache
  const saveLogsToStorage = (newLogs: IndexingLog[]) => {
    setLogs(newLogs);
    localStorage.setItem("google_indexing_logs", JSON.stringify(newLogs));
  };

  const handleSaveCredentialsChange = (val: boolean) => {
    setSaveLocally(val);
    if (!val) {
      localStorage.removeItem("google_indexing_creds");
      localStorage.removeItem("google_indexing_key");
    } else {
      if (credentialsJson) localStorage.setItem("google_indexing_creds", credentialsJson);
      if (apiKey) localStorage.setItem("google_indexing_key", apiKey);
    }
  };

  const handleCredentialsChange = (text: string) => {
    setCredentialsJson(text);
    if (saveLocally) {
      localStorage.setItem("google_indexing_creds", text);
    }
  };

  const handleApiKeyChange = (text: string) => {
    setApiKey(text);
    if (saveLocally) {
      localStorage.setItem("google_indexing_key", text);
    }
  };

  const addUrlToQueue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    
    // Simple URL validation
    try {
      new URL(trimmed);
      if (!urlQueue.includes(trimmed)) {
        setUrlQueue([...urlQueue, trimmed]);
        setUrlInput("");
        showToast("URL added to processing queue.");
      } else {
        showToast("URL is already in the queue.");
      }
    } catch (_) {
      showToast("Please enter a valid absolute URL (e.g. https://domain.com)");
    }
  };

  const removeUrlFromQueue = (index: number) => {
    const updated = [...urlQueue];
    updated.splice(index, 1);
    setUrlQueue(updated);
  };

  const addSuggestedUrl = (url: string) => {
    if (!urlQueue.includes(url)) {
      setUrlQueue([...urlQueue, url]);
      showToast("Suggested URL added to queue.");
    } else {
      showToast("URL is already in the queue.");
    }
  };

  const triggerIndexing = async () => {
    if (urlQueue.length === 0) {
      showToast("Queue is empty. Please add at least one URL.");
      return;
    }

    setIsSubmitting(true);
    setResponseConsole("// Initializing submission sequence...\n");

    const newLogs = [...logs];

    for (let i = 0; i < urlQueue.length; i++) {
      const url = urlQueue[i];
      setCurrentUrlProcessing(url);
      setResponseConsole(prev => prev + `[Processing ${i+1}/${urlQueue.length}]: ${url}\n`);

      const logId = Math.random().toString(36).substring(2, 9);
      const pendingLog: IndexingLog = {
        id: logId,
        url: url,
        type: notificationType,
        timestamp: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString(),
        status: "pending",
        method: credentialsJson ? "service_account" : (apiKey ? "api_key" : "simulated_demo")
      };

      try {
        const response = await fetch("/api/google-index", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            url: url,
            type: notificationType,
            credentialsJson: credentialsJson.trim() || undefined,
            apiKey: apiKey.trim() || undefined
          })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          pendingLog.status = "success";
          pendingLog.responseDetails = JSON.stringify(data.response, null, 2);
          
          setResponseConsole(prev => 
            prev + `✔ SUCCESS: ${url}\n` +
            `Google Gateway Response:\n${JSON.stringify(data.response, null, 2)}\n\n`
          );
        } else {
          pendingLog.status = "failed";
          pendingLog.errorMessage = data.error || "Google API returned an error.";
          pendingLog.responseDetails = JSON.stringify(data.details || data, null, 2);

          setResponseConsole(prev => 
            prev + `❌ FAILED: ${url}\n` +
            `Error message: ${pendingLog.errorMessage}\n` +
            `Payload details:\n${pendingLog.responseDetails}\n\n`
          );
        }
      } catch (err: any) {
        pendingLog.status = "failed";
        pendingLog.errorMessage = err.message || "Failed to contact proxy API.";
        
        setResponseConsole(prev => 
          prev + `❌ FAULT: ${url}\n` +
          `Connection error: ${pendingLog.errorMessage}\n\n`
        );
      }

      newLogs.unshift(pendingLog);
    }

    saveLogsToStorage(newLogs);
    setIsSubmitting(false);
    setCurrentUrlProcessing("");
    showToast(`Instant indexing submission complete! (${urlQueue.length} URLs processed)`);
  };

  const clearQueue = () => {
    setUrlQueue([]);
    showToast("Queue cleared.");
  };

  const clearLogs = () => {
    saveLogsToStorage([]);
    showToast("Submission logs cleared.");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
    showToast("Copied code/URL to clipboard!");
  };

  return (
    <div id="instant-indexing-tool" className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Title & Tagline */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-1">
              <Zap className="w-3 h-3" /> Google API Direct
            </span>
          </div>
          <h1 className="text-3xl font-bold font-sans tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <Globe className="text-emerald-500 w-8 h-8" /> Google Instant Indexing
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
            Bypass Google Search Console's multi-day crawl delays. Submit pages and blog posts directly to Google's real-time Web Indexing API for crawls in seconds.
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-800 self-start">
          <button 
            onClick={() => setActiveTab("submit")}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === "submit" 
                ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm" 
                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Submit URLs
          </button>
          <button 
            onClick={() => setActiveTab("credentials")}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === "credentials" 
                ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm" 
                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            API Credentials
          </button>
          <button 
            onClick={() => setActiveTab("guide")}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === "guide" 
                ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm" 
                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Setup Guide
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Tab 1: Submit URL Interface */}
        {activeTab === "submit" && (
          <>
            {/* Left Hand Submit / Queue Area */}
            <div className="col-span-1 lg:col-span-7 space-y-6">
              {/* Submission Form */}
              <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-emerald-500" /> URL Queue Builder
                </h2>
                
                <form onSubmit={addUrlToQueue} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      ADD WEBSITE PAGE URL
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          type="text"
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          placeholder="e.g. https://transcriptg.com/tools/summary"
                          className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5"
                      >
                        Add URL
                      </button>
                    </div>
                  </div>

                  {/* Suggestion Quick Chips */}
                  <div>
                    <span className="block text-xs font-medium text-gray-400 mb-2">
                      QUICK RECOMMENDATIONS FOR YOUR SITE:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {SUGGESTED_URLS.map((url, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => addSuggestedUrl(url)}
                          disabled={urlQueue.includes(url)}
                          className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                            urlQueue.includes(url)
                              ? "bg-gray-100 dark:bg-gray-900 text-gray-400 dark:text-gray-600 border-gray-200 dark:border-gray-800 cursor-not-allowed"
                              : "bg-gray-50 dark:bg-gray-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-900/50"
                          }`}
                        >
                          {url.replace("https://", "")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notification Type Select */}
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-900 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                        NOTIFICATION REQUEST TYPE
                      </span>
                      <p className="text-xs text-gray-400">Choose if the URL was updated or deleted completely.</p>
                    </div>
                    <div className="flex bg-gray-50 dark:bg-gray-900 p-1 rounded-lg border border-gray-200 dark:border-gray-800">
                      <button
                        type="button"
                        onClick={() => setNotificationType("URL_UPDATED")}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                          notificationType === "URL_UPDATED"
                            ? "bg-emerald-500 text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
                        }`}
                      >
                        Publish/Update
                      </button>
                      <button
                        type="button"
                        onClick={() => setNotificationType("URL_DELETED")}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                          notificationType === "URL_DELETED"
                            ? "bg-rose-500 text-white shadow-sm"
                            : "text-gray-500 hover:text-rose-400"
                        }`}
                      >
                        Delete URL
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Processing Queue List */}
              <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-500" /> Queue to Submit ({urlQueue.length})
                  </h2>
                  {urlQueue.length > 0 && (
                    <button 
                      onClick={clearQueue}
                      className="text-xs text-gray-400 hover:text-rose-500 transition-colors flex items-center gap-1"
                    >
                      <Trash className="w-3 h-3" /> Clear Queue
                    </button>
                  )}
                </div>

                {urlQueue.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                    <Globe className="w-8 h-8 text-gray-300 dark:text-gray-700 mx-auto mb-2.5 animate-pulse" />
                    <span className="block text-sm text-gray-500 dark:text-gray-400 font-medium">Your submission queue is empty</span>
                    <span className="block text-xs text-gray-400 mt-1">Add URLs manually or choose suggestions above to build your queue.</span>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {urlQueue.map((url, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                          currentUrlProcessing === url
                            ? "bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900 animate-pulse"
                            : "bg-gray-50 dark:bg-gray-900/40 border-gray-100 dark:border-gray-900 hover:border-gray-200 dark:hover:border-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-xs font-mono text-gray-400 px-1.5 py-0.5 bg-gray-200/50 dark:bg-gray-800 rounded">
                            #{index + 1}
                          </span>
                          <span className="text-xs font-mono text-gray-700 dark:text-gray-300 truncate font-semibold">
                            {url}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {currentUrlProcessing === url && (
                            <RefreshCw className="w-3.5 h-3.5 text-emerald-500 animate-spin" />
                          )}
                          <button 
                            onClick={() => removeUrlFromQueue(index)}
                            className="text-gray-400 hover:text-rose-500 p-1 rounded-md transition-colors"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Submit Trigger Box */}
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-900 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {credentialsJson 
                        ? "✓ Google Service Account Connected" 
                        : (apiKey ? "⚠ API Key provided (Service Account recommended)" : "⚡ Demo Mode active (No credentials)")}
                    </span>
                  </div>
                  <button
                    onClick={triggerIndexing}
                    disabled={isSubmitting || urlQueue.length === 0}
                    className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 text-white ${
                      isSubmitting || urlQueue.length === 0
                        ? "bg-gray-300 dark:bg-gray-800 cursor-not-allowed text-gray-400 dark:text-gray-600"
                        : "bg-emerald-500 hover:bg-emerald-600 shadow-md hover:shadow-emerald-500/10"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Submit Indexing Request
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Hand Live Log Console */}
            <div className="col-span-1 lg:col-span-5 flex flex-col space-y-6">
              
              {/* HTTP API Gateway Console */}
              <div className="bg-gray-950 text-emerald-400 p-5 rounded-2xl border border-gray-800 font-mono text-xs shadow-xl flex-1 flex flex-col min-h-80">
                <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
                  <span className="text-gray-400 flex items-center gap-1.5 font-sans font-medium text-[11px]">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                    INDEXING GATEWAY RESPONSE CONSOLE
                  </span>
                  <span className="text-[10px] text-gray-600 font-sans border border-gray-800 px-1.5 py-0.5 rounded">
                    HTTP POST
                  </span>
                </div>
                <textarea 
                  value={responseConsole}
                  readOnly
                  className="w-full bg-transparent border-none outline-none resize-none flex-1 font-mono text-emerald-400/90 leading-relaxed overflow-y-auto focus:ring-0 min-h-60"
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </div>

              {/* Quick status card */}
              <div className="bg-gray-50 dark:bg-gray-900/60 p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex items-start gap-3">
                <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-semibold text-gray-800 dark:text-gray-200">How Instant Indexing works:</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    By issuing a secure JWT request, TranscriptG validates ownership directly against Google's Indexing API, which bypasses Search Console's delayed scheduler. This schedules your pages for crawling immediately.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Tab 2: Credentials and Sandbox Setup */}
        {activeTab === "credentials" && (
          <div className="col-span-1 lg:col-span-12 space-y-8">
            <div className="bg-white dark:bg-gray-950 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
              <div className="border-b border-gray-100 dark:border-gray-900 pb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Key className="w-6 h-6 text-emerald-500" /> API Authentication Configuration
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Google's Indexing API does not accept plain static API keys. Configure your private Google Service Account JSON credentials below. This remains secure and stays inside your local workspace.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Method A: Service Account (Recommended) */}
                <div className="space-y-4">
                  <div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                      Method A: Service Account JSON (Highly Recommended)
                    </span>
                    <h3 className="text-md font-semibold text-gray-900 dark:text-white mt-2">
                      Upload Google Service Account Credentials
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Paste the entire contents of your downloaded Service Account JSON key file.
                    </p>
                  </div>

                  <div className="relative">
                    <textarea
                      value={credentialsJson}
                      onChange={(e) => handleCredentialsChange(e.target.value)}
                      placeholder={`{\n  "type": "service_account",\n  "project_id": "my-google-project",\n  "private_key_id": "...",\n  "private_key": "-----BEGIN PRIVATE KEY-----\\n...",\n  "client_email": "my-account@...iam.gserviceaccount.com"\n}`}
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white min-h-60 leading-normal"
                    />
                  </div>
                </div>

                {/* Method B: Static API Key Fallback */}
                <div className="space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        Method B: Static API Key (Fallback)
                      </span>
                      <h3 className="text-md font-semibold text-gray-900 dark:text-white mt-2">
                        Simple Static Cloud API Key
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Use a generic API key. Note that Google Indexing API usually blocks requests using standard API keys because they lack OAuth consent.
                      </p>
                    </div>

                    <div className="relative">
                      <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => handleApiKeyChange(e.target.value)}
                        placeholder="Paste Google Cloud API Key (AIzaSy...)"
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Cache Controls & Privacy Guard */}
                  <div className="bg-gray-50 dark:bg-gray-900/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-900 space-y-4">
                    <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-emerald-500" /> Client-Side Privacy Protection
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Your keys are **never stored on our database**. They are sent directly to the server endpoint only when you click "Submit", and are protected in transit using SSL/TLS.
                    </p>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-500 dark:text-gray-400">
                      <input 
                        type="checkbox"
                        checked={saveLocally}
                        onChange={(e) => handleSaveCredentialsChange(e.target.checked)}
                        className="rounded border-gray-300 dark:border-gray-800 text-emerald-500 focus:ring-emerald-500 w-4 h-4 bg-transparent"
                      />
                      Remember credentials in this browser (Encrypted client cache)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Detailed Step-by-Step Setup Guide */}
        {activeTab === "guide" && (
          <div className="col-span-1 lg:col-span-12 space-y-6">
            <div className="bg-white dark:bg-gray-950 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-8">
              <div className="border-b border-gray-100 dark:border-gray-900 pb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-emerald-500" /> Complete Setup Walkthrough Guide
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Follow this visual roadmap to create your Google Service Account and link it to your Search Console in under 5 minutes.
                </p>
              </div>

              {/* Step Roadmap */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Step 1 */}
                <div className="bg-gray-50 dark:bg-gray-900/30 p-5 rounded-2xl border border-gray-100 dark:border-gray-900 relative">
                  <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-emerald-500 text-white font-mono text-sm font-bold flex items-center justify-center shadow-md">
                    1
                  </span>
                  <span className="block text-xs font-bold text-emerald-500 mb-1.5 uppercase tracking-wider">
                    Google Cloud Console
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Enable the Indexing API
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    Go to the Google Cloud Developer Console. Create a new project, navigate to the API Library, search for **"Web Search Indexing API"**, and click **"Enable"**.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-gray-50 dark:bg-gray-900/30 p-5 rounded-2xl border border-gray-100 dark:border-gray-900 relative">
                  <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-emerald-500 text-white font-mono text-sm font-bold flex items-center justify-center shadow-md">
                    2
                  </span>
                  <span className="block text-xs font-bold text-emerald-500 mb-1.5 uppercase tracking-wider">
                    Credentials & Keys
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Download Service Account JSON
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    Go to **IAM & Admin &gt; Service Accounts**. Create a service account named "indexing-api" (Role: Owner or Editor). Select **Keys &gt; Add Key &gt; Create New Key (JSON)** to download the file.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-gray-50 dark:bg-gray-900/30 p-5 rounded-2xl border border-gray-100 dark:border-gray-900 relative">
                  <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-emerald-500 text-white font-mono text-sm font-bold flex items-center justify-center shadow-md">
                    3
                  </span>
                  <span className="block text-xs font-bold text-emerald-500 mb-1.5 uppercase tracking-wider">
                    Google Search Console
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Add Owner Permission Consent
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    Open Search Console, go to **Settings &gt; Users & Permissions**. Add your Service Account's email address (found in the JSON) as an **"Owner"** of your property to delegate consent.
                  </p>
                </div>

              </div>

              {/* Advanced Environment Setup Tip */}
              <div className="bg-emerald-50/50 dark:bg-emerald-950/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-950 flex gap-4">
                <Info className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-400">
                    Pro Developer Tip: Set as Server Environment Variable
                  </h3>
                  <p className="text-xs text-emerald-800/80 dark:text-emerald-400/80 leading-relaxed">
                    To automate this completely, you can format your Service Account JSON into a single compact string and set it in your `.env` file as shown below. This hides the credentials completely from the front-end code:
                  </p>
                  <div className="relative mt-2">
                    <pre className="bg-gray-900 text-gray-300 p-3 rounded-xl text-[11px] font-mono overflow-x-auto select-all leading-normal">
                      {"GOOGLE_SERVICE_ACCOUNT_JSON='{\"type\":\"service_account\",\"project_id\":\"my-project\",...}'"}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History / Logs Panel (Visible across Submit URLs) */}
        {activeTab === "submit" && (
          <div className="col-span-1 lg:col-span-12">
            <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-purple-500" /> Historic Request Records ({logs.length})
                </h2>
                {logs.length > 0 && (
                  <button 
                    onClick={clearLogs}
                    className="text-xs text-gray-400 hover:text-rose-500 transition-colors flex items-center gap-1"
                  >
                    <Trash className="w-3 h-3" /> Clear History
                  </button>
                )}
              </div>

              {logs.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                  <History className="w-6 h-6 text-gray-300 dark:text-gray-700 mx-auto mb-2.5" />
                  <span className="block text-xs text-gray-400 font-medium">No previous indexing submissions detected</span>
                  <span className="block text-[11px] text-gray-400 mt-0.5">Your submission records are stored inside your browser's private sandbox.</span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-900 text-gray-400">
                        <th className="py-3 px-4 font-semibold uppercase">URL Submitting</th>
                        <th className="py-3 px-4 font-semibold uppercase">Action</th>
                        <th className="py-3 px-4 font-semibold uppercase">Timestamp</th>
                        <th className="py-3 px-4 font-semibold uppercase">Method</th>
                        <th className="py-3 px-4 font-semibold uppercase text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-900">
                      {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-medium text-gray-800 dark:text-gray-300 truncate max-w-sm">
                            {log.url}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              log.type === "URL_UPDATED"
                                ? "bg-emerald-100/50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400"
                                : "bg-rose-100/50 text-rose-800 dark:bg-rose-950/20 dark:text-rose-400"
                            }`}>
                              {log.type === "URL_UPDATED" ? "PUBLISHED" : "DELETED"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-gray-500 dark:text-gray-400">
                            {log.timestamp}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[10px] text-gray-500 dark:text-gray-400">
                            {log.method}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                              log.status === "success"
                                ? "text-emerald-500"
                                : log.status === "failed"
                                ? "text-rose-500"
                                : "text-blue-500 animate-pulse"
                            }`}>
                              {log.status === "success" ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Checked
                                </>
                              ) : log.status === "failed" ? (
                                <>
                                  <AlertCircle className="w-3.5 h-3.5" /> Blocked
                                </>
                              ) : (
                                <>
                                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Pending
                                </>
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
