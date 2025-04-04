"use client";

import { motion } from "framer-motion";

const LoadingOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 rounded-lg"
  >
    <div className="text-center animate-pulse">
      <p className="text-[#0b1c35] font-medium text-sm">A verificar dados do utilizador...</p>
    </div>
  </motion.div>
);

export default LoadingOverlay;
