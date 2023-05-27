'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type MainWrapperType = {
  children: ReactNode;
  className?: string;
};

export function MainWrapper({ children, className }: MainWrapperType) {
  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        exit={{ opacity: 0, y: 15 }}
        className={className}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
