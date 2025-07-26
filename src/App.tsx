import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { JournalProvider } from './contexts/JournalContext';
import { Layout } from './components/layout/Layout';
import { TodayEntry } from './pages/TodayEntry';
import { History } from './pages/History';
import { Settings } from './pages/Settings';

function App() {
  return (
    <JournalProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<TodayEntry />} />
            <Route path="/entry/:date" element={<TodayEntry />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </JournalProvider>
  );
}

export default App;