import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Countdown, Language, CalendarType } from '../types';
import { getCurrentDate } from '../utils/dateUtils';

interface CountdownFormProps {
  onSubmit: (countdown: Omit<Countdown, 'id'>) => void;
  onCancel: () => void;
  editingCountdown?: Countdown;
  language: Language;
  defaultCalendar: CalendarType;
}

const CountdownForm: React.FC<CountdownFormProps> = ({
  onSubmit,
  onCancel,
  editingCountdown,
  language,
  defaultCalendar,
}) => {
  const isEditing = Boolean(editingCountdown);
  
  const [title, setTitle] = useState(editingCountdown?.title || '');
  const [date, setDate] = useState(editingCountdown?.date || getCurrentDate());
  const [icon, setIcon] = useState(editingCountdown?.icon || '🎯');
  const [color, setColor] = useState(editingCountdown?.color || '#3B82F6');
  const [background, setBackground] = useState(editingCountdown?.background || '');
  const [isHijri, setIsHijri] = useState(editingCountdown?.isHijri || defaultCalendar === 'hijri');
  const [description, setDescription] = useState(editingCountdown?.description || '');

  const translations = {
    title: language === 'en' ? 'Add New Countdown' : 'إضافة عد تنازلي جديد',
    editTitle: language === 'en' ? 'Edit Countdown' : 'تعديل العد التنازلي',
    eventTitle: language === 'en' ? 'Event Title' : 'عنوان الحدث',
    date: language === 'en' ? 'Date & Time' : 'التاريخ والوقت',
    icon: language === 'en' ? 'Icon' : 'أيقونة',
    color: language === 'en' ? 'Color' : 'اللون',
    background: language === 'en' ? 'Background URL (optional)' : 'رابط الخلفية (اختياري)',
    description: language === 'en' ? 'Description (optional)' : 'الوصف (اختياري)',
    useHijri: language === 'en' ? 'Use Hijri Calendar' : 'استخدام التقويم الهجري',
    cancel: language === 'en' ? 'Cancel' : 'إلغاء',
    save: language === 'en' ? 'Save' : 'حفظ',
    titlePlaceholder: language === 'en' ? 'e.g., Birthday Party' : 'مثال: حفلة عيد ميلاد',
    descriptionPlaceholder: language === 'en' ? 'Add some details...' : 'أضف بعض التفاصيل...',
  };
  
  const colors = [
    '#3B82F6', // blue
    '#8B5CF6', // violet
    '#EC4899', // pink
    '#F97316', // orange
    '#10B981', // emerald
    '#EF4444', // red
    '#F59E0B', // amber
    '#6366F1', // indigo
  ];
  
  const commonIcons = ['🎯', '🎂', '🎉', '🏆', '💼', '📚', '✈️', '❤️', '🌙', '⏰', '📅', '🎓'];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      date,
      icon,
      color,
      background,
      isHijri,
      description,
    });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };
  
  useEffect(() => {
    // Focus on title input when the form opens
    const titleInput = document.getElementById('countdown-title');
    if (titleInput) {
      titleInput.focus();
    }
  }, []);
  
  return (
    <motion.div 
      className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${language === 'ar' ? 'rtl' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onKeyDown={handleKeyDown}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel}></div>
      
      <motion.div 
        className="glassmorphism rounded-xl w-full max-w-md relative z-10"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <div className="flex justify-between items-center border-b border-slate-700/50 p-4">
          <h2 className="text-xl font-bold text-white">
            {isEditing ? translations.editTitle : translations.title}
          </h2>
          <button 
            onClick={onCancel}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="countdown-title" className="block text-sm font-medium text-slate-300 mb-1">
              {translations.eventTitle}
            </label>
            <input
              id="countdown-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder={translations.titlePlaceholder}
              required
            />
          </div>
          
          <div>
            <label htmlFor="countdown-date" className="block text-sm font-medium text-slate-300 mb-1">
              {translations.date}
            </label>
            <div className="relative">
              <input
                id="countdown-date"
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <Calendar size={16} className="text-slate-400" />
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-300 mb-1">
                {translations.icon}
              </label>
              <div className="grid grid-cols-6 gap-2">
                {commonIcons.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setIcon(emoji)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md text-lg ${
                      icon === emoji ? 'bg-indigo-600 text-white' : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-300 mb-1">
                {translations.color}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {colors.map((colorOption) => (
                  <button
                    key={colorOption}
                    type="button"
                    onClick={() => setColor(colorOption)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      color === colorOption ? 'border-white' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: colorOption }}
                    aria-label={`Color ${colorOption}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="countdown-background" className="block text-sm font-medium text-slate-300 mb-1">
              {translations.background}
            </label>
            <input
              id="countdown-background"
              type="text"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <label htmlFor="countdown-description" className="block text-sm font-medium text-slate-300 mb-1">
              {translations.description}
            </label>
            <textarea
              id="countdown-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-20 resize-none"
              placeholder={translations.descriptionPlaceholder}
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="use-hijri"
              type="checkbox"
              checked={isHijri}
              onChange={(e) => setIsHijri(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-700 rounded bg-slate-800"
            />
            <label htmlFor="use-hijri" className="ml-2 block text-sm text-slate-300">
              {translations.useHijri}
            </label>
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              {translations.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              {translations.save}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CountdownForm;