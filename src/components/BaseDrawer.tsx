import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface BaseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: string;
  fullScreen?: boolean;
  side?: 'left' | 'right';
}

export function BaseDrawer({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  children, 
  footer,
  maxWidth = "450px",
  fullScreen = false,
  side = 'right'
}: BaseDrawerProps) {
  const isLeft = side === 'left';
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[1000]"
          />
          <motion.div
            initial={{ x: isLeft ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isLeft ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed top-0 ${isLeft ? 'left-0' : 'right-0'} h-full w-full ${fullScreen ? 'max-w-none' : `max-w-[${maxWidth}]`} bg-[var(--color-bg-primary)] ${isLeft ? 'border-r' : 'border-l'} border-white/10 z-[1001] flex flex-col text-white`}
          >
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-white/5 flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <h2 className="text-heading text-xl sm:text-2xl text-white">{title}</h2>
                {subtitle && (
                    <p className="text-technical text-[8px] sm:text-[9px] text-gray-500 uppercase tracking-widest">{subtitle}</p>
                )}
              </div>
              <button onClick={onClose} className="hover:opacity-50 transition-opacity p-2 text-white">
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 scrollbar-hide" data-lenis-prevent>
                {children}
            </div>

            {/* Footer */}
            {footer && (
                <div className="border-t border-white/5 bg-[var(--color-bg-primary)]">
                    {footer}
                </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
