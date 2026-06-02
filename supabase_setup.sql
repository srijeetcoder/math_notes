-- ==========================================
-- Supabase Schema & Row-Level Security (RLS) Setup
-- Run this in your Supabase SQL Editor
-- ==========================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Allow users to select their own profile" 
  ON public.profiles FOR SELECT 
  TO authenticated 
  USING (auth.uid() = id);

CREATE POLICY "Allow users to insert their own profile" 
  ON public.profiles FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow users to update their own profile" 
  ON public.profiles FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = id);


-- 2. Syllabus Progress Table
CREATE TABLE IF NOT EXISTS public.syllabus_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  unit_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Completed', 'In Progress', 'Pending')),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_user_unit UNIQUE (user_id, unit_id)
);

-- Enable RLS on Syllabus Progress
ALTER TABLE public.syllabus_progress ENABLE ROW LEVEL SECURITY;

-- Syllabus Progress Policies
CREATE POLICY "Allow users to select their own progress" 
  ON public.syllabus_progress FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert their own progress" 
  ON public.syllabus_progress FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own progress" 
  ON public.syllabus_progress FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);


-- 3. Quiz History Table
CREATE TABLE IF NOT EXISTS public.quiz_history (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  questions JSONB NOT NULL,
  created_at BIGINT NOT NULL
);

-- Enable RLS on Quiz History
ALTER TABLE public.quiz_history ENABLE ROW LEVEL SECURITY;

-- Quiz History Policies
CREATE POLICY "Allow users to select their own quiz history" 
  ON public.quiz_history FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert their own quiz history" 
  ON public.quiz_history FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to delete their own quiz history" 
  ON public.quiz_history FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);


-- 4. Revision Progress Table
CREATE TABLE IF NOT EXISTS public.revision_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_id TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_user_session UNIQUE (user_id, session_id)
);

-- Enable RLS on Revision Progress
ALTER TABLE public.revision_progress ENABLE ROW LEVEL SECURITY;

-- Revision Progress Policies
CREATE POLICY "Allow users to select their own revision progress" 
  ON public.revision_progress FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert their own revision progress" 
  ON public.revision_progress FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own revision progress" 
  ON public.revision_progress FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);


-- 5. Delete User Account RPC Function
CREATE OR REPLACE FUNCTION public.delete_user_account()
RETURNS VOID AS $$
BEGIN
  DELETE FROM auth.users WHERE id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
