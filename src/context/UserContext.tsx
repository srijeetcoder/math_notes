import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';
import type { QuizResultData } from '../services/gemini';
import { syllabus as defaultSyllabus } from '../data/syllabus';

export type UnitStatus = 'Completed' | 'In Progress' | 'Pending';

export interface Profile {
  full_name: string;
}

interface UserContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  syllabusProgress: Record<string, UnitStatus>;
  quizHistory: QuizResultData[];
  revisionProgress: Record<string, boolean>;
  updateSyllabusStatus: (unitId: string, status: UnitStatus) => Promise<void>;
  saveQuiz: (quiz: QuizResultData) => Promise<void>;
  deleteQuiz: (quizId: string) => Promise<void>;
  toggleRevisionSession: (sessionId: string) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Initial syllabus progress maps from the default static file
const getInitialSyllabusProgress = (): Record<string, UnitStatus> => {
  const saved = localStorage.getItem('syllabus-progress');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { console.error(e); }
  }
  // Fallback to defaults defined in syllabus.ts
  const initial: Record<string, UnitStatus> = {};
  defaultSyllabus.forEach(unit => {
    initial[unit.id] = unit.status;
  });
  return initial;
};

// Initial revision progress maps from the default local storage
const getInitialRevisionProgress = (): Record<string, boolean> => {
  const saved = localStorage.getItem('revision-plan-progress');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { console.error(e); }
  }
  return {};
};

