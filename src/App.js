import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MonitoringDashboard from './components/MonitoringDashboard';
import Toast from './components/Toast';
import { ToastProvider } from './contexts/ToastContext';
import './App.css';

function App() {
  return (
    <ToastProvider>
      <div className="app">
        <Header />
        <Sidebar />
        <main className="main-content">
          <MonitoringDashboard />
        </main>
        <Toast />
      </div>
    </ToastProvider>
  );
}

export default App;