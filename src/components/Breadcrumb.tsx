import React from "react";
import { Home, ChevronRight, LayoutGrid } from "lucide-react";

interface BreadcrumbProps {
  currentToolName: string;
  category?: string;
  onNavigateHome: () => void;
  theme: "light" | "dark";
}

export function Breadcrumb({ 
  currentToolName, 
  category, 
  onNavigateHome,
  theme 
}: BreadcrumbProps) {
  return (
    <nav className="flex items-center flex-wrap gap-2 text-xs font-semibold mb-6 select-none" aria-label="Breadcrumb" id="breadcrumb-navigation">
      {/* Home link */}
      <button 
        onClick={onNavigateHome}
        className={`flex items-center gap-1 bg-transparent border-0 p-0 cursor-pointer transition-colors focus:outline-none ${
          theme === "dark" ? "text-slate-400 hover:text-red-400" : "text-slate-500 hover:text-red-500"
        }`}
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />

      {/* Category or List link */}
      <button 
        onClick={onNavigateHome}
        className={`flex items-center gap-1 bg-transparent border-0 p-0 cursor-pointer transition-colors focus:outline-none ${
          theme === "dark" ? "text-slate-400 hover:text-red-400" : "text-slate-500 hover:text-red-500"
        }`}
      >
        <LayoutGrid className="w-3.5 h-3.5" />
        <span>{category || "All Utilities"}</span>
      </button>

      <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />

      {/* Active Link */}
      <span className={`font-extrabold truncate ${
        theme === "dark" ? "text-red-400" : "text-red-500"
      }`}>
        {currentToolName}
      </span>
    </nav>
  );
}
