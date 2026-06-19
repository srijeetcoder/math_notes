import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { syllabus, courseDetails } from '../data/syllabus';
import { BrainCircuit, PlayCircle, CheckCircle2, Calendar, Award, BookOpen, GraduationCap } from 'lucide-react';
import { useUser } from '../context/UserContext';
import type { UnitStatus } from '../context/UserContext';
import { TopicCard } from '../components/ContentCards';
import { topics } from '../data/topics';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { syllabusProgress, updateSyllabusStatus } = useUser();

  // Helper to fetch current unit status from state
  const getUnitStatus = (unitId: string): UnitStatus => {
    return syllabusProgress[unitId] || 'Pending';
  };

  // Dynamic calculations from syllabus data
  const totalUnits = syllabus.length;
  const completedUnits = syllabus.filter(u => getUnitStatus(u.id) === 'Completed').length;
  const inProgressUnits = syllabus.filter(u => getUnitStatus(u.id) === 'In Progress').length;
  
  // Progress = (Completed + 0.5 * InProgress) / Total
  const calculatedProgress = completedUnits + (inProgressUnits * 0.5);
  const progressPercentage = Math.round((calculatedProgress / totalUnits) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-zinc-900 dark:text-zinc-100">
      
      {/* Course Details Info Card at the Top */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-md relative overflow-hidden">
        {/* Decorative background glow in dark mode */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/5 dark:bg-violet-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-4 mb-5 gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-violet-500/10 text-indigo-600 dark:text-violet-400 border border-indigo-100 dark:border-violet-500/20">
                  {courseDetails.code}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {courseDetails.semester} Semester
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {courseDetails.type}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                {courseDetails.title}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {courseDetails.university} <span className="text-xs text-zinc-400">({courseDetails.universitySubText})</span>
              </p>
            </div>
            
            <div className="text-left lg:text-right">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Program</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200 text-sm md:text-base">{courseDetails.program}</span>
              <span className="text-xs text-zinc-400 block mt-1">{courseDetails.academicSession}</span>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-sm">
            <div className="bg-zinc-50 dark:bg-zinc-950/50 p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-900/60">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Designation</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                <Award className="text-indigo-500 dark:text-violet-400 shrink-0" size={16} />
                {courseDetails.designation}
              </span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-950/50 p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-900/60">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Contact Hours</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                <BookOpen className="text-indigo-500 dark:text-violet-400 shrink-0" size={16} />
                {courseDetails.contactHours}
              </span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-950/50 p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-900/60">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Continuous Assessment</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                <Calendar className="text-indigo-500 dark:text-violet-400 shrink-0" size={16} />
                {courseDetails.continuousAssessmentMarks} Marks
              </span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-950/50 p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-900/60">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Final Exam</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                <GraduationCap className="text-indigo-500 dark:text-violet-400 shrink-0" size={16} />
                {courseDetails.finalExamMarks} Marks
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button 
              onClick={() => navigate('/revision-plan')}
              className="bg-indigo-600 hover:bg-indigo-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer text-sm"
            >
              <PlayCircle size={18} /> Start Revision Plan
            </button>
            <button 
              onClick={() => navigate('/quiz')}
              className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-750 px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all active:scale-95 cursor-pointer text-sm"
            >
              <BrainCircuit size={18} /> Practice AI Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Syllabus Progress Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              Syllabus Completion
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
              Calculated dynamically: {completedUnits} completed units, {inProgressUnits} in progress unit (50% weight) out of {totalUnits} total units.
            </p>
          </div>
          
          <div className="flex items-center gap-2 self-start md:self-auto bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-xl text-sm font-semibold">
            <CheckCircle2 size={16} />
            Study Tracker Connected
          </div>
        </div>

        {/* Custom Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-zinc-500 dark:text-zinc-400">Progress ({calculatedProgress} / {totalUnits} Units Tracked)</span>
            <span className="text-zinc-900 dark:text-white font-mono">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-full h-4 overflow-hidden p-0.5">
            <div 
              className="bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-violet-600 dark:to-indigo-500 h-2.5 rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(139,92,246,0.3)]" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-zinc-150 dark:border-zinc-800/60 text-center">
          <div>
            <div className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white font-mono">{completedUnits}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Completed Units</div>
          </div>
          <div className="border-x border-zinc-150 dark:border-zinc-800/60">
            <div className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-violet-400 font-mono">{inProgressUnits}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">In Progress</div>
          </div>
          <div>
            <div className="text-xl md:text-2xl font-bold text-zinc-500 dark:text-zinc-400 font-mono">
              {syllabus.filter(u => getUnitStatus(u.id) === 'Pending').length}
            </div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Pending</div>
          </div>
        </div>
      </div>

      {/* Syllabus Units Grid */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Syllabus Breakdown</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {syllabus.map((unit) => {
            const currentStatus = getUnitStatus(unit.id);
            const isCompleted = currentStatus === 'Completed';
            const isInProgress = currentStatus === 'In Progress';
            
            return (
              <div 
                key={unit.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-zinc-350 dark:hover:border-zinc-700 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                          Unit {unit.number}
                        </span>
                        {unit.hours && (
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 px-2 py-0.5 rounded">
                            {unit.hours} Hours
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">
                        {unit.title}
                      </h4>
                    </div>

                    <div className="relative">
                      <select
                        value={currentStatus}
                        onChange={(e) => updateSyllabusStatus(unit.id, e.target.value as UnitStatus)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border cursor-pointer outline-none transition-all hover:scale-105 active:scale-95 appearance-none pr-8 relative ${
                          isCompleted 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                            : isInProgress 
                              ? 'bg-indigo-500/10 text-indigo-600 dark:bg-violet-500/10 dark:text-violet-400 border-indigo-500/20 dark:border-violet-500/20' 
                              : 'bg-zinc-100 dark:bg-zinc-950 text-zinc-500 border-zinc-200 dark:border-zinc-850'
                        }`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 8px center',
                          backgroundSize: '14px'
                        }}
                      >
                        <option value="Completed" className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-sans">Completed</option>
                        <option value="In Progress" className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-sans">In Progress</option>
                        <option value="Pending" className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-sans">Pending</option>
                      </select>
                    </div>
                  </div>

                  {/* Topics List */}
                  <div className="space-y-3 mt-4">
                    <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Subtopic Notes & Study Materials</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      {unit.topics.map((topicItem, i) => {
                        const fullTopic = topics.find(t => t.id === topicItem.topicId);
                        
                        if (topicItem.topicId && fullTopic) {
                          // Find completion status of this topic
                          const isRevised = localStorage.getItem(`topic-revised-${fullTopic.id}`) === 'true';
                          const status = isRevised ? 'Completed' : 'Pending';
                          
                          return (
                            <TopicCard 
                              key={i}
                              title={fullTopic.title}
                              unitNumber={unit.number}
                              description={fullTopic.conceptExplanation.substring(0, 110) + '...'}
                              priority={fullTopic.priority}
                              status={status}
                              estimatedTime={fullTopic.priority === 'High' ? '60 min' : fullTopic.priority === 'Medium' ? '45 min' : '30 min'}
                              onOpenNotes={() => navigate(`/topic/${fullTopic.id}`)}
                            />
                          );
                        } else {
                          // Inactive coming soon topic
                          return (
                            <div key={i} className="bg-zinc-50 dark:bg-[#07111f]/60 p-5 rounded-2xl border border-dashed border-zinc-200 dark:border-[#1e293b] flex flex-col justify-center min-h-[140px] select-none text-center shadow-sm">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Unit {unit.number} Subtopic</span>
                              <span className="text-sm font-extrabold text-zinc-650 dark:text-[#94a3b8] mt-1">{topicItem.name}</span>
                              <span className="text-[9px] text-[#4f46e5] dark:text-[#22d3ee] mt-1 uppercase tracking-wider font-extrabold">Coming Soon</span>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>

                {/* Quick actions for units that are completed/in progress */}
                {(isCompleted || isInProgress) && (
                  <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex justify-between items-center gap-4 text-xs">
                    <span className="text-zinc-400 dark:text-zinc-500">Interactive study material is available.</span>
                    <Link 
                      to="/practice" 
                      className="text-indigo-600 dark:text-violet-400 hover:text-indigo-700 dark:hover:text-violet-300 font-semibold flex items-center gap-1"
                    >
                      Go to Practice &rarr;
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

