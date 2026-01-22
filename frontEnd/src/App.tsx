import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { SplashScreen } from './components/common/SplashScreen';
import { MobileLayout } from './layouts/MobileLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Feed from './pages/Feed';
import Search from './pages/Search';
import Jobs from './pages/Jobs';
import AppliedJobs from './pages/AppliedJobs';
import Bookmarks from './pages/Bookmarks';
import { BottomDock } from './components/common/BottomDock';
import { getCookie, removeCookie } from './utils/cookieUtils';

import { authService } from './services/auth';
import { Loader2 } from 'lucide-react';

const AuthenticatedLayout = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const token = getCookie('token');

      if (!token) {
        navigate('/login', { replace: true });
        return;
      }

      try {
        const user = await authService.me();

        if (!user.onboarding_complete) {
          navigate('/onboarding', { replace: true });
          return;
        }

        setIsVerified(true);
      } catch (error) {
        console.error('Session validation failed:', error);
        removeCookie('token');
        removeCookie('user');
        navigate('/login', { replace: true });
      }
    };

    checkSession();
  }, [navigate]);

  if (!isVerified) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Outlet />
      <BottomDock />
    </div>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <BrowserRouter>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {!showSplash && (
        <MobileLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/onboarding" element={<Onboarding />} />

            {/* Authenticated Routes with Dock */}
            <Route element={<AuthenticatedLayout />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/search" element={<Search />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/applied" element={<AppliedJobs />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
            </Route>
          </Routes>
        </MobileLayout>
      )}
    </BrowserRouter>
  );
}

export default App;