"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Search, 
  Heart, 
  CreditCard, 
  Smartphone, 
  RefreshCw,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Star,
  Shield,
  Clock,
  Users,
  Moon,
  Sun,
  MessageCircle,
  Menu,
  X,
  ChevronDown
} from 'lucide-react'

const journeyStages = [
  {
    id: 'awareness',
    title: 'Awareness',
    description: 'Customer discovers the need for medication subscription',
    color: 'bg-slate-600',
    icon: Search,
    touchpoints: ['Social media ads', 'Healthcare provider', 'Online forums', 'Search results'],
    emotions: ['Curious', 'Hopeful', 'Uncertain'],
    actions: ['Researching condition', 'Seeking treatment options'],
    painPoints: ['Information overload', 'Conflicting advice'],
    opportunities: ['Educational content', 'Clear benefit messaging']
  },
  {
    id: 'consideration',
    title: 'Consideration',
    description: 'Evaluating subscription plans and treatment options',
    color: 'bg-slate-700',
    icon: Heart,
    touchpoints: ['AZ website', 'Product brochures', 'Reviews', 'Doctor consultation'],
    emotions: ['Interested', 'Cautious', 'Evaluating'],
    actions: ['Comparing plans', 'Reading reviews', 'Checking HSA eligibility'],
    painPoints: ['Complex pricing', 'Long-term commitment concerns'],
    opportunities: ['Clear plan comparison', 'HSA integration info']
  },
  {
    id: 'decision',
    title: 'Decision',
    description: 'Selecting plan and completing registration',
    color: 'bg-gray-600',
    icon: CreditCard,
    touchpoints: ['Stripe Checkout', 'Customer support', 'Online consultation', 'Payment processing'],
    emotions: ['Anticipating', 'Anxious', 'Committed'],
    actions: ['Selecting plan', 'Creating account', 'Medical consultation', 'Stripe payment setup'],
    painPoints: ['Privacy concerns', 'Complex forms', 'Payment security'],
    opportunities: ['Streamlined onboarding', 'Stripe security features', 'One-click payments']
  },
  {
    id: 'use',
    title: 'Active Use',
    description: 'Taking medication and engaging with services',
    color: 'bg-gray-700',
    icon: Smartphone,
    touchpoints: ['Delivery', 'Mobile app', 'Support', 'Care services', 'Stripe billing'],
    emotions: ['Hopeful', 'Engaged', 'Occasionally frustrated'],
    actions: ['Taking medication', 'Tracking progress', 'Seeking support', 'Managing subscription'],
    painPoints: ['Side effects', 'Habit formation', 'Delivery issues', 'Billing confusion'],
    opportunities: ['Personalized reminders', 'Easy support access', 'Stripe customer portal']
  },
  {
    id: 'renewal',
    title: 'Renewal',
    description: 'Evaluating continuation and plan modifications',
    color: 'bg-slate-800',
    icon: RefreshCw,
    touchpoints: ['Renewal emails', 'Stripe customer portal', 'Support for changes', 'Invoice management'],
    emotions: ['Reflective', 'Decisive', 'Satisfied/Concerned'],
    actions: ['Evaluating effectiveness', 'Reviewing options', 'Making changes', 'Managing payment methods'],
    painPoints: ['Uncertainty about continued need', 'Changing health needs', 'Subscription complexity'],
    opportunities: ['Progress highlights', 'Flexible modifications', 'Stripe subscription management']
  }
]

