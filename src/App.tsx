import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { FormulaSheet } from './pages/FormulaSheet';
import { TopicPage } from './pages/TopicPage';
import { Practice } from './pages/Practice';
import { QuizPage } from './pages/QuizPage';
import { RevisionPlanPage } from './pages/RevisionPlanPage';
import { Auth } from './pages/Auth';
import { LandingPage } from './pages/LandingPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UserProvider } from './context/UserContext';

// Nested layout wrapper to protect and theme study content routes
const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <Outlet />
      </Layout>
    </ProtectedRoute>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />

          {/* Protected Routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/formulas" element={<FormulaSheet />} />
            <Route path="/topic/:id" element={<TopicPage />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/revision-plan" element={<RevisionPlanPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

