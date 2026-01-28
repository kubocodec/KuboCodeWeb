import { useState } from 'react'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [currentView, setCurrentView] = useState(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      return 'dashboard';
    }
    return 'home';
  });

  const validateCredentials = (username, password) => {
    // Credenciales quemadas: marco / 111206
    return username === 'marco' && password === '111206';
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('home');
    localStorage.removeItem('isAuthenticated');
  };

  const navigateToLogin = () => {
    setCurrentView('login');
  };

  const navigateToHome = () => {
    setCurrentView('home');
  };

  // Render Logic
  if (isAuthenticated && currentView === 'dashboard') {
    return <Dashboard onLogout={handleLogout} />; // Assuming Dashboard needs logout
  }

  if (currentView === 'login') {
    return (
      <Login
        onValidate={validateCredentials}
        onLoginSuccess={handleLoginSuccess}
        onBack={navigateToHome}
      />
    );
  }

  // Default to Home (Landing)
  return <Home onNavigateToLogin={navigateToLogin} />;
}

export default App
