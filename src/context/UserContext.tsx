import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';
import type { QuizResultData } from '../services/gemini';

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
  deleteAccount: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Guest Initializers (used when logged out)
const getGuestSyllabusProgress = (): Record<string, UnitStatus> => {
  const saved = localStorage.getItem('guest-syllabus-progress');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { console.error(e); }
  }
  return {};
};

const getGuestRevisionProgress = (): Record<string, boolean> => {
  const saved = localStorage.getItem('guest-revision-progress');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { console.error(e); }
  }
  return {};
};

const getGuestQuizHistory = (): QuizResultData[] => {
  const saved = localStorage.getItem('guest-quiz-history');
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
  const [syllabusProgress, setSyllabusProgress] = useState<Record<string, UnitStatus>>({});
  const [quizHistory, setQuizHistory] = useState<QuizResultData[]>([]);
  const [revisionProgress, setRevisionProgress] = useState<Record<string, boolean>>({});

  // Monitor Supabase Auth state changes
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          await loadUserData(session.user.id);
        } else {
          // Initialize states with Guest progress
          setSyllabusProgress(getGuestSyllabusProgress());
          setQuizHistory(getGuestQuizHistory());
          setRevisionProgress(getGuestRevisionProgress());
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
        // Reset states to Guest progress
        setSyllabusProgress(getGuestSyllabusProgress());
        setQuizHistory(getGuestQuizHistory());
        setRevisionProgress(getGuestRevisionProgress());
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
        // No records in DB, initialize empty for this user (they fall back to default syllabus values)
        setSyllabusProgress({});
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
        setQuizHistory([]);
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
        setRevisionProgress({});
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
    } else {
      // Guest mode: Save only to guest local storage
      localStorage.setItem('guest-syllabus-progress', JSON.stringify(updated));
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
    } else {
      // Guest mode: Save only to guest local storage
      localStorage.setItem('guest-quiz-history', JSON.stringify(updated));
    }
  };

  // Delete quiz from history
  const deleteQuiz = async (quizId: string) => {
    const updated = quizHistory.filter(q => q.id !== quizId);
    setQuizHistory(updated);

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
    } else {
      // Guest mode: Delete only from guest local storage
      localStorage.setItem('guest-quiz-history', JSON.stringify(updated));
    }
  };

  // Toggle revision checklist session status
  const toggleRevisionSession = async (sessionId: string) => {
    const currentStatus = !!revisionProgress[sessionId];
    const updated = { ...revisionProgress, [sessionId]: !currentStatus };
    setRevisionProgress(updated);

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
    } else {
      // Guest mode: Save only to guest local storage
      localStorage.setItem('guest-revision-progress', JSON.stringify(updated));
    }
  };

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
  };

  const deleteAccount = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase.rpc('delete_user_account');
      if (error) throw error;
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Failed to delete account:', err);
      throw err;
    } finally {
      setLoading(false);
    }
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
        logout,
        deleteAccount
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


