"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
