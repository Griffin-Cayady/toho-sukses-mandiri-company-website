import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import '@/index.css';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/LanguageContext.jsx';
import { AuthProvider } from '@/contexts/SupabaseAuthContext.jsx';
import { testSupabaseConnection } from '@/lib/supabaseDebug';
import { AlertTriangle, X } from 'lucide-react';

const StartupCheck = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [connectionWarning, setConnectionWarning] = useState(null);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const result = await testSupabaseConnection();
        if (!result.success) {
          console.warn("Supabase connection warning on startup:", result.error);
          setConnectionWarning("Koneksi ke database terganggu. Aplikasi berjalan dalam mode offline (menampilkan data lokal).");
        }
      } catch (err) {
        console.error("Critical startup error:", err);
        setConnectionWarning("Gagal menginisialisasi koneksi server penuh.");
      } finally {
        // App is ready to render regardless of connection status (we have fallbacks)
        setIsReady(true);
      }
    };
    
    initializeApp();
  }, []);

  if (!isReady) return null;

  return (
    <>
      {connectionWarning && showBanner && (
        <div className="bg-yellow-500 text-yellow-900 px-4 py-2 text-sm font-medium flex items-center justify-between z-50 relative border-b border-yellow-600">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            <p>{connectionWarning}</p>
          </div>
          <button onClick={() => setShowBanner(false)} className="ml-4 hover:bg-yellow-600/20 p-1 rounded transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      {children}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <StartupCheck>
            <App />
            <Toaster />
          </StartupCheck>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </>
);