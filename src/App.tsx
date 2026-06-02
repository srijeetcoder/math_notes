import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { FormulaSheet } from './pages/FormulaSheet';
import { TopicPage } from './pages/TopicPage';
import { Practice } from './pages/Practice';
import { QuizPage } from './pages/QuizPage';
import { RevisionPlanPage } from './pages/RevisionPlanPage';
import { Auth } from './pages/Auth';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/formulas" element={<FormulaSheet />} />
            <Route path="/topic/:id" element={<TopicPage />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/revision-plan" element={<RevisionPlanPage />} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
}

export default App;

