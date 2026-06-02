import React, { useState } from 'react';
import { MathRenderer } from './MathRenderer';
import { Plus, Trash2 } from 'lucide-react';

export const PMFCalculator: React.FC = () => {
  const [data, setData] = useState<Array<{x: number, p: number}>>([
    { x: 0, p: 0.2 },
    { x: 1, p: 0.5 },
    { x: 2, p: 0.3 }
  ]);

  const addRow = () => setData([...data, { x: data.length, p: 0 }]);
  const removeRow = (index: number) => setData(data.filter((_, i) => i !== index));
  const updateRow = (index: number, field: 'x' | 'p', value: number) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const totalP = data.reduce((sum, row) => sum + row.p, 0);
  const isValid = Math.abs(totalP - 1) < 0.0001;

  let ex = 0, ex2 = 0, vx = 0;
  if (isValid) {
    ex = data.reduce((sum, row) => sum + (row.x * row.p), 0);
    ex2 = data.reduce((sum, row) => sum + (row.x * row.x * row.p), 0);
    vx = ex2 - (ex * ex);
  }

  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-slate-200 dark:border-dark-border shadow-sm">
      <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-200">Discrete PMF Calculator</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Calculate Expectation and Variance from a given Probability Mass Function.</p>
      
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <tr>
              <th className="px-4 py-2 rounded-tl-lg">x</th>
              <th className="px-4 py-2">p(x)</th>
              <th className="px-4 py-2 rounded-tr-lg w-10"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50">
                <td className="px-4 py-2">
                  <input type="number" value={row.x} onChange={e => updateRow(i, 'x', Number(e.target.value))} className="w-20 p-1 border border-slate-200 dark:border-dark-border rounded bg-white dark:bg-slate-900" />
                </td>
                <td className="px-4 py-2">
                  <input type="number" value={row.p} onChange={e => updateRow(i, 'p', Number(e.target.value))} step="0.01" min="0" max="1" className="w-24 p-1 border border-slate-200 dark:border-dark-border rounded bg-white dark:bg-slate-900" />
                </td>
                <td className="px-4 py-2 text-right">
                  <button onClick={() => removeRow(i)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-1 rounded transition-colors"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <button onClick={addRow} className="text-sm font-medium text-primary-600 dark:text-primary-400 flex items-center gap-1 hover:underline">
          <Plus size={16} /> Add Row
        </button>
        <div className={`text-sm font-semibold ${isValid ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
          Σp(x) = {totalP.toFixed(4)} {isValid ? '(Valid)' : '(Must equal 1)'}
        </div>
      </div>

      {isValid && (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg space-y-3">
          <MathRenderer math={`E(X) = \\\\sum xp(x) = ${ex.toFixed(4)}`} />
          <MathRenderer math={`E(X^2) = \\\\sum x^2p(x) = ${ex2.toFixed(4)}`} />
          <MathRenderer math={`V(X) = E(X^2) - [E(X)]^2 = ${ex2.toFixed(4)} - (${ex.toFixed(4)})^2 = ${vx.toFixed(4)}`} />
        </div>
      )}
    </div>
  );
};

export const CDFBuilder: React.FC = () => {
  const [data, setData] = useState<Array<{x: number, p: number}>>([
    { x: 1, p: 0.1 },
    { x: 2, p: 0.3 },
    { x: 3, p: 0.6 }
  ]);

  const addRow = () => setData([...data, { x: data.length + 1, p: 0 }]);
  const removeRow = (index: number) => setData(data.filter((_, i) => i !== index));
  const updateRow = (index: number, field: 'x' | 'p', value: number) => {
    const newData = [...data];
    newData[index][field] = value;
    // Sort automatically by x
    if (field === 'x') {
      newData.sort((a, b) => a.x - b.x);
    }
    setData(newData);
  };

  const totalP = data.reduce((sum, row) => sum + row.p, 0);
  const isValid = Math.abs(totalP - 1) < 0.0001;

  // Calculate cumulative probabilities
  const cdfData = data.reduce<Array<{x: number, Fx: number}>>((acc, row) => {
    const prevSum = acc.length > 0 ? acc[acc.length - 1].Fx : 0;
    acc.push({ x: row.x, Fx: prevSum + row.p });
    return acc;
  }, []);

  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-slate-200 dark:border-dark-border shadow-sm mt-6">
      <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-200">Interactive CDF Builder</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Enter a valid PMF to see its step-function Cumulative Distribution.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="overflow-x-auto mb-2">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <th className="px-3 py-2 rounded-tl-lg">x</th>
                  <th className="px-3 py-2">p(x)</th>
                  <th className="px-3 py-2 rounded-tr-lg w-10"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50">
                    <td className="px-3 py-2">
                      <input type="number" value={row.x} onChange={e => updateRow(i, 'x', Number(e.target.value))} className="w-16 p-1 border border-slate-200 dark:border-dark-border rounded bg-white dark:bg-slate-900" />
                    </td>
                    <td className="px-3 py-2">
                      <input type="number" value={row.p} onChange={e => updateRow(i, 'p', Number(e.target.value))} step="0.01" min="0" max="1" className="w-20 p-1 border border-slate-200 dark:border-dark-border rounded bg-white dark:bg-slate-900" />
                    </td>
                    <td className="px-3 py-2 text-right">
                      <button onClick={() => removeRow(i)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center">
            <button onClick={addRow} className="text-xs font-medium text-primary-600 dark:text-primary-400 flex items-center gap-1 hover:underline">
              <Plus size={14} /> Add
            </button>
            <div className={`text-xs font-semibold ${isValid ? 'text-green-600' : 'text-red-500'}`}>
              Σ = {totalP.toFixed(2)}
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-300">Cumulative F(x) = P(X ≤ x)</h4>
          {isValid ? (
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg font-mono text-sm leading-loose">
              <div>x &lt; {cdfData[0].x} : F(x) = 0</div>
              {cdfData.map((d, i) => {
                const nextX = i < cdfData.length - 1 ? `≤ x < ${cdfData[i+1].x}` : `≤ x`;
                return (
                  <div key={i}>
                    {d.x} {nextX} : F(x) = {Math.min(d.Fx, 1).toFixed(2)}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm border border-red-100 dark:border-red-900/30">
              Please ensure total probability exactly equals 1 to build CDF.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
