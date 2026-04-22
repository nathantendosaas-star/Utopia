import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User as UserIcon, Package } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export function UserProfile() {
  const { isUserOpen, setUserOpen, user, login, logout } = useStore();

  return (
    <AnimatePresence>
      {isUserOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setUserOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-bg-primary)] border-l border-[var(--color-border-subtle)] z-[1001] flex flex-col"
          >
            <div className="p-[var(--space-6)] border-b border-[var(--color-border-subtle)] flex justify-between items-center">
              <h2 className="font-display text-[var(--text-heading-sm)] uppercase">Identity</h2>
              <button onClick={() => setUserOpen(false)} className="hover:text-[var(--color-accent-primary)] transition-colors">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-[var(--space-6)] flex flex-col gap-[var(--space-8)]" data-lenis-prevent>
              {!user ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
                  <div className="w-16 h-16 rounded-full border border-[var(--color-border-subtle)] flex items-center justify-center bg-[var(--color-bg-secondary)]">
                    <UserIcon size={24} className="text-[var(--color-text-secondary)]" />
                  </div>
                  <div>
                    <h3 className="font-display text-[var(--text-heading-sm)] uppercase mb-2">Unidentified</h3>
                    <p className="font-mono text-[var(--text-micro)] text-[var(--color-text-secondary)] uppercase tracking-[var(--tracking-widest)]">Access your archive and purchase history</p>
                  </div>
                  <button onClick={login} className="btn-primary w-full justify-center">
                    AUTHENTICATE (DEMO)
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 pb-[var(--space-6)] border-b border-[var(--color-border-subtle)]">
                    <div className="w-16 h-16 rounded-full border border-[var(--color-border-subtle)] flex items-center justify-center bg-[var(--color-bg-secondary)]">
                      <UserIcon size={24} />
                    </div>
                    <div>
                      <h3 className="font-display text-[var(--text-heading-sm)] uppercase">{user.name}</h3>
                      <p className="font-mono text-[var(--text-micro)] text-[var(--color-text-secondary)] tracking-[var(--tracking-widest)]">{user.email}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-[var(--text-micro)] uppercase tracking-[var(--tracking-widest)] text-[var(--color-text-secondary)] mb-[var(--space-4)]">Purchase History</h4>
                    
                    {user.orders.length === 0 ? (
                      <div className="border border-dashed border-[var(--color-border-subtle)] p-8 text-center">
                        <p className="font-mono text-[var(--text-micro)] text-[var(--color-text-secondary)] uppercase tracking-[var(--tracking-widest)]">No past purchases</p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-[var(--space-4)]">
                        {user.orders.map(order => (
                          <div key={order.id} className="border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] p-[var(--space-4)]">
                            <div className="flex justify-between items-center mb-[var(--space-4)] pb-[var(--space-2)] border-b border-[var(--color-border-subtle)]">
                              <span className="font-mono text-[var(--text-micro)] tracking-[var(--tracking-widest)]">{order.id}</span>
                              <span className="font-mono text-[var(--text-micro)] text-[var(--color-text-secondary)]">{new Date(order.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex flex-col gap-[var(--space-2)] mb-[var(--space-4)]">
                              {order.items.map(item => (
                                <div key={item.product.id} className="flex justify-between items-center">
                                  <span className="font-display text-[var(--text-body-sm)] uppercase">{item.quantity}x {item.product.name}</span>
                                  <span className="font-mono text-[var(--text-micro)] text-[var(--color-text-secondary)]">${item.product.price * item.quantity}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between items-center pt-[var(--space-2)] border-t border-[var(--color-border-subtle)]">
                              <span className="font-mono text-[var(--text-micro)] uppercase tracking-[var(--tracking-widest)] text-[var(--color-text-secondary)]">Total</span>
                              <span className="font-mono text-[var(--text-body-sm)]">${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-[var(--space-6)]">
                    <button onClick={logout} className="btn-secondary w-full justify-center">
                      DISCONNECT
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
