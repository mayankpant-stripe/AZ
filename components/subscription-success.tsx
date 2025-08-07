"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, User, CreditCard, FileText, X } from 'lucide-react'
import { motion } from "framer-motion"

interface SubscriptionSuccessProps {
  customerName: string
  subscriptionId: string
  invoiceId?: string
  onClose?: () => void
}

export function SubscriptionSuccess({ customerName, subscriptionId, invoiceId, onClose }: SubscriptionSuccessProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <Card className="w-full max-w-md mx-4 bg-white shadow-2xl border-0" onClick={(e) => e.stopPropagation()}>
        <CardContent className="p-8 relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}
          <div className="text-center space-y-6">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-8 h-8 text-green-600" />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Congratulations!
              </h2>
              <p className="text-gray-600">
                Your subscription is ready.
              </p>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              {/* Customer Name */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-500" />
                <div className="text-left">
                  <p className="text-sm text-gray-500">Customer Name</p>
                  <p className="font-semibold text-gray-900">{customerName}</p>
                </div>
              </div>

              {/* Subscription ID */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <CreditCard className="w-5 h-5 text-gray-500" />
                <div className="text-left">
                  <p className="text-sm text-gray-500">Subscription ID</p>
                  <p className="font-mono text-sm font-semibold text-gray-900 break-all">
                    {subscriptionId}
                  </p>
                </div>
              </div>

              {/* Invoice Number */}
              {invoiceId && (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Invoice Number</p>
                    <p className="font-mono text-sm font-semibold text-gray-900 break-all">
                      {invoiceId}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Success Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Subscription Active
              </Badge>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 