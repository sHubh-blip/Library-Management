import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import BrowseBooks from './pages/BrowseBooks';
import Members from './pages/Members';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<BrowseBooks />} />
            <Route path="/members" element={<Members />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
        <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
      </div>
    </Router>
  );
}

export default App;
