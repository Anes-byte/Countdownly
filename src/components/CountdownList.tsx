import React from 'react';
import { motion } from 'framer-motion';
import { Countdown, Language } from '../types';
import CountdownCard from './CountdownCard';
import EmptyState from './EmptyState';

interface CountdownListProps {
  countdowns: Countdown[];
  language: Language;
  onEdit: (countdown: Countdown) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const CountdownList: React.FC<CountdownListProps> = ({
  countdowns,
  language,
  onEdit,
  onDelete,
  onAdd,
}) => {
  if (countdowns.length === 0) {
    return <EmptyState onAddNew={onAdd} language={language} />;
  }

  return (
    <motion.div 
      className="container mx-auto px-4 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countdowns.map((countdown, index) => (
          <CountdownCard
            key={countdown.id}
            countdown={countdown}
            language={language}
            onEdit={onEdit}
            onDelete={onDelete}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default CountdownList;