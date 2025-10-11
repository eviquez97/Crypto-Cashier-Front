'use client'

import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Video, 
  Users, 
  HelpCircle, 
  FileText, 
  Download,
  ExternalLink,
  ArrowRight,
  Play,
  Clock,
  Star,
  Globe
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

const ResourcesPage = () => {
  const { t } = useTranslation()

  const resourceCategories = [
    {
      title: 'Documentation',
      icon: BookOpen,
      description: 'Comprehensive guides and API references',
      resources: [
        {
          title: 'API Reference',
          description: 'Complete endpoint documentation with examples',
          type: 'Documentation',
          duration: '15 min read',
          link: '/docs'
        },
        {
          title: 'Integration Guide',
          description: 'Step-by-step integration tutorial',
          type: 'Guide',
          duration: '30 min read',
          link: '/docs'
        },
        {
          title: 'Webhook Setup',
          description: 'Configure real-time event notifications',
          type: 'Tutorial',
          duration: '10 min read',
          link: '/docs'
        }
      ]
    },
    {
      title: 'Learning',
      icon: Video,
      description: 'Video tutorials and educational content',
      resources: [
        {
          title: 'Getting Started Video',
          description: 'Quick overview of Coinfixi features',
          type: 'Video',
          duration: '5 min',
          link: '#'
        },
        {
          title: 'Security Best Practices',
          description: 'Learn how to secure your integration',
          type: 'Video',
          duration: '12 min',
          link: '#'
        },
        {
          title: 'Multi-chain Integration',
          description: 'Supporting multiple cryptocurrencies',
          type: 'Video',
          duration: '8 min',
          link: '#'
        }
      ]
    },
    {
      title: 'Support',
      icon: Users,
      description: 'Get help from our expert team',
      resources: [
        {
          title: '24/7 Support Chat',
          description: 'Instant help from our support team',
          type: 'Support',
          duration: 'Immediate',
          link: '#'
        },
        {
          title: 'Enterprise Support',
          description: 'Dedicated support for enterprise clients',
          type: 'Support',
          duration: '24/7',
          link: '#'
        },
        {
          title: 'Status Page',
          description: 'Real-time system status and updates',
          type: 'Status',
          duration: 'Live',
          link: '#'
        }
      ]
    }
  ]

  const tools = [
    {
      title: 'API Explorer',
      description: 'Test API endpoints in your browser',
      icon: Globe,
      link: '/docs'
    },
    {
      title: 'SDK Generator',
      description: 'Generate SDKs for your preferred language',
      icon: Download,
      link: '/docs'
    },
    {
      title: 'Webhook Tester',
      description: 'Test and debug webhook integrations',
      icon: Play,
      link: '/docs'
    },
    {
      title: 'Rate Calculator',
      description: 'Calculate transaction fees and rates',
      icon: FileText,
      link: '/docs'
    }
  ]

  const community = [
    {
      title: 'Developer Forum',
      description: 'Connect with other developers',
      members: '2,500+',
      icon: Users,
      link: '#'
    },
    {
      title: 'GitHub Repository',
      description: 'Open source examples and tools',
      stars: '1,200+',
      icon: Star,
      link: '#'
    },
    {
      title: 'Discord Community',
      description: 'Real-time chat with the team',
      members: '800+',
      icon: Globe,
      link: '#'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-base-dark to-brand-teal">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full px-4 py-2 mb-8">
              <HelpCircle className="w-4 h-4 text-brand-primary" />
              <span className="text-sm font-semibold text-brand-light">Resources & Support</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-brand-light mb-6">
              Everything You Need to <span className="bg-gradient-to-r from-brand-primary to-brand-primary bg-clip-text text-transparent">Succeed</span>
            </h1>
            
            <p className="text-xl text-brand-light/70 max-w-3xl mx-auto mb-12">
              From comprehensive documentation to expert support, we provide all the resources 
              you need to build amazing crypto payment experiences.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Resource Categories */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {resourceCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-brand-teal/10 backdrop-blur-xl rounded-3xl p-8 border border-brand-primary/20 hover:border-brand-primary/40 transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-brand-light">
                    {category.title}
                  </h3>
                  <p className="text-brand-light/70 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {category.resources.map((resource, resourceIndex) => (
                  <motion.div
                    key={resource.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: resourceIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                    onClick={() => window.open(resource.link, '_blank')}
                  >
                    <div className="bg-brand-dark/30 rounded-xl p-4 border border-brand-primary/10 hover:border-brand-primary/30 transition-all duration-200">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-brand-light group-hover:text-brand-primary transition-colors">
                          {resource.title}
                        </h4>
                        <ExternalLink className="w-4 h-4 text-brand-light/50 group-hover:text-brand-primary transition-colors flex-shrink-0" />
                      </div>
                      
                      <p className="text-brand-light/70 text-sm mb-3">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="inline-block px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs font-medium rounded-full">
                          {resource.type}
                        </span>
                        <div className="flex items-center space-x-1 text-brand-light/50 text-xs">
                          <Clock className="w-3 h-3" />
                          <span>{resource.duration}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Developer Tools */}
      <div className="bg-brand-dark/50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-brand-light mb-4">
              Developer Tools
            </h2>
            <p className="text-xl text-brand-light/70 max-w-2xl mx-auto">
              Powerful tools to accelerate your development and testing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-brand-teal/10 backdrop-blur-xl rounded-2xl p-6 border border-brand-primary/20 hover:border-brand-primary/40 transition-all duration-300 group cursor-pointer"
                onClick={() => window.open(tool.link, '_blank')}
              >
                <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-primary/30 transition-colors duration-300">
                  <tool.icon className="w-6 h-6 text-brand-primary" />
                </div>
                
                <h3 className="text-lg font-semibold text-brand-light mb-2 group-hover:text-brand-primary transition-colors">
                  {tool.title}
                </h3>
                
                <p className="text-brand-light/70 text-sm leading-relaxed">
                  {tool.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Community */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-display font-bold text-brand-light mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-brand-light/70 max-w-2xl mx-auto">
            Connect with developers, get help, and share your experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {community.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-brand-teal/10 backdrop-blur-xl rounded-2xl p-6 border border-brand-primary/20 hover:border-brand-primary/40 transition-all duration-300 group cursor-pointer"
              onClick={() => window.open(item.link, '_blank')}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center group-hover:bg-brand-primary/30 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-light group-hover:text-brand-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-brand-light/70 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-brand-light/70 text-sm">
                  {item.members ? `${item.members} members` : `${item.stars} stars`}
                </span>
                <ArrowRight className="w-4 h-4 text-brand-light/50 group-hover:text-brand-primary transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Support CTA */}
      <div className="bg-brand-dark/50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-brand-primary/10 to-brand-teal/10 backdrop-blur-xl rounded-3xl p-12 border border-brand-primary/20 text-center"
          >
            <h2 className="text-4xl font-display font-bold text-brand-light mb-4">
              Need Help Getting Started?
            </h2>
            
            <p className="text-xl text-brand-light/70 mb-8 max-w-2xl mx-auto">
              Our expert team is here to help you succeed. Get personalized assistance 
              with your integration and optimization.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-primary text-brand-dark px-8 py-4 rounded-2xl font-bold text-lg hover:bg-brand-primary/90 transition-all duration-200 flex items-center justify-center group"
                onClick={() => window.open('/demo-request', '_blank')}
              >
                Contact Support
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-brand-primary text-brand-light rounded-2xl font-bold text-lg hover:bg-brand-primary hover:text-brand-dark transition-all duration-200"
                onClick={() => window.open('/docs', '_blank')}
              >
                View Documentation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ResourcesPage
