import React from 'react';
import { Mail, Heart, Github, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const Footer: React.FC = () => {
  const { settings } = useApp();
  
  const translations = {
    madeWith: settings.language === 'en' ? 'Made with' : 'صنع بـ',
    by: settings.language === 'en' ? 'by' : 'بواسطة',
    contact: settings.language === 'en' ? 'Want to get in touch?' : 'تريد التواصل معنا؟',
    email: settings.language === 'en' ? 'Email:' : 'البريد الإلكتروني:',
    about: settings.language === 'en' 
      ? 'This web app allows you to create beautiful, customizable countdowns for any occasion. Built for simplicity, speed, and sharing.'
      : 'يتيح لك هذا التطبيق إنشاء عدادات تنازلية جميلة وقابلة للتخصيص لأي مناسبة. مبني للبساطة والسرعة والمشاركة.',
    rights: settings.language === 'en'
      ? '© 2025 Countdownly. All rights reserved. Created by Anes Badaoui.'
      : '© 2025 كاونتداونلي. جميع الحقوق محفوظة. إنشاء أنس بداوي.',
    openSource: settings.language === 'en'
      ? 'This project is open source and intended for educational and personal use.'
      : 'هذا المشروع مفتوح المصدر ومخصص للاستخدام التعليمي والشخصي.',
    privacy: settings.language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية',
    terms: settings.language === 'en' ? 'Terms of Use' : 'شروط الاستخدام',
  };

  return (
    <motion.footer 
      className="glassmorphism mt-auto w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-6xl py-8 px-4">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">About Countdownly</h3>
            <p className="text-slate-300 mb-4">
              {translations.about}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <a 
                href="https://github.com/Anes-byte" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white flex items-center group"
              >
                <User className="mr-2 w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
                @Anes-byte
              </a>
              <a 
                href="mailto:anesbadaoui06@gmail.com"
                className="text-slate-300 hover:text-white flex items-center group"
              >
                <Mail className="mr-2 w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
                anesbadaoui06@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-slate-400 flex items-center">
              <span>{translations.rights}</span>
              <Heart className="mx-2 w-4 h-4 text-red-400" />
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-4 text-sm text-slate-400">
              <a href="/privacy" className="hover:text-slate-300 transition-colors">
                {translations.privacy}
              </a>
              <span>•</span>
              <a href="/terms" className="hover:text-slate-300 transition-colors">
                {translations.terms}
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;