import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import CountdownList from './components/CountdownList';
import CountdownForm from './components/CountdownForm';
import Settings from './components/Settings';
import Footer from './components/Footer';
import { Countdown } from './types';

function AppContent() {
  const { 
    countdowns, 
    settings,
    addCountdown,
    updateCountdown,
    deleteCountdown,
    setLanguage,
    setDefaultCalendar,
    isRTL
  } = useApp();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingCountdown, setEditingCountdown] = useState<Countdown | undefined>(undefined);
  
  const handleAddCountdown = (countdown: Omit<Countdown, 'id'>) => {
    addCountdown(countdown);
    setShowAddForm(false);
  };
  
  const handleUpdateCountdown = (countdown: Countdown) => {
    updateCountdown(countdown);
    setEditingCountdown(undefined);
  };
  
  const handleEditCountdown = (countdown: Countdown) => {
    setEditingCountdown(countdown);
  };
  
  const handleClearData = () => {
    localStorage.removeItem('countdowns');
    window.location.reload();
  };

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle shortcuts if no input is focused
      if (document.activeElement?.tagName === 'INPUT' || 
          document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'a':
          setShowAddForm(true);
          break;
        case 's':
          setShowSettings(true);
          break;
        case 'escape':
          setShowAddForm(false);
          setShowSettings(false);
          setEditingCountdown(undefined);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  return (
    <motion.div 
      className={`min-h-screen flex flex-col ${isRTL ? 'rtl' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header 
        onAddNew={() => setShowAddForm(true)} 
        onOpenSettings={() => setShowSettings(true)} 
      />
      
      <CountdownList
        countdowns={countdowns}
        language={settings.language}
        onEdit={handleEditCountdown}
        onDelete={deleteCountdown}
        onAdd={() => setShowAddForm(true)}
      />
      
      <AnimatePresence>
        {showAddForm && (
          <CountdownForm
            onSubmit={handleAddCountdown}
            onCancel={() => setShowAddForm(false)}
            language={settings.language}
            defaultCalendar={settings.defaultCalendar}
          />
        )}
        
        {editingCountdown && (
          <CountdownForm
            onSubmit={(data) => handleUpdateCountdown({ ...data, id: editingCountdown.id })}
            onCancel={() => setEditingCountdown(undefined)}
            editingCountdown={editingCountdown}
            language={settings.language}
            defaultCalendar={settings.defaultCalendar}
          />
        )}
        
        {showSettings && (
          <Settings
            settings={settings}
            onClose={() => setShowSettings(false)}
            onLanguageChange={setLanguage}
            onCalendarChange={setDefaultCalendar}
            onClearData={handleClearData}
          />
        )}
      </AnimatePresence>

      <Footer />
    </motion.div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;