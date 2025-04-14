"use client"

import { motion } from "framer-motion"
import { CheckCircle, AlertCircle, X } from "lucide-react"

interface SuccessPopupProps {
  type: "success" | "error" | "warning"
  message: string
  onClose: () => void
}

const SuccessPopup = ({ type, message, onClose }: SuccessPopupProps) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "error":
        return <AlertCircle className="h-6 w-6 text-red-500" />
      case "warning":
        return <AlertCircle className="h-6 w-6 text-yellow-500" />
      default:
        return <CheckCircle className="h-6 w-6 text-green-500" />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-100"
      case "error":
        return "bg-red-50 border-red-100"
      case "warning":
        return "bg-yellow-50 border-yellow-100"
      default:
        return "bg-green-50 border-green-100"
    }
  }

  const getTextColor = () => {
    switch (type) {
      case "success":
        return "text-green-800"
      case "error":
        return "text-red-800"
      case "warning":
        return "text-yellow-800"
      default:
        return "text-green-800"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 right-4 left-4 md:top-6 md:right-6 md:left-auto md:max-w-md z-50 ${getBackgroundColor()} border rounded-lg shadow-lg p-4 flex items-start`}
    >
      <div className="flex-shrink-0 mr-3">{getIcon()}</div>
      <div className="flex-grow">
        <p className={`${getTextColor()} font-medium`}>{message}</p>
      </div>
      <button onClick={onClose} className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600">
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  )
}

export default SuccessPopup