const mobileScreens = [
  {
    stage: 'awareness',
    title: 'Discovery',
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200/50 shadow-sm">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-bold text-blue-900">New Treatment Available</h4>
          </div>
          <p className="text-sm text-blue-700 leading-relaxed">Revolutionary subscription-based medication for your condition with proven results</p>
        </div>
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          Learn More About Treatment
        </Button>
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>FDA Approved</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>10k+ Patients</span>
          </div>
        </div>
      </div>
    )
  },
  {
    stage: 'consideration',
    title: 'Plans',
    content: (
      <div className="space-y-4">
        <div className="border rounded-2xl p-4 bg-white shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-900">Basic Plan</span>
            <span className="text-xl font-bold text-green-600">$25<span className="text-sm font-normal text-gray-500">/mo</span></span>
          </div>
          <p className="text-xs text-gray-600 mb-3">Monthly delivery + basic support</p>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <CheckCircle className="w-3 h-3 text-green-500" />
            <span>HSA/FSA Eligible</span>
          </div>
        </div>
        
        <div className="border-2 border-blue-500 rounded-2xl p-4 bg-blue-50/50 relative">
          <div className="absolute -top-2 left-4 px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
            Most Popular
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-900">Premium Plan</span>
            <span className="text-xl font-bold text-green-600">$45<span className="text-sm font-normal text-gray-500">/mo</span></span>
          </div>
          <p className="text-xs text-gray-600 mb-3">Everything + 24/7 support & tracking</p>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Priority delivery</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Health tracking app</span>
            </div>
          </div>
        </div>
        
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl">
          Continue with Premium
        </Button>
      </div>
    )
  },
  {
    stage: 'decision',
    title: 'Checkout',
    content: (
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Payment Method</label>
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium">**** **** **** 1234</span>
                </div>
                <span className="text-xs text-gray-500">Visa</span>
              </div>
            </div>
          </div>
          
                     <div className="bg-green-50 border border-green-200 rounded-xl p-4">
             <div className="flex items-center space-x-2 mb-2">
               <Shield className="w-4 h-4 text-green-600" />
               <span className="text-sm font-semibold text-green-800">Secure by Stripe</span>
             </div>
             <p className="text-xs text-green-700">256-bit SSL encryption • PCI DSS Level 1 compliant</p>
             <div className="flex items-center space-x-2 mt-2">
               <span className="text-xs text-gray-500">Powered by</span>
               <a href="https://stripe.com/payments" className="text-xs text-blue-600 font-medium">Stripe</a>
             </div>
           </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold">$45.00/month</span>
          </div>
                     <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-xl text-base shadow-lg">
             Complete with Stripe
           </Button>
           <div className="flex items-center justify-center space-x-2 mt-2">
             <span className="text-xs text-gray-400">Secure checkout by</span>
             <a href="https://stripe.com" className="text-xs text-blue-500 font-medium">stripe</a>
           </div>
        </div>
      </div>
    )
  },
  {
    stage: 'use',
    title: 'Health Dashboard',
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl border border-green-200/50">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-green-900">Today's Dose</span>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-sm text-green-700">Taken at 8:00 AM</p>
          <p className="text-xs text-green-600 mt-1">Next dose in 16 hours</p>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">Treatment Progress</span>
            <span className="text-sm text-gray-500">Day 15 of 30</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000" style={{ width: '50%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Started</span>
            <span>50% Complete</span>
            <span>Goal</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="rounded-xl py-3">
            <Clock className="w-4 h-4 mr-2" />
            Reminder
          </Button>
          <Button variant="outline" className="rounded-xl py-3">
            <Heart className="w-4 h-4 mr-2" />
            Symptoms
          </Button>
        </div>
      </div>
    )
  },
  {
    stage: 'renewal',
    title: 'Renewal',
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-2xl border border-emerald-200/50">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-bold text-emerald-900">Excellent Progress!</h4>
          </div>
          <p className="text-sm text-emerald-700">87% improvement in symptoms</p>
          <p className="text-xs text-emerald-600 mt-1">Based on your health tracking data</p>
        </div>
        
        <div className="space-y-3">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-xl">
            Continue Current Plan
          </Button>
          
          <Button variant="outline" className="w-full py-3 rounded-xl border-2">
            Modify Subscription
          </Button>
          
          <Button variant="ghost" className="w-full text-gray-500 py-3 rounded-xl">
            Pause Treatment
          </Button>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500">Need help deciding?</p>
          <Button variant="link" className="text-blue-500 text-xs p-0 h-auto">
            Schedule consultation
          </Button>
        </div>
      </div>
    )
  }
]

