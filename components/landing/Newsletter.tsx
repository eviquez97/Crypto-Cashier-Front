'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes('@')) {
      // Simulate newsletter subscription
      setIsSubscribed(true)
      console.log('Newsletter subscription:', email)
      
      // Send email to marketing team
      const subject = 'Newsletter Subscription Request'
      const body = `New newsletter subscription:\n\nEmail: ${email}\n\nSource: Landing Page Newsletter Section`
      window.open(`mailto:marketing@coinfixi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank')
      
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    } else {
      alert('Please enter a valid email address')
    }
  }

  return (
    <section className="py-16 bg-brand-dark">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'cubic-bezier(.22,.61,.36,1)' }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'cubic-bezier(.22,.61,.36,1)' }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-h2-mobile lg:text-h2 font-display font-semibold text-brand-light mb-4"
          >
            {t('newsletter.title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'cubic-bezier(.22,.61,.36,1)' }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-body-lg text-brand-light/70 mb-8 max-w-md mx-auto"
          >
            {t('newsletter.subtitle')}
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'cubic-bezier(.22,.61,.36,1)' }}
            viewport={{ once: true, amount: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.emailPlaceholder')}
                className="w-full px-6 py-4 bg-brand-teal/20 border border-brand-primary/30 rounded-xl text-brand-light placeholder-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            
            <motion.button
              whileHover={{ scale: isSubscribed ? 1 : 1.05, y: isSubscribed ? 0 : -1 }}
              whileTap={{ scale: isSubscribed ? 1 : 0.95 }}
              type="submit"
              disabled={isSubscribed}
              className={`px-8 py-4 rounded-xl font-semibold flex items-center justify-center group transition-all duration-200 whitespace-nowrap ${
                isSubscribed 
                  ? 'bg-brand-primary/20 text-brand-primary cursor-not-allowed' 
                  : 'bg-brand-primary text-brand-dark hover:shadow-xl'
              }`}
            >
              {isSubscribed ? (
                <>
                  {t('newsletter.subscribed')}
                </>
              ) : (
                <>
                  {t('newsletter.subscribe')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-brand-light/60 text-sm mt-4"
          >
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter
