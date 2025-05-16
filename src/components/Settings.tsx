import React from 'react';
import { X, Moon, Globe, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Language, CalendarType, AppSettings } from '../types';

interface SettingsProps {
  settings: AppSettings;
  onClose: () => void;
  onLanguageChange: (language: Language) => void;
  onCalendarChange: (calendar: CalendarType) => void;
  onClearData: () => void;
}

const Settings: React.FC<SettingsProps> = ({
  settings,
  onClose,
  onLanguageChange,
  onCalendarChange,
  onClearData,
}) => {
  const currentLanguage = settings.language;
  
  const translations = {
    title: currentLanguage === 'en' ? 'Settings' : 'الإعدادات',
    language: currentLanguage === 'en' ? 'Language' : 'اللغة',
    calendar: currentLanguage === 'en' ? 'Default Calendar' : 'التقويم الافتراضي',
    english: currentLanguage === 'en' ? 'English' : 'الإنجليزية',
    arabic: currentLanguage === 'en' ? 'Arabic' : 'العربية',
    gregorian: currentLanguage === 'en' ? 'Gregorian' : 'الميلادي',
    hijri: currentLanguage === 'en' ? 'Hijri' : 'الهجري',
    clearData: currentLanguage === 'en' ? 'Clear All Data' : 'مسح جميع البيانات',
    clearConfirm: currentLanguage === 'en' 
      ? 'Are you sure? This will delete all your countdowns.'
      : 'هل أنت متأكد؟ سيؤدي هذا إلى حذف جميع العدادات التنازلية الخاصة بك.',
    cancel: currentLanguage === 'en' ? 'Cancel' : 'إلغاء',
    confirm: currentLanguage === 'en' ? 'Clear Data' : 'مسح البيانات',
    theme: currentLanguage === 'en' ? 'Theme' : 'المظهر',
    dark: currentLanguage === 'en' ? 'Dark' : 'داكن',
  };
  
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  
  return (
    <motion.div 
      className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${currentLanguage === 'ar' ? 'rtl' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <motion.div 
        className="glassmorphism rounded-xl w-full max-w-md relative z-10"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <div className="flex justify-between items-center border-b border-slate-700/50 p-4">
          <h2 className="text-xl font-bold text-white">
            {translations.title}
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-2 flex items-center">
              <Globe size={16} className="mr-2" />
              {translations.language}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  currentLanguage === 'en'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {translations.english}
              </button>
              <button
                onClick={() => onLanguageChange('ar')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  currentLanguage === 'ar'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {translations.arabic}
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-2 flex items-center">
              <Calendar size={16} className="mr-2" />
              {translations.calendar}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => onCalendarChange('gregorian')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  settings.defaultCalendar === 'gregorian'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {translations.gregorian}
              </button>
              <button
                onClick={() => onCalendarChange('hijri')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  settings.defaultCalendar === 'hijri'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {translations.hijri}
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-2 flex items-center">
              <Moon size={16} className="mr-2" />
              {translations.theme}
            </h3>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded-lg text-sm bg-indigo-600 text-white"
                disabled
              >
                {translations.dark}
              </button>
            </div>
          </div>
          
          <div className="pt-2">
            <button
              onClick={() => setShowConfirmDialog(true)}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
            >
              {translations.clearData}
            </button>
          </div>
        </div>
      </motion.div>
      
      {showConfirmDialog && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          
          <motion.div 
            className="glassmorphism rounded-xl w-full max-w-sm relative z-20 p-5"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <p className="text-white mb-4">{translations.clearConfirm}</p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                {translations.cancel}
              </button>
              <button
                onClick={() => {
                  onClearData();
                  setShowConfirmDialog(false);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                {translations.confirm}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Settings;