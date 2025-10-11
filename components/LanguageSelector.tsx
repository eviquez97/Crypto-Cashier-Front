'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Globe, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' }
]

const LanguageSelector = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Language Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-4 py-2 bg-info-500/20 border border-brand-primary/30 rounded-xl text-brand-light hover:bg-info-500/30 transition-all duration-200"
      >
        <Globe className="w-4 h-4" />
        <span className="text-2xl">{currentLanguage.flag}</span>
        <span className="hidden lg:inline text-sm font-medium">{currentLanguage.nativeName}</span>
        <motion.svg
          className="w-4 h-4"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-64 bg-brand-dark/95 backdrop-blur-xl border border-brand-primary/30 rounded-2xl shadow-2xl overflow-hidden z-50"
            >
              <div className="p-2">
                {languages.map((language, index) => (
                  <motion.button
                    key={language.code}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => changeLanguage(language.code)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      currentLanguage.code === language.code
                        ? 'bg-brand-primary/20 text-brand-primary'
                        : 'text-brand-light hover:bg-info-500/20'
                    }`}
                  >
                    <span className="text-2xl">{language.flag}</span>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-sm">{language.nativeName}</p>
                      <p className={`text-xs ${
                        currentLanguage.code === language.code
                          ? 'text-brand-primary/70'
                          : 'text-brand-light/50'
                      }`}>
                        {language.name}
                      </p>
                    </div>
                    {currentLanguage.code === language.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-brand-dark" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-brand-primary/20 px-4 py-3 bg-brand-dark/50">
                <p className="text-xs text-brand-light/50 text-center">
                  Language will be saved automatically
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSelector

