import React, { useState } from 'react';
import { MathRenderer } from './MathRenderer';

// Helper for combinations (nCr)
function combinations(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  if (r === 0 || r === n) return 1;
  let res = 1;
  for (let i = 1; i <= r; i++) {
    res = res * (n - i + 1) / i;
  }
  return res;
}

export const BinomialCalculator: React.FC = () => {
  const [n, setN] = useState<number>(10);
  const [p, setP] = useState<number>(0.5);
  const [x, setX] = useState<number>(5);
  const [mode, setMode] = useState<'exact' | 'atMost' | 'atLeast'>('exact');

  const calculate = () => {
    let prob = 0;
    let steps = '';
    const q = 1 - p;
    
    if (n < 0 || p < 0 || p > 1 || x < 0 || x > n) {
      return { prob: null, steps: 'Invalid inputs.' };
    }

    if (mode === 'exact') {
      const c = combinations(n, x);
      prob = c * Math.pow(p, x) * Math.pow(q, n - x);
      steps = `P(X = ${x}) = {}^{${n}}C_{${x}} (${p})^${x} (${q.toFixed(4)})^{${n-x}}\\\\ = ${c} \\times ${Math.pow(p, x).toFixed(6)} \\times ${Math.pow(q, n - x).toFixed(6)}\\\\ = ${prob.toFixed(6)}`;
    } else if (mode === 'atMost') {
      let sumProb = 0;
      let stepStr = `P(X \\le ${x}) = `;
      const terms = [];
      for (let i = 0; i <= x; i++) {
        const c = combinations(n, i);
        const pTerm = c * Math.pow(p, i) * Math.pow(q, n - i);
        sumProb += pTerm;
        if (i < 3 || i === x) {
          terms.push(`P(${i})`);
        } else if (i === 3) {
          terms.push('\\dots');
        }
      }
      stepStr += terms.join(' + ') + `\\\\ = ${sumProb.toFixed(6)}`;
      prob = sumProb;
      steps = stepStr;
    } else {
      let sumProb = 0;
      let stepStr = `P(X \\ge ${x}) = 1 - P(X < ${x}) = 1 - ( `;
      const terms = [];
      for (let i = 0; i < x; i++) {
        const c = combinations(n, i);
        const pTerm = c * Math.pow(p, i) * Math.pow(q, n - i);
        sumProb += pTerm;
        if (i < 3 || i === x - 1) {
          terms.push(`P(${i})`);
        } else if (i === 3) {
          terms.push('\\dots');
        }
      }
      prob = 1 - sumProb;
      stepStr += terms.join(' + ') + `) \\\\ = 1 - ${sumProb.toFixed(6)} = ${prob.toFixed(6)}`;
      steps = stepStr;
      
      // If x=0 for atLeast, special case
      if (x === 0) {
        prob = 1;
        steps = `P(X \\ge 0) = 1`;
      }
    }
    return { prob, steps };
  };

  const { prob, steps } = calculate();

  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-slate-200 dark:border-dark-border shadow-sm">
      <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-200">Binomial Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Trials (n)</label>
          <input type="number" value={n} onChange={e => setN(Number(e.target.value))} min={1} className="w-full p-2 border border-slate-300 dark:border-dark-border rounded bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Probability of Success (p)</label>
          <input type="number" value={p} onChange={e => setP(Number(e.target.value))} step={0.01} min={0} max={1} className="w-full p-2 border border-slate-300 dark:border-dark-border rounded bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Target Successes (x)</label>
          <input type="number" value={x} onChange={e => setX(Number(e.target.value))} min={0} max={n} className="w-full p-2 border border-slate-300 dark:border-dark-border rounded bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mode</label>
          <select value={mode} onChange={e => setMode(e.target.value as any)} className="w-full p-2 border border-slate-300 dark:border-dark-border rounded bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
            <option value="exact">Exactly x ( X = x )</option>
            <option value="atMost">At most x ( X ≤ x )</option>
            <option value="atLeast">At least x ( X ≥ x )</option>
          </select>
        </div>
      </div>
      
      {prob !== null && (
        <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg mt-4">
          <div className="text-center">
            <MathRenderer math={steps} />
          </div>
          <div className="text-center mt-3 pt-3 border-t border-primary-100 dark:border-primary-800/50">
            <span className="font-semibold text-primary-800 dark:text-primary-300">Final Probability: {prob.toFixed(6)}</span>
          </div>
        </div>
      )}
    </div>
  );
};
