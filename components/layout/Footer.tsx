'use client'

import { motion } from 'framer-motion'
import { Twitter, Linkedin, Github } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { t } = useTranslation()

  const footerLinks = {
    product: [
      { name: t('footer.product.features'), href: '#features' },
      { name: t('footer.product.docs'), href: '#docs' },
      { name: t('footer.product.integrations'), href: '#api' }
    ],
    company: [
      { name: t('footer.company.about'), href: '#about' },
      { name: t('footer.company.blog'), href: '#blog' },
      { name: t('footer.company.careers'), href: '#careers' },
      { name: t('footer.company.contact'), href: '#contact' }
    ],
    resources: [
      { name: t('footer.resources.support'), href: '#help' },
      { name: t('footer.resources.guides'), href: '#community' },
      { name: t('footer.resources.status'), href: '#status' },
      { name: t('footer.legal.security'), href: '#security' }
    ],
    legal: [
      { name: t('footer.legal.privacy'), href: '#privacy' },
      { name: t('footer.legal.terms'), href: '#terms' },
      { name: t('footer.legal.security'), href: '#cookies' }
    ]
  }

  const socialLinks = [
    { icon: Twitter, href: '#twitter', label: 'Twitter' },
    { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
    { icon: Github, href: '#github', label: 'GitHub' }
  ]

  return (
    <footer className="bg-brand-dark text-brand-light border-t border-brand-primary/20">
      <div className="container py-16">
        {/* Top Section */}
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                <span className="text-brand-dark font-bold text-lg">CF</span>
              </div>
              <span className="text-xl font-display font-bold text-brand-light">Coinfixi</span>
            </div>
            <p className="text-brand-light/70 leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-info-500/20 rounded-xl flex items-center justify-center hover:bg-brand-primary hover:text-brand-dark transition-all duration-200 text-brand-light/70"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display font-semibold mb-4 text-brand-light">{t('footer.product.title')}</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-brand-light/70 hover:text-brand-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display font-semibold mb-4 text-brand-light">{t('footer.company.title')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-brand-light/70 hover:text-brand-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display font-semibold mb-4 text-brand-light">{t('footer.resources.title')}</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-brand-light/70 hover:text-brand-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-brand-primary/20 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-brand-light/60 text-sm mb-4 md:mb-0">
              © {currentYear} Coinfixi. {t('footer.copyright')}
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              {footerLinks.legal.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  viewport={{ once: true }}
                  className="text-brand-light/60 hover:text-brand-primary transition-colors duration-200 text-sm"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer