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
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Formula Sheet</h1>
        <p className="text-slate-600 dark:text-slate-400">All the important formulas you need for the CA3 exam in one place.</p>
      </div>

      <div className="relative mb-8 max-w-xl">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={20} className="text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search formulas by name, topic, or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-dark-border rounded-xl bg-white dark:bg-dark-card text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-shadow shadow-sm"
        />
      </div>

      {filteredFormulas.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-dark-card rounded-xl border border-slate-200 dark:border-dark-border">
          <p className="text-slate-500 dark:text-slate-400 text-lg">No formulas found matching "{searchTerm}"</p>
          <button 
            onClick={() => setSearchTerm('')}
            className="mt-4 text-primary-600 font-medium hover:underline"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
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
