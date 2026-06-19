import React, { useState } from 'react';
import { MathRenderer } from './MathRenderer';
import { Clock, CheckCircle, ArrowRight, Copy, Check, AlertCircle } from 'lucide-react';

// Reusable Clipboard Copy component
export const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button 
      onClick={handleCopy}
      className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors cursor-pointer border border-zinc-200 dark:border-zinc-700 shadow-sm"
      title="Copy formula"
    >
      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
    </button>
  );
};

interface TopicCardProps {
  title: string;
  unitNumber: number;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Completed' | 'In Progress' | 'Pending';
  estimatedTime?: string;
  onOpenNotes: () => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({ 
  title, 
  unitNumber, 
  description, 
  priority, 
  status, 
  estimatedTime = '45 min', 
  onOpenNotes 
}) => {
  const getDifficultyBadge = () => {
    switch (priority) {
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-650 dark:text-red-400 border border-red-500/10">
            Hard
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-[#f59e0b] border border-amber-500/10">
            Medium
          </span>
        );
      case 'Low':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10">
            Easy
          </span>
        );
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10">
            <CheckCircle size={12} />
            Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-[#4f46e5] dark:text-violet-400 border border-indigo-500/10">
            In Progress
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
            Pending
          </span>
        );
    }
  };

  return (
    <div 
      onClick={onOpenNotes}
      className="bg-white dark:bg-[#0f1b2e] p-6 rounded-2xl border border-zinc-200 dark:border-[#1e293b] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full group"
    >
      <div className="flex justify-between items-start gap-4 mb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Unit {unitNumber} Subtopic
          </span>
          <h3 className="font-extrabold text-lg text-[#0f172a] dark:text-[#f8fafc] mt-0.5 group-hover:text-indigo-600 dark:group-hover:text-[#22d3ee] transition-colors">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {getDifficultyBadge()}
        </div>
      </div>

      <p className="text-sm text-[#475569] dark:text-[#94a3b8] flex-1 line-clamp-3 mb-5 leading-relaxed">
        {description.replace(/\$/g, '')}
      </p>

      <div className="pt-4 border-t border-zinc-100 dark:border-[#1e293b]/50 flex items-center justify-between gap-4 mt-auto">
        <div className="flex items-center gap-3">
          {getStatusBadge()}
          <span className="inline-flex items-center gap-1 text-xs text-[#475569] dark:text-[#94a3b8]">
            <Clock size={12} />
            {estimatedTime}
          </span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onOpenNotes();
          }}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#4f46e5] dark:text-[#22d3ee] group-hover:translate-x-0.5 transition-transform"
        >
          Open Notes <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export const FormulaCard: React.FC<{ title: string; expression: string; explanation: string; whenToUse: string }> = ({ 
  title, 
  expression, 
  explanation, 
  whenToUse 
}) => {
  return (
    <div className="bg-white dark:bg-[#0f1b2e] rounded-2xl border border-zinc-200 dark:border-[#1e293b] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Code-style formula box */}
      <div className="bg-zinc-950 p-5 border-b border-zinc-200 dark:border-[#1e293b] relative group/box min-h-[90px] flex items-center justify-center">
        <div className="absolute top-2 right-2 opacity-0 group-hover/box:opacity-100 transition-opacity">
          <CopyButton text={expression} />
        </div>
        <div className="overflow-x-auto w-full text-center py-2">
          <MathRenderer math={expression} className="mx-auto text-[#22d3ee] font-mono" />
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col gap-4">
        <h4 className="font-extrabold text-base text-[#0f172a] dark:text-[#f8fafc]">{title}</h4>
        <p className="text-sm text-[#475569] dark:text-[#94a3b8] leading-relaxed">{explanation}</p>
        
        <div className="mt-auto pt-3 border-t border-zinc-150 dark:border-[#1e293b]/50">
          <span className="text-xs font-bold text-[#4f46e5] dark:text-[#22d3ee] uppercase tracking-wider flex items-center gap-1">
            <AlertCircle size={12} /> When to use
          </span>
          <p className="text-sm text-[#475569] dark:text-[#94a3b8] mt-1 leading-relaxed">{whenToUse}</p>
        </div>
      </div>
    </div>
  );
};

export const ProgressCard: React.FC<{ label: string; value: number; total: number; color?: string }> = ({ 
  label, 
  value, 
  total, 
  color = 'bg-indigo-600 dark:bg-violet-600' 
}) => {
  const percentage = Math.round((value / total) * 100) || 0;
  return (
    <div className="bg-white dark:bg-[#0f1b2e] p-6 rounded-2xl border border-zinc-200 dark:border-[#1e293b] shadow-sm">
      <div className="flex justify-between items-end mb-3">
        <h4 className="font-bold text-sm text-[#475569] dark:text-[#94a3b8] uppercase tracking-wider">{label}</h4>
        <span className="text-2xl font-black text-[#0f172a] dark:text-[#f8fafc] font-mono">{percentage}%</span>
      </div>
      <div className="w-full bg-zinc-200 dark:bg-zinc-950 border border-zinc-300 dark:border-[#1e293b] rounded-full h-3 mb-2 overflow-hidden p-0.5">
        <div 
          className={`${color} h-2 rounded-full transition-all duration-500 ease-out`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-[#475569] dark:text-[#94a3b8] text-right font-semibold">{value} of {total} completed</p>
    </div>
  );
};
