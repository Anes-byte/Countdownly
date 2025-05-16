import React from 'react';
import { Clock, Plus, Settings as SettingsIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

interface HeaderProps {
  onAddNew: () => void;
  onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddNew, onOpenSettings }) => {
  const { isRTL, settings } = useApp();
  
  const translations = {
    title: settings.language === 'en' ? 'Countdown' : 'العد التنازلي',
    subtitle: settings.language === 'en' 
      ? 'Track your important moments' 
      : 'تتبع لحظاتك المهمة',
    add: settings.language === 'en' ? 'Add New' : 'إضافة جديد',
    settings: settings.language === 'en' ? 'Settings' : 'الإعدادات',
  };

  return (
    <motion.header 
      className={`glassmorphism sticky top-0 z-10 px-4 py-4 mb-6 ${isRTL ? 'rtl' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Clock className="text-purple-400 mr-2" size={24} />
          <div>
            <h1 className="text-xl font-bold text-white">
              {translations.title}
            </h1>
            <p className="text-xs text-slate-400">
              {translations.subtitle}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onAddNew}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors text-sm"
          >
            <Plus size={16} className="mr-1" />
            {translations.add}
          </button>
          
          <button
            onClick={onOpenSettings}
            className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors"
            aria-label={translations.settings}
          >
            <SettingsIcon size={20} />
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;