export default function CustomerJourneyPage() {
  const [isDark, setIsDark] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [activeStage, setActiveStage] = useState('')

  useEffect(() => {
    setIsVisible(true)
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
    }
  }, [])

  // Scroll spy to track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = journeyStages.map(stage => ({
        id: stage.id,
        element: document.getElementById(`stage-${stage.id}`)
      })).filter(section => section.element)

      const scrollY = window.scrollY + 150 // Offset for sticky nav

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element && section.element.offsetTop <= scrollY) {
          setActiveStage(section.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-black' 
        : 'bg-gradient-to-br from-white via-gray-50 to-blue-50'
    }`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        isDark 
          ? 'bg-black/20 border-gray-800/50' 
          : 'bg-white/70 border-gray-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-blue-600' : 'bg-blue-500'
              }`}>
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className={`font-semibold text-lg ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                AstraZeneca
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button className={`text-sm font-medium transition-colors hover:scale-105 ${
                isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}>
                Journey Map
              </button>
              <button className={`text-sm font-medium transition-colors hover:scale-105 ${
                isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}>
                Analytics
              </button>
              <button className={`text-sm font-medium transition-colors hover:scale-105 ${
                isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}>
                Insights
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl transition-all hover:scale-110 ${
                  isDark 
                    ? 'bg-gray-800/50 hover:bg-gray-700/50 text-yellow-400' 
                    : 'bg-gray-100/80 hover:bg-gray-200/80 text-gray-600'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button className="md:hidden" onClick={toggleMobileMenu}>
                <Menu className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-900'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t backdrop-blur-xl ${
            isDark ? 'border-gray-800/50 bg-black/20' : 'border-gray-200/50 bg-white/70'
          }`}>
            <div className="px-4 py-3 space-y-3">
              <button className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Journey Map
              </button>
              <button className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Analytics
              </button>
              <button className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Insights
              </button>
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Header */}
        <div className={`text-center mb-16 lg:mb-24 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center space-x-2 mb-6">
            <Badge className={`px-4 py-1.5 text-sm font-medium rounded-full ${
              isDark 
                ? 'bg-blue-900/30 text-blue-300 border-blue-800/50' 
                : 'bg-blue-50 text-blue-600 border-blue-200'
            }`}>
              ✨ Customer Journey Analysis
            </Badge>
          </div>
          
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Medication Subscription
            <span className={`block bg-gradient-to-r ${
              isDark 
                ? 'from-blue-400 to-purple-400' 
                : 'from-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}>
              Journey Map
            </span>
          </h1>
          
          <p className={`text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Understanding the complete customer experience from awareness to renewal, 
            optimizing touchpoints and addressing pain points along the way.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              isDark ? 'bg-white/10' : 'bg-white/80'
            } backdrop-blur-sm`}>
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Powered by
              </span>
              <a 
                href="https://stripe.com/payments" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`font-semibold text-blue-600 hover:text-blue-500 transition-colors`}
              >
                Stripe Payments
              </a>
            </div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              isDark ? 'bg-white/10' : 'bg-white/80'
            } backdrop-blur-sm`}>
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                AZ Sequence
              </span>
              <a 
                href="/AZSeq.png" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`font-semibold text-purple-600 hover:text-purple-500 transition-colors`}
              >
                View Diagram
              </a>
            </div>
          </div>
        </div>

        {/* Journey Overview */}
        <div className={`mb-16 lg:mb-24 transition-all duration-1000 delay-300 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
            {journeyStages.map((stage, index) => (
              <div
                key={stage.id}
                onClick={() => {
                  const element = document.getElementById(`stage-${stage.id}`)
                  if (element) {
                    const offsetTop = element.offsetTop - 100 // Account for sticky nav
                    window.scrollTo({
                      top: offsetTop,
                      behavior: 'smooth'
                    })
                  }
                }}
                className={`group relative overflow-hidden rounded-2xl lg:rounded-3xl p-6 lg:p-8 transition-all duration-500 hover:scale-105 cursor-pointer ${
                  activeStage === stage.id
                    ? isDark 
                      ? 'bg-white/15 backdrop-blur-xl border-2 border-blue-500/50 shadow-lg shadow-blue-500/20'
                      : 'bg-blue-50/80 backdrop-blur-xl border-2 border-blue-500/50 shadow-lg shadow-blue-500/20'
                    : isDark 
                      ? 'bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10' 
                      : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 hover:bg-white shadow-sm hover:shadow-xl'
                }`}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    const element = document.getElementById(`stage-${stage.id}`)
                    if (element) {
                      const offsetTop = element.offsetTop - 100 // Account for sticky nav
                      window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                      })
                    }
                  }
                }}
                aria-label={`Navigate to ${stage.title} section`}
              >
                {/* Stage Number */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isDark ? 'bg-white/10 text-white/60' : 'bg-gray-100 text-gray-500'
                }`}>
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`${stage.color} rounded-2xl p-4 mb-4 w-fit transition-transform group-hover:scale-110`}>
                  <stage.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className={`font-bold text-lg mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {stage.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {stage.description}
                </p>
                
                {/* Click indicator */}
                <div className={`mt-4 flex items-center text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <span>Click to view details</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDark ? 'bg-gradient-to-br from-white/5 to-transparent' : 'bg-gradient-to-br from-blue-50/50 to-transparent'
                }`} />
              </div>
            ))}
          </div>
        </div>

                {/* Detailed Journey Stages */}
        <div className="space-y-24 lg:space-y-32">
          {journeyStages.map((stage, stageIndex) => (
            <div 
              key={stage.id}
              id={`stage-${stage.id}`}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-start transition-all duration-1000 delay-${stageIndex * 200} transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {/* Stage Details */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className={`inline-flex items-center space-x-3 p-4 rounded-2xl ${
                    isDark 
                      ? 'bg-white/5 backdrop-blur-xl border border-white/10' 
                      : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-sm'
                  }`}>
                    <div className={`${stage.color} rounded-xl p-3`}>
                      <stage.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-3xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {stage.title}
                      </h3>
                      <p className={`${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {stage.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6">
                  {/* Touchpoints & Emotions Row */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                      isDark 
                        ? 'bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10' 
                        : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 hover:bg-white shadow-sm hover:shadow-lg'
                    }`}>
                      <h4 className={`font-semibold mb-4 flex items-center ${
                        isDark ? 'text-blue-300' : 'text-blue-600'
                      }`}>
                        <Smartphone className="w-4 h-4 mr-2" />
                        Touchpoints
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {stage.touchpoints.map((touchpoint, index) => (
                          <span 
                            key={index} 
                            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                              isDark 
                                ? 'bg-gray-800/50 text-gray-300 border border-gray-700/50' 
                                : 'bg-gray-50 text-gray-700 border border-gray-200'
                            }`}
                          >
                            {touchpoint}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                      isDark 
                        ? 'bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10' 
                        : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 hover:bg-white shadow-sm hover:shadow-lg'
                    }`}>
                      <h4 className={`font-semibold mb-4 flex items-center ${
                        isDark ? 'text-green-300' : 'text-green-600'
                      }`}>
                        <Heart className="w-4 h-4 mr-2" />
                        Emotions
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {stage.emotions.map((emotion, index) => (
                          <span 
                            key={index} 
                            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                              isDark 
                                ? 'bg-green-900/30 text-green-300 border border-green-800/50' 
                                : 'bg-green-50 text-green-700 border border-green-200'
                            }`}
                          >
                            {emotion}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Pain Points Row */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                      isDark 
                        ? 'bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10' 
                        : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 hover:bg-white shadow-sm hover:shadow-lg'
                    }`}>
                      <h4 className={`font-semibold mb-4 flex items-center ${
                        isDark ? 'text-purple-300' : 'text-purple-600'
                      }`}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Customer Actions
                      </h4>
                      <ul className="space-y-2">
                        {stage.actions.map((action, index) => (
                          <li key={index} className={`text-sm flex items-start ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0 ${
                              isDark ? 'bg-purple-400' : 'bg-purple-500'
                            }`} />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                      isDark 
                        ? 'bg-red-900/20 backdrop-blur-xl border border-red-800/30 hover:bg-red-900/30' 
                        : 'bg-red-50/80 backdrop-blur-xl border border-red-200/50 hover:bg-red-50 shadow-sm hover:shadow-lg'
                    }`}>
                      <h4 className={`font-semibold mb-4 flex items-center ${
                        isDark ? 'text-red-300' : 'text-red-600'
                      }`}>
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Pain Points
                      </h4>
                      <ul className="space-y-2">
                        {stage.painPoints.map((point, index) => (
                          <li key={index} className={`text-sm flex items-start ${
                            isDark ? 'text-red-200' : 'text-red-700'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0 ${
                              isDark ? 'bg-red-400' : 'bg-red-500'
                            }`} />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Opportunities */}
                  <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    isDark 
                      ? 'bg-gradient-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-xl border border-yellow-800/30' 
                      : 'bg-gradient-to-br from-yellow-50/80 to-orange-50/80 backdrop-blur-xl border border-yellow-200/50 shadow-sm hover:shadow-lg'
                  }`}>
                    <h4 className={`font-semibold mb-4 flex items-center ${
                      isDark ? 'text-yellow-300' : 'text-yellow-700'
                    }`}>
                      <Star className="w-4 h-4 mr-2" />
                      Opportunities
                    </h4>
                    <ul className="space-y-2">
                      {stage.opportunities.map((opportunity, index) => (
                        <li key={index} className={`text-sm flex items-start font-medium ${
                          isDark ? 'text-yellow-200' : 'text-yellow-800'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0 ${
                            isDark ? 'bg-yellow-400' : 'bg-yellow-600'
                          }`} />
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

                            {/* Mobile Mockup */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative group">
                  {/* Phone Frame */}
                  <div className={`w-80 h-[640px] rounded-[3rem] p-3 shadow-2xl transition-all duration-500 group-hover:scale-105 ${
                    isDark ? 'bg-gray-800' : 'bg-gray-900'
                  }`}>
                    <div className={`w-full h-full rounded-[2.5rem] overflow-hidden ${
                      isDark ? 'bg-gray-900' : 'bg-white'
                    }`}>
                      {/* Phone Status Bar */}
                      <div className={`flex items-center justify-between px-6 py-3 ${
                        isDark ? 'bg-gray-800' : 'bg-gray-50'
                      }`}>
                        <div className="flex items-center space-x-1">
                          <div className="flex space-x-1">
                            <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-white' : 'bg-gray-800'}`}></div>
                            <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-white' : 'bg-gray-800'}`}></div>
                            <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-white' : 'bg-gray-800'}`}></div>
                          </div>
                        </div>
                        <div className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          9:41 AM
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className={`w-6 h-3 rounded-sm border ${
                            isDark ? 'border-white' : 'border-gray-800'
                          }`}>
                            <div className={`w-4 h-1.5 rounded-sm mt-0.5 ml-0.5 ${
                              isDark ? 'bg-white' : 'bg-gray-800'
                            }`}></div>
                          </div>
                        </div>
                      </div>

                      {/* Phone Header */}
                      <div className={`${stage.color} text-white p-6 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-lg">{mobileScreens[stageIndex]?.title}</h4>
                            <stage.icon className="w-6 h-6 opacity-80" />
                          </div>
                          <p className="text-sm opacity-90">AstraZeneca Portal</p>
                        </div>
                      </div>
                       
                      {/* Phone Content */}
                      <div className={`p-6 flex-1 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                        {mobileScreens[stageIndex]?.content}
                      </div>

                      {/* Phone Navigation */}
                      <div className={`p-4 border-t ${
                        isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="flex justify-center">
                          <div className={`w-32 h-1 rounded-full ${
                            isDark ? 'bg-gray-700' : 'bg-gray-300'
                          }`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                   
                  {/* Stage indicator */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className={`px-4 py-2 rounded-full text-white font-medium text-sm shadow-lg ${stage.color}`}>
                      Stage {stageIndex + 1}
                    </div>
                  </div>

                  {/* Floating decorative elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-8 -left-4 w-12 h-12 bg-purple-500/20 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

                {/* Key Insights */}
        <div className={`mt-24 lg:mt-32 p-8 lg:p-12 rounded-3xl transition-all duration-1000 delay-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        } ${
          isDark 
            ? 'bg-white/5 backdrop-blur-xl border border-white/10' 
            : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-xl'
        }`}>
          <div className="text-center mb-12">
            <h3 className={`text-3xl lg:text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Key Insights & Recommendations
            </h3>
            <p className={`text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Actionable strategies to optimize the customer journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className={`group p-8 rounded-2xl transition-all duration-500 hover:scale-105 ${
              isDark 
                ? 'bg-blue-900/20 backdrop-blur-xl border border-blue-800/30 hover:bg-blue-900/30' 
                : 'bg-blue-50/80 backdrop-blur-xl border border-blue-200/50 hover:bg-blue-50 shadow-sm hover:shadow-lg'
            }`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                isDark ? 'bg-blue-600' : 'bg-blue-500'
              }`}>
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className={`text-xl font-bold mb-4 ${
                isDark ? 'text-blue-300' : 'text-blue-700'
              }`}>
                Patient-Centric Design
              </h4>
              <p className={`leading-relaxed ${
                isDark ? 'text-blue-200' : 'text-blue-700'
              }`}>
                Focus on clear communication about treatment benefits and address privacy concerns 
                throughout the journey to build trust and confidence.
              </p>
            </div>

            <div className={`group p-8 rounded-2xl transition-all duration-500 hover:scale-105 ${
              isDark 
                ? 'bg-green-900/20 backdrop-blur-xl border border-green-800/30 hover:bg-green-900/30' 
                : 'bg-green-50/80 backdrop-blur-xl border border-green-200/50 hover:bg-green-50 shadow-sm hover:shadow-lg'
            }`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                isDark ? 'bg-green-600' : 'bg-green-500'
              }`}>
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h4 className={`text-xl font-bold mb-4 ${
                isDark ? 'text-green-300' : 'text-green-700'
              }`}>
                Mobile-First Experience
              </h4>
              <p className={`leading-relaxed ${
                isDark ? 'text-green-200' : 'text-green-700'
              }`}>
                               Optimize mobile interfaces for easy subscription management, treatment tracking, 
               and seamless payment processing with HSA/FSA integration using 
               <a href="https://stripe.com/billing" target="_blank" rel="noopener noreferrer" className={`underline hover:no-underline ${
                 isDark ? 'text-green-200' : 'text-green-700'
               }`}> Stripe Billing</a>.
               </p>
             </div>

            <div className={`group p-8 rounded-2xl transition-all duration-500 hover:scale-105 ${
              isDark 
                ? 'bg-purple-900/20 backdrop-blur-xl border border-purple-800/30 hover:bg-purple-900/30' 
                : 'bg-purple-50/80 backdrop-blur-xl border border-purple-200/50 hover:bg-purple-50 shadow-sm hover:shadow-lg'
            }`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                isDark ? 'bg-purple-600' : 'bg-purple-500'
              }`}>
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className={`text-xl font-bold mb-4 ${
                isDark ? 'text-purple-300' : 'text-purple-700'
              }`}>
                Continuous Engagement
              </h4>
              <p className={`leading-relaxed ${
                isDark ? 'text-purple-200' : 'text-purple-700'
              }`}>
                Implement personalized support systems, progress tracking, and flexible renewal 
                options to maintain long-term patient engagement and satisfaction.
              </p>
            </div>
          </div>
         </div>

         {/* Personas Section */}
         <div className={`mt-24 lg:mt-32 transition-all duration-1000 delay-1100 transform ${
           isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
         }`}>
           <div className="text-center mb-16">
             <h3 className={`text-3xl lg:text-4xl font-bold mb-6 ${
               isDark ? 'text-white' : 'text-gray-900'
             }`}>
               Customer Personas & Journeys
             </h3>
             <p className={`text-lg ${
               isDark ? 'text-gray-300' : 'text-gray-600'
             }`}>
               Real customer scenarios showing different paths through the subscription experience
             </p>
           </div>

           <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
             {/* Thelma Persona */}
             <div className={`p-8 lg:p-10 rounded-3xl transition-all duration-500 hover:scale-105 ${
               isDark 
                 ? 'bg-white/5 backdrop-blur-xl border border-white/10' 
                 : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-xl'
             }`}>
               <div className="flex items-center space-x-4 mb-8">
                 <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                   isDark ? 'bg-green-600' : 'bg-green-500'
                 }`}>
                   <Users className="w-8 h-8 text-white" />
                 </div>
                 <div>
                   <h4 className={`text-2xl font-bold ${
                     isDark ? 'text-white' : 'text-gray-900'
                   }`}>
                     Thelma
                   </h4>
                   <p className={`${isDark ? 'text-green-300' : 'text-green-600'} font-medium`}>
                     Monthly Plan + HSA Payment
                   </p>
                 </div>
               </div>

               <div className="space-y-6">
                 <div className={`p-4 rounded-xl ${
                   isDark ? 'bg-gray-800/50' : 'bg-gray-50'
                 }`}>
                   <h5 className={`font-semibold mb-2 ${
                     isDark ? 'text-white' : 'text-gray-900'
                   }`}>
                     Profile
                   </h5>
                   <ul className={`text-sm space-y-1 ${
                     isDark ? 'text-gray-300' : 'text-gray-600'
                   }`}>
                     <li>• 34-year-old working professional</li>
                     <li>• Has HSA account for medical expenses</li>
                     <li>• Prefers month-to-month flexibility</li>
                     <li>• Values cost-effective healthcare solutions</li>
                   </ul>
                 </div>

                 <div className="space-y-4">
                   <h5 className={`font-semibold ${
                     isDark ? 'text-white' : 'text-gray-900'
                   }`}>
                     Journey Path
                   </h5>
                   
                   {[
                     {
                       stage: 'Awareness',
                       action: 'Discovers medication subscription through healthcare provider recommendation',
                       icon: Search,
                       color: 'text-blue-500'
                     },
                     {
                       stage: 'Consideration',
                       action: 'Compares monthly vs quarterly plans, focuses on HSA eligibility',
                       icon: Heart,
                       color: 'text-green-500'
                     },
                     {
                       stage: 'Decision',
                       action: 'Selects $25/month plan, pays with HSA card through Stripe',
                       icon: CreditCard,
                       color: 'text-purple-500'
                     },
                     {
                       stage: 'Active Use',
                       action: 'Receives monthly medication, tracks progress via mobile app',
                       icon: Smartphone,
                       color: 'text-orange-500'
                     },
                     {
                       stage: 'Renewal',
                       action: 'Sees 80% improvement, renews for another month via portal',
                       icon: RefreshCw,
                       color: 'text-red-500'
                     }
                   ].map((step, index) => (
                     <div key={step.stage} className="flex items-start space-x-3">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                         isDark ? 'bg-gray-700' : 'bg-gray-200'
                       }`}>
                         <step.icon className={`w-4 h-4 ${step.color}`} />
                       </div>
                       <div>
                         <h6 className={`font-medium ${
                           isDark ? 'text-white' : 'text-gray-900'
                         }`}>
                           {step.stage}
                         </h6>
                         <p className={`text-sm ${
                           isDark ? 'text-gray-300' : 'text-gray-600'
                         }`}>
                           {step.action}
                         </p>
                       </div>
                     </div>
                   ))}
                 </div>

                 <div className={`p-4 rounded-xl border-l-4 border-green-500 ${
                   isDark ? 'bg-green-900/20' : 'bg-green-50'
                 }`}>
                   <h6 className={`font-semibold mb-2 ${
                     isDark ? 'text-green-300' : 'text-green-700'
                   }`}>
                     Key Success Factors
                   </h6>
                   <ul className={`text-sm space-y-1 ${
                     isDark ? 'text-green-200' : 'text-green-600'
                   }`}>
                     <li>• HSA payment integration simplified checkout</li>
                     <li>• Monthly flexibility reduced commitment anxiety</li>
                     <li>• Clear progress tracking encouraged renewal</li>
                     <li>• Stripe's secure payment built trust</li>
                   </ul>
                 </div>
               </div>
             </div>

             {/* Louise Persona */}
             <div className={`p-8 lg:p-10 rounded-3xl transition-all duration-500 hover:scale-105 ${
               isDark 
                 ? 'bg-white/5 backdrop-blur-xl border border-white/10' 
                 : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-xl'
             }`}>
               <div className="flex items-center space-x-4 mb-8">
                 <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                   isDark ? 'bg-purple-600' : 'bg-purple-500'
                 }`}>
                   <Users className="w-8 h-8 text-white" />
                 </div>
                 <div>
                   <h4 className={`text-2xl font-bold ${
                     isDark ? 'text-white' : 'text-gray-900'
                   }`}>
                     Louise
                   </h4>
                   <p className={`${isDark ? 'text-purple-300' : 'text-purple-600'} font-medium`}>
                     Annual Plan + Portal Management
                   </p>
                 </div>
               </div>

               <div className="space-y-6">
                 <div className={`p-4 rounded-xl ${
                   isDark ? 'bg-gray-800/50' : 'bg-gray-50'
                 }`}>
                   <h5 className={`font-semibold mb-2 ${
                     isDark ? 'text-white' : 'text-gray-900'
                   }`}>
                     Profile
                   </h5>
                   <ul className={`text-sm space-y-1 ${
                     isDark ? 'text-gray-300' : 'text-gray-600'
                   }`}>
                     <li>• 45-year-old business executive</li>
                     <li>• Values long-term planning and savings</li>
                     <li>• Prefers comprehensive self-service options</li>
                     <li>• Tech-savvy and detail-oriented</li>
                   </ul>
                 </div>

                 <div className="space-y-4">
                   <h5 className={`font-semibold ${
                     isDark ? 'text-white' : 'text-gray-900'
                   }`}>
                     Journey Path
                   </h5>
                   
                   {[
                     {
                       stage: 'Awareness',
                       action: 'Research-driven discovery through medical journals and reviews',
                       icon: Search,
                       color: 'text-blue-500'
                     },
                     {
                       stage: 'Consideration',
                       action: 'Analyzes annual savings, reads detailed terms and conditions',
                       icon: Heart,
                       color: 'text-green-500'
                     },
                     {
                       stage: 'Decision',
                       action: 'Commits to $250/year plan, sets up credit card auto-payment',
                       icon: CreditCard,
                       color: 'text-purple-500'
                     },
                     {
                       stage: 'Active Use',
                       action: 'Actively uses Stripe customer portal to track payment history',
                       icon: Smartphone,
                       color: 'text-orange-500'
                     },
                     {
                       stage: 'Management',
                       action: 'Reviews 12 monthly payments, downloads invoices for taxes',
                       icon: RefreshCw,
                       color: 'text-red-500'
                     }
                   ].map((step, index) => (
                     <div key={step.stage} className="flex items-start space-x-3">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                         isDark ? 'bg-gray-700' : 'bg-gray-200'
                       }`}>
                         <step.icon className={`w-4 h-4 ${step.color}`} />
                       </div>
                       <div>
                         <h6 className={`font-medium ${
                           isDark ? 'text-white' : 'text-gray-900'
                         }`}>
                           {step.stage}
                         </h6>
                         <p className={`text-sm ${
                           isDark ? 'text-gray-300' : 'text-gray-600'
                         }`}>
                           {step.action}
                         </p>
                       </div>
                     </div>
                   ))}
                 </div>

                 <div className={`p-4 rounded-xl border-l-4 border-purple-500 ${
                   isDark ? 'bg-purple-900/20' : 'bg-purple-50'
                 }`}>
                   <h6 className={`font-semibold mb-2 ${
                     isDark ? 'text-purple-300' : 'text-purple-700'
                   }`}>
                     Key Success Factors
                   </h6>
                   <ul className={`text-sm space-y-1 ${
                     isDark ? 'text-purple-200' : 'text-purple-600'
                   }`}>
                     <li>• Annual discount incentivized long-term commitment</li>
                     <li>• Stripe portal provided complete payment transparency</li>
                     <li>• Self-service options matched her independence preference</li>
                     <li>• Detailed invoicing supported her business needs</li>
                   </ul>
                 </div>
               </div>
             </div>
           </div>

           {/* Persona Comparison */}
           <div className={`mt-16 p-8 lg:p-10 rounded-3xl ${
             isDark 
               ? 'bg-white/5 backdrop-blur-xl border border-white/10' 
               : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-xl'
           }`}>
             <h4 className={`text-2xl font-bold mb-8 text-center ${
               isDark ? 'text-white' : 'text-gray-900'
             }`}>
               Persona Journey Comparison
             </h4>
             
             <div className="grid md:grid-cols-2 gap-8">
               <div>
                 <h5 className={`font-semibold mb-4 flex items-center ${
                   isDark ? 'text-green-300' : 'text-green-600'
                 }`}>
                   <Users className="w-5 h-5 mr-2" />
                   Thelma's Path Highlights
                 </h5>
                 <div className="space-y-3">
                   <div className={`p-3 rounded-lg ${
                     isDark ? 'bg-green-900/20' : 'bg-green-50'
                   }`}>
                     <span className={`text-sm font-medium ${
                       isDark ? 'text-green-200' : 'text-green-700'
                     }`}>
                       Payment Method: HSA Card via Stripe
                     </span>
                   </div>
                   <div className={`p-3 rounded-lg ${
                     isDark ? 'bg-green-900/20' : 'bg-green-50'
                   }`}>
                     <span className={`text-sm font-medium ${
                       isDark ? 'text-green-200' : 'text-green-700'
                     }`}>
                       Plan: $25/month for flexibility
                     </span>
                   </div>
                   <div className={`p-3 rounded-lg ${
                     isDark ? 'bg-green-900/20' : 'bg-green-50'
                   }`}>
                     <span className={`text-sm font-medium ${
                       isDark ? 'text-green-200' : 'text-green-700'
                     }`}>
                       Outcome: Successful renewal after seeing results
                     </span>
                   </div>
                 </div>
               </div>

               <div>
                 <h5 className={`font-semibold mb-4 flex items-center ${
                   isDark ? 'text-purple-300' : 'text-purple-600'
                 }`}>
                   <Users className="w-5 h-5 mr-2" />
                   Louise's Path Highlights
                 </h5>
                 <div className="space-y-3">
                   <div className={`p-3 rounded-lg ${
                     isDark ? 'bg-purple-900/20' : 'bg-purple-50'
                   }`}>
                     <span className={`text-sm font-medium ${
                       isDark ? 'text-purple-200' : 'text-purple-700'
                     }`}>
                       Payment Method: Credit Card Auto-pay
                     </span>
                   </div>
                   <div className={`p-3 rounded-lg ${
                     isDark ? 'bg-purple-900/20' : 'bg-purple-50'
                   }`}>
                     <span className={`text-sm font-medium ${
                       isDark ? 'text-purple-200' : 'text-purple-700'
                     }`}>
                       Plan: $250/year for savings
                     </span>
                   </div>
                   <div className={`p-3 rounded-lg ${
                     isDark ? 'bg-purple-900/20' : 'bg-purple-50'
                   }`}>
                     <span className={`text-sm font-medium ${
                       isDark ? 'text-purple-200' : 'text-purple-700'
                     }`}>
                       Outcome: Active portal user for payment management
                     </span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>

         {/* Resources Section */}
         <div className={`mt-24 lg:mt-32 p-8 lg:p-12 rounded-3xl transition-all duration-1000 delay-1200 transform ${
           isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
         } ${
           isDark 
             ? 'bg-white/5 backdrop-blur-xl border border-white/10' 
             : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-xl'
         }`}>
           <div className="text-center mb-12">
             <h3 className={`text-2xl lg:text-3xl font-bold mb-4 ${
               isDark ? 'text-white' : 'text-gray-900'
             }`}>
               Resources & Documentation
             </h3>
             <p className={`text-lg ${
               isDark ? 'text-gray-300' : 'text-gray-600'
             }`}>
               Explore additional resources and technical documentation
             </p>
           </div>
           
           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
             <div className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
               isDark 
                 ? 'bg-blue-900/20 backdrop-blur-xl border border-blue-800/30 hover:bg-blue-900/30' 
                 : 'bg-blue-50/80 backdrop-blur-xl border border-blue-200/50 hover:bg-blue-50 shadow-sm hover:shadow-lg'
             }`}>
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                 isDark ? 'bg-blue-600' : 'bg-blue-500'
               }`}>
                 <CreditCard className="w-5 h-5 text-white" />
               </div>
               <h4 className={`font-bold mb-2 ${
                 isDark ? 'text-blue-300' : 'text-blue-700'
               }`}>
                 Stripe Payments
               </h4>
               <p className={`text-sm mb-3 ${
                 isDark ? 'text-blue-200' : 'text-blue-600'
               }`}>
                 Payment processing documentation
               </p>
               <a 
                 href="https://stripe.com/docs/payments"
                 target="_blank"
                 rel="noopener noreferrer"
                 className={`text-sm font-medium hover:underline ${
                   isDark ? 'text-blue-400' : 'text-blue-600'
                 }`}
               >
                 View Documentation →
               </a>
             </div>

                           <div className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-purple-900/20 backdrop-blur-xl border border-purple-800/30 hover:bg-purple-900/30' 
                  : 'bg-purple-50/80 backdrop-blur-xl border border-purple-200/50 hover:bg-purple-50 shadow-sm hover:shadow-lg'
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                  isDark ? 'bg-purple-600' : 'bg-purple-500'
                }`}>
                  <RefreshCw className="w-5 h-5 text-white" />
                </div>
                <h4 className={`font-bold mb-2 ${
                  isDark ? 'text-purple-300' : 'text-purple-700'
                }`}>
                  AZ Sequence Diagram
                </h4>
                <p className={`text-sm mb-3 ${
                  isDark ? 'text-purple-200' : 'text-purple-600'
                }`}>
                  Complete subscription flow diagram
                </p>
                <a 
                  href="/AZSeq.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium hover:underline ${
                    isDark ? 'text-purple-400' : 'text-purple-600'
                  }`}
                >
                  View AZ Sequence →
                </a>
              </div>



             <div className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
               isDark 
                 ? 'bg-green-900/20 backdrop-blur-xl border border-green-800/30 hover:bg-green-900/30' 
                 : 'bg-green-50/80 backdrop-blur-xl border border-green-200/50 hover:bg-green-50 shadow-sm hover:shadow-lg'
             }`}>
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                 isDark ? 'bg-green-600' : 'bg-green-500'
               }`}>
                 <Users className="w-5 h-5 text-white" />
               </div>
               <h4 className={`font-bold mb-2 ${
                 isDark ? 'text-green-300' : 'text-green-700'
               }`}>
                 Customer Portal
               </h4>
               <p className={`text-sm mb-3 ${
                 isDark ? 'text-green-200' : 'text-green-600'
               }`}>
                 Self-service billing portal
               </p>
               <a 
                 href="https://stripe.com/docs/billing/subscriptions/customer-portal"
                 target="_blank"
                 rel="noopener noreferrer"
                 className={`text-sm font-medium hover:underline ${
                   isDark ? 'text-green-400' : 'text-green-600'
                 }`}
               >
                 Learn More →
               </a>
             </div>

             <div className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
               isDark 
                 ? 'bg-orange-900/20 backdrop-blur-xl border border-orange-800/30 hover:bg-orange-900/30' 
                 : 'bg-orange-50/80 backdrop-blur-xl border border-orange-200/50 hover:bg-orange-50 shadow-sm hover:shadow-lg'
             }`}>
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                 isDark ? 'bg-orange-600' : 'bg-orange-500'
               }`}>
                 <Shield className="w-5 h-5 text-white" />
               </div>
               <h4 className={`font-bold mb-2 ${
                 isDark ? 'text-orange-300' : 'text-orange-700'
               }`}>
                 Security Guide
               </h4>
               <p className={`text-sm mb-3 ${
                 isDark ? 'text-orange-200' : 'text-orange-600'
               }`}>
                 Healthcare compliance docs
               </p>
               <a 
                 href="https://stripe.com/docs/security"
                 target="_blank"
                 rel="noopener noreferrer"
                 className={`text-sm font-medium hover:underline ${
                   isDark ? 'text-orange-400' : 'text-orange-600'
                 }`}
               >
                 View Guide →
               </a>
             </div>
           </div>
         </div>
      </div>

      {/* Floating Chat Button */}
      <button
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          isDark 
            ? 'bg-blue-600 hover:bg-blue-500' 
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 text-white mx-auto" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      </button>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
          isDark 
            ? 'bg-gray-800/80 hover:bg-gray-700/80 text-white' 
            : 'bg-white/80 hover:bg-white text-gray-600'
        } backdrop-blur-xl border border-gray-200/50 shadow-xl`}
        aria-label="Scroll to top"
      >
        <ChevronDown className="w-5 h-5 mx-auto rotate-180" />
      </button>
    </div>
  )
} 