import React, { useState } from 'react';
import { formulas } from '../data/formulas';
import { FormulaCard } from '../components/ContentCards';
import { Search } from 'lucide-react';

export const FormulaSheet: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFormulas = formulas.filter(f => 
    f.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.topicId.toLowerCase().replace(/-/g, ' ').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0f172a] dark:text-[#f8fafc]">Formula Cheat Sheet</h1>
        <p className="text-sm text-[#475569] dark:text-[#94a3b8] mt-2 leading-relaxed">
          Access every critical formula required for the Second Semester Mathematics exam with variables copy controls.
        </p>
      </div>

      <div className="relative max-w-xl">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-[#475569] dark:text-[#94a3b8]" />
        </div>
        <input
          type="text"
          placeholder="Search formulas by name, topic, or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0f1b2e] border border-zinc-200 dark:border-[#1e293b] rounded-xl text-sm text-[#0f172a] dark:text-[#f8fafc] placeholder-[#475569] dark:placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-violet-500 focus:border-transparent transition-all shadow-sm"
        />
      </div>

      {filteredFormulas.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-[#0f1b2e] rounded-2xl border border-zinc-200 dark:border-[#1e293b]">
          <p className="text-[#475569] dark:text-[#94a3b8] text-sm">No formulas found matching "{searchTerm}"</p>
          <button 
            onClick={() => setSearchTerm('')}
            className="mt-4 text-xs font-bold text-[#4f46e5] dark:text-[#22d3ee] hover:underline cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredFormulas.map(formula => (
            <FormulaCard 
              key={formula.id}
              title={formula.title}
              expression={formula.expression}
              explanation={formula.explanation}
              whenToUse={formula.whenToUse}
            />
          ))}
        </div>
      )}
    </div>
  );
};
