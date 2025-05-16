import React, { useState } from 'react';
import { Edit2, Trash2, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Countdown, Language } from '../types';
import { useCountdownTimer } from '../hooks/useCountdownTimer';
import { formatTimeRemaining } from '../utils/dateUtils';
import { createShareableURL, copyToClipboard } from '../utils/shareUtils';

interface CountdownCardProps {
  countdown: Countdown;
  language: Language;
  onEdit: (countdown: Countdown) => void;
  onDelete: (id: string) => void;
  index: number;
}

const CountdownCard: React.FC<CountdownCardProps> = ({
  countdown,
  language,
  onEdit,
  onDelete,
  index,
}) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdownTimer(countdown.date);
  const [showShareConfirmation, setShowShareConfirmation] = useState(false);
  
  const translations = {
    expired: language === 'en' ? 'Event has passed' : 'انتهى الحدث',
    share: language === 'en' ? 'Share' : 'مشاركة',
    edit: language === 'en' ? 'Edit' : 'تعديل',
    delete: language === 'en' ? 'Delete' : 'حذف',
    copied: language === 'en' ? 'Copied to clipboard!' : 'تم النسخ!',
  };
  
  const formattedTimeUnits = formatTimeRemaining(days, hours, minutes, seconds, language);
  
  const handleShare = async () => {
    const shareUrl = createShareableURL(countdown);
    const success = await copyToClipboard(shareUrl);
    
    if (success) {
      setShowShareConfirmation(true);
      setTimeout(() => setShowShareConfirmation(false), 2000);
    }
  };
  
  // Card styling based on the countdown color
  const cardStyle = {
    borderTop: `4px solid ${countdown.color}`,
    background: countdown.background ? 
      `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), url(${countdown.background})` : 
      'rgba(15, 23, 42, 0.8)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  
  return (
    <motion.div 
      className="countdown-card glassmorphism"
      style={cardStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-white">
            {countdown.icon && <span className="mr-2">{countdown.icon}</span>}
            {countdown.title}
          </h3>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleShare}
              className="text-slate-400 hover:text-slate-200 p-1 rounded transition-colors"
              aria-label={translations.share}
            >
              <Share2 size={16} />
            </button>
            <button 
              onClick={() => onEdit(countdown)}
              className="text-slate-400 hover:text-slate-200 p-1 rounded transition-colors"
              aria-label={translations.edit}
            >
              <Edit2 size={16} />
            </button>
            <button 
              onClick={() => onDelete(countdown.id)}
              className="text-slate-400 hover:text-red-400 p-1 rounded transition-colors"
              aria-label={translations.delete}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        {countdown.description && (
          <p className="text-sm text-slate-300 mb-3">{countdown.description}</p>
        )}
        
        {isExpired ? (
          <div className="text-center py-4">
            <p className="text-lg text-red-400">{translations.expired}</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 my-3">
            {formattedTimeUnits.map((unit, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-white">{unit.value}</div>
                <div className="text-xs text-slate-400">{unit.label}</div>
              </div>
            ))}
          </div>
        )}
        
        {showShareConfirmation && (
          <motion.div 
            className="absolute bottom-4 left-0 right-0 mx-auto text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <span className="bg-slate-700 text-white text-sm py-1 px-3 rounded-full">
              {translations.copied}
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CountdownCard;