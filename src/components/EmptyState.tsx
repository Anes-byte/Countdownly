import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Language } from '../types';

interface EmptyStateProps {
  onAddNew: () => void;
  language: Language;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddNew, language }) => {
  const translations = {
    title: language === 'en' ? 'No countdowns yet' : 'لا يوجد عدادات تنازلية بعد',
    description: language === 'en' 
      ? 'Create your first countdown to start tracking important events.'
      : 'أنشئ أول عداد تنازلي للبدء في تتبع الأحداث المهمة.',
    button: language === 'en' ? 'Add First Countdown' : 'إضافة أول عداد تنازلي',
  };

  return (
    <motion.div 
      className={`flex flex-col items-center justify-center py-12 text-center ${language === 'ar' ? 'rtl' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-slate-800/50 rounded-full p-4 mb-4">
        <Calendar className="h-12 w-12 text-purple-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">{translations.title}</h2>
      <p className="text-slate-400 max-w-md mb-6">{translations.description}</p>
      <motion.button
        onClick={onAddNew}
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg flex items-center transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="mr-2" size={20} />
        {translations.button}
      </motion.button>
    </motion.div>
  );
};

export default EmptyState;