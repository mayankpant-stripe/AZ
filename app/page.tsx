"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Heart, Shield, Users, Zap, Star, CheckCircle, Play, Moon, Sun, Menu, X } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { MembershipModal } from "@/components/membership-modal"
import { SubscriptionSuccess } from "@/components/subscription-success"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMembership, setSelectedMembership] = useState<'monthly' | 'quarterly'>('monthly')
  const [subscriptionSuccess, setSubscriptionSuccess] = useState<{
    customerName: string
    subscriptionId: string
    invoiceId?: string
  } | null>(null)
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const success = urlParams.get('success')
    const subscriptionId = urlParams.get('subscription_id')
    const customerName = urlParams.get('customer_name')

    if (success === 'true' && subscriptionId && customerName) {
      setSubscriptionSuccess({
        customerName: decodeURIComponent(customerName),
        subscriptionId,
        invoiceId: urlParams.get('invoice_id') || undefined
      })
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500">
      {/* Navigation */}
      <motion.header 
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <img
                src="/Logo.jpg"
                alt="Health Logo"
                className="w-8 h-8 rounded-xl object-cover"
              />
              <Badge variant="secondary" className="text-xs font-medium">HEALTH</Badge>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['About Us', 'Science', 'Medications', 'Blogs', 'FAQ', 'Careers', 'Contact Us'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {mounted && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-9 h-9 rounded-full"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              )}
              
              <div className="hidden md:flex items-center space-x-3">
                <Button variant="ghost" className="text-sm font-medium">
                  Sign In
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6">
                  Am I eligible?
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-t border-slate-200/50 dark:border-slate-700/50"
            >
              <div className="px-4 py-6 space-y-4">
                {['About Us', 'Science', 'Medications', 'Blogs', 'FAQ', 'Careers', 'Contact Us'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-4 space-y-3">
                  <Button variant="ghost" className="w-full justify-start">
                    Sign In
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Am I eligible?
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        style={{ y: heroY }}
        className="relative pt-24 pb-4 sm:pt-32 sm:pb-8 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                    We work with you
                  </span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
                  Customized medicine with doctors that care. Experience healthcare that adapts to your unique needs.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl px-8 py-6 text-lg font-semibold group"
                >
                  Am I eligible?
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 rounded-2xl px-8 py-6 text-lg font-semibold backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 group"
                >
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  Watch Demo
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center space-x-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white dark:border-slate-800 flex items-center justify-center text-white font-semibold text-sm">
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Trusted by 10,000+ patients</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              {/* Influenza Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/Influenza.jpg"
                  alt="Influenza healthcare image"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="pt-8 pb-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700">
              Choose Health
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Healthcare that works for you
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Experience personalized medicine with cutting-edge technology and compassionate care.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Personalized Care",
                description: "Tailored treatment plans based on your unique health profile and goals.",
                color: "from-red-500 to-pink-500"
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your health data is protected with enterprise-grade security measures.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Board-certified physicians and specialists dedicated to your success.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Zap,
                title: "Fast Results",
                description: "See meaningful progress with our evidence-based treatment protocols.",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: CheckCircle,
                title: "Proven Success",
                description: "Join thousands of patients who have achieved their health goals.",
                color: "from-purple-500 to-violet-500"
              },
              {
                icon: Star,
                title: "5-Star Experience",
                description: "Exceptional patient experience with 24/7 support and guidance.",
                color: "from-indigo-500 to-blue-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card className="h-full backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-8 pb-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400')] opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Ready to transform your health?
            </h2>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of patients who have already started their journey to better health with us.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Monthly Membership */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-white mb-2">Monthly Membership</h3>
                  <div className="text-3xl font-bold text-white mb-1">$25</div>
                  <div className="text-blue-200 text-sm">/month</div>
                  <div className="text-blue-200 text-xs mt-1">Renews every month</div>
                </div>
                <ul className="space-y-2 text-sm text-blue-100">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    Ongoing care and monitoring
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    Prescription if medically necessary
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    Advanced therapy
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    Mental health support
                  </li>
                </ul>
                <Button 
                  className="w-full mt-6 bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl py-3 font-semibold"
                  onClick={() => {
                    console.log('Monthly button clicked')
                    setSelectedMembership('monthly')
                    setIsModalOpen(true)
                    console.log('Modal should be open:', true)
                  }}
                >
                  Choose Monthly
                </Button>
              </div>

              {/* Quarterly Membership */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-white mb-2">Quarterly Membership</h3>
                  <div className="text-3xl font-bold text-white mb-1">$55</div>
                  <div className="text-blue-200 text-sm">/3 months</div>
                  <div className="text-blue-200 text-xs mt-1">Renews every quarter</div>
                </div>
                <ul className="space-y-2 text-sm text-blue-100">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    Ongoing care and monitoring
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    Prescription if medically necessary
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    Advanced therapy
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    Mental health support
                  </li>
                </ul>
                <Button 
                  className="w-full mt-6 bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl py-3 font-semibold"
                  onClick={() => {
                    setSelectedMembership('quarterly')
                    setIsModalOpen(true)
                  }}
                >
                  Choose Quarterly
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img
                  src="/Logo.jpg"
                  alt="Health Logo"
                  className="w-8 h-8 rounded-xl object-cover"
                />
                <Badge variant="secondary" className="text-xs">HEALTH</Badge>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Personalized healthcare that works with your body, not against it.
              </p>
            </div>
            
            {[
              {
                title: "Services",
                links: ["About Us", "Medications", "Consultations", "Lab Tests"]
              },
              {
                title: "Company",
                links: ["About", "Careers", "Blog", "Press"]
              },
              {
                title: "Support",
                links: ["FAQ", "Contact", "Privacy", "Terms"]
              }
            ].map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="font-semibold text-lg">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 Health. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

            <MembershipModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        membershipType={selectedMembership} 
      />

      {subscriptionSuccess && (
        <SubscriptionSuccess
          customerName={subscriptionSuccess.customerName}
          subscriptionId={subscriptionSuccess.subscriptionId}
          invoiceId={subscriptionSuccess.invoiceId}
          onClose={() => setSubscriptionSuccess(null)}
        />
      )}
    </div>
  )
}
