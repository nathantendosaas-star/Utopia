import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // Here we would report to a service like Sentry
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen flex items-center justify-center bg-black p-6 text-center">
          <div className="max-w-md w-full space-y-8 border border-red-500/20 bg-red-500/5 p-12">
            <div className="flex flex-col items-center gap-6">
              <div className="p-4 border border-red-500/20">
                <AlertTriangle size={40} className="text-red-500" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-black uppercase tracking-tighter text-white">SYSTEM_CRASH</h1>
                <p className="text-[10px] font-mono opacity-60 uppercase tracking-widest leading-relaxed">
                  An unexpected runtime error has occurred in the core layer.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <button 
                onClick={this.handleRetry}
                className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-3"
              >
                <RefreshCcw size={14} />
                [ REBOOT_SYSTEM ]
              </button>
              <a 
                href="/"
                className="w-full py-4 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-white hover:border-white transition-all flex items-center justify-center gap-3"
              >
                <Home size={14} />
                [ RETURN_TO_BASE ]
              </a>
            </div>
            
            <div className="pt-6 border-t border-white/5">
              <p className="text-[8px] font-mono opacity-20 uppercase tracking-[0.2em] break-all">
                ERR_LOG: {this.state.error?.message || 'UNKNOWN_EXCEPTION'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
