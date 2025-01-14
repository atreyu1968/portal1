import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/HomePage';
import { NetworkPage } from './pages/NetworkPage';
import { AdminPanel } from './pages/AdminPanel';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Toaster } from './components/ui/toaster';
import { BackToTop } from './components/ui/back-to-top';
import { useContentStore } from './lib/store/content';

export default function App() {
  const initialize = useContentStore((state) => state.initialize);

  useEffect(() => {
    const init = async () => {
      try {
        await initialize();
      } catch (error) {
        console.error('Failed to initialize application:', error);
      }
    };

    init();
  }, [initialize]);

  return (
    <Router>
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/red/:slug" element={<NetworkPage />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
        <BackToTop />
      </div>
    </Router>
  );
}