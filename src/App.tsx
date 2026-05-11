import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { FormulaSheet } from './pages/FormulaSheet';
import { TopicPage } from './pages/TopicPage';
import { Practice } from './pages/Practice';
import { QuizPage } from './pages/QuizPage';
import { RevisionPlanPage } from './pages/RevisionPlanPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/formulas" element={<FormulaSheet />} />
          <Route path="/topic/:id" element={<TopicPage />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/revision-plan" element={<RevisionPlanPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