// Initial quiz history maps from the default local storage
const getInitialQuizHistory = (): QuizResultData[] => {
  const saved = localStorage.getItem('quiz-history');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { console.error(e); }
  }
  return [];
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // App tracking states
  const [syllabusProgress, setSyllabusProgress] = useState<Record<string, UnitStatus>>(getInitialSyllabusProgress);
  const [quizHistory, setQuizHistory] = useState<QuizResultData[]>(getInitialQuizHistory);
  const [revisionProgress, setRevisionProgress] = useState<Record<string, boolean>>(getInitialRevisionProgress);

  // Monitor Supabase Auth state changes
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          await loadUserData(session.user.id);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Error checking auth session:', err);
        setLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await loadUserData(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
        // Reset states to local storage equivalents
        setSyllabusProgress(getInitialSyllabusProgress());
        setQuizHistory(getInitialQuizHistory());
        setRevisionProgress(getInitialRevisionProgress());
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch all user details from database when authenticated
  const loadUserData = async (userId: string) => {
    setLoading(true);
    try {
      // 1. Fetch Profile
      const { data: profileData, error: profileErr } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', userId)
        .single();
      
      if (profileData) {
        setProfile(profileData);
      } else if (profileErr) {
        console.error('Error fetching profile:', profileErr);
      }

      // 2. Fetch Syllabus Progress
      const { data: syllabusData, error: syllabusErr } = await supabase
        .from('syllabus_progress')
        .select('unit_id, status')
        .eq('user_id', userId);

      if (syllabusErr) {
        console.error('Error fetching syllabus progress:', syllabusErr);
      }

      let dbSyllabus: Record<string, UnitStatus> = {};
      if (syllabusData && syllabusData.length > 0) {
        syllabusData.forEach(row => {
          dbSyllabus[row.unit_id] = row.status as UnitStatus;
        });
        setSyllabusProgress(dbSyllabus);
      } else {
        // No records in DB, if we have local storage data, sync it to the DB!
        const localSyllabus = getInitialSyllabusProgress();
        const insertRows = Object.keys(localSyllabus).map(unitId => ({
          user_id: userId,
          unit_id: unitId,
          status: localSyllabus[unitId]
        }));

        if (insertRows.length > 0) {
          const { error: syncErr } = await supabase
            .from('syllabus_progress')
            .upsert(insertRows);
          if (syncErr) console.error('Error syncing local progress to DB:', syncErr);
        }
        dbSyllabus = localSyllabus;
      }

      // 3. Fetch Quiz History
      const { data: quizData, error: quizErr } = await supabase
        .from('quiz_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (quizErr) {
        console.error('Error fetching quiz history:', quizErr);
      }

      if (quizData && quizData.length > 0) {
        const formattedQuizzes: QuizResultData[] = quizData.map(row => ({
          id: row.id,
          createdAt: Number(row.created_at),
          title: row.title,
          questions: row.questions
        }));
        setQuizHistory(formattedQuizzes);
      } else {
        // Sync local storage quiz history if any
        const localQuizzes = getInitialQuizHistory();
        if (localQuizzes.length > 0) {
          const insertRows = localQuizzes.map(quiz => ({
            id: quiz.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
            user_id: userId,
            title: quiz.title,
            questions: quiz.questions,
            created_at: quiz.createdAt || Date.now()
          }));
          const { error: syncErr } = await supabase
            .from('quiz_history')
            .insert(insertRows);
          if (syncErr) console.error('Error syncing local quizzes to DB:', syncErr);
          setQuizHistory(localQuizzes);
        }
      }

      // 4. Fetch Revision Checklist
      const { data: revisionData, error: revisionErr } = await supabase
        .from('revision_progress')
        .select('session_id, completed')
        .eq('user_id', userId);

      if (revisionErr) {
        console.error('Error fetching revision progress:', revisionErr);
      }

      if (revisionData && revisionData.length > 0) {
        const dbRevision: Record<string, boolean> = {};
        revisionData.forEach(row => {
          dbRevision[row.session_id] = row.completed;
        });
        setRevisionProgress(dbRevision);
      } else {
        // Sync local storage revision plan
        const localRevision = getInitialRevisionProgress();
        const insertRows = Object.keys(localRevision).map(sessionId => ({
          user_id: userId,
          session_id: sessionId,
          completed: localRevision[sessionId]
        }));
        if (insertRows.length > 0) {
          const { error: syncErr } = await supabase
            .from('revision_progress')
            .upsert(insertRows);
          if (syncErr) console.error('Error syncing local revision checklist to DB:', syncErr);
        }
        setRevisionProgress(localRevision);
      }

    } catch (err) {
      console.error('Error loading user data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update syllabus progress
  const updateSyllabusStatus = async (unitId: string, status: UnitStatus) => {
    // Update local state first
    const updated = { ...syllabusProgress, [unitId]: status };
    setSyllabusProgress(updated);
    localStorage.setItem('syllabus-progress', JSON.stringify(updated));

    // Update cloud if logged in
    if (user) {
      try {
        const { error } = await supabase
          .from('syllabus_progress')
          .upsert({
            user_id: user.id,
            unit_id: unitId,
            status: status,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id,unit_id' });

        if (error) throw error;
      } catch (err) {
        console.error('Failed to sync syllabus status to DB:', err);
      }
    }
  };

  // Save/Add quiz to history
  const saveQuiz = async (quiz: QuizResultData) => {
    const newQuiz = {
      ...quiz,
      id: quiz.id || Date.now().toString(),
      createdAt: quiz.createdAt || Date.now()
    };
    
    const updated = [newQuiz, ...quizHistory];
    setQuizHistory(updated);
    localStorage.setItem('quiz-history', JSON.stringify(updated));

    if (user) {
      try {
        const { error } = await supabase
          .from('quiz_history')
          .insert({
            id: newQuiz.id,
            user_id: user.id,
            title: newQuiz.title,
            questions: newQuiz.questions,
            created_at: newQuiz.createdAt
          });

        if (error) throw error;
      } catch (err) {
        console.error('Failed to save quiz to DB:', err);
      }
    }
  };

  // Delete quiz from history
  const deleteQuiz = async (quizId: string) => {
    const updated = quizHistory.filter(q => q.id !== quizId);
    setQuizHistory(updated);
    localStorage.setItem('quiz-history', JSON.stringify(updated));

    if (user) {
      try {
        const { error } = await supabase
          .from('quiz_history')
          .delete()
          .eq('id', quizId)
          .eq('user_id', user.id);

        if (error) throw error;
      } catch (err) {
        console.error('Failed to delete quiz from DB:', err);
      }
    }
  };

  // Toggle revision checklist session status
  const toggleRevisionSession = async (sessionId: string) => {
    const currentStatus = !!revisionProgress[sessionId];
    const updated = { ...revisionProgress, [sessionId]: !currentStatus };
    setRevisionProgress(updated);
    localStorage.setItem('revision-plan-progress', JSON.stringify(updated));

    if (user) {
      try {
        const { error } = await supabase
          .from('revision_progress')
          .upsert({
            user_id: user.id,
            session_id: sessionId,
            completed: !currentStatus,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id,session_id' });

        if (error) throw error;
      } catch (err) {
        console.error('Failed to save revision progress to DB:', err);
      }
    }
  };

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        loading,
        syllabusProgress,
        quizHistory,
        revisionProgress,
        updateSyllabusStatus,
        saveQuiz,
        deleteQuiz,
        toggleRevisionSession,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

