import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RotateCcw, Compass } from 'lucide-react';
import { FantasyButton } from './FantasyButton';

interface ErrorBoundaryProps {
  children: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error?.message || 'An unexpected disturbance halted the runic sequence.',
    };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught a gameplay error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  private handleReturnToMap = () => {
    this.setState({ hasError: false, errorMessage: '' });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-[400px] flex items-center justify-center p-4">
          <div className="max-w-lg w-full p-6 rounded-2xl bg-[#1f1007] border-3 border-[#854d0e] shadow-2xl text-center flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-red-950/80 border-2 border-red-500/60 flex items-center justify-center text-red-400">
              <ShieldAlert className="w-7 h-7" />
            </div>

            <div>
              <h2 className="font-adventure text-xl text-amber-200 uppercase tracking-wider">
                Runic Ward Disrupted
              </h2>
              <p className="font-medieval text-sm text-[#fbd38d] mt-2 leading-relaxed">
                The magical interpreter encountered an anomalous script. Your progress is safe and your adventurer stands ready.
              </p>
              {this.state.errorMessage && (
                <div className="mt-3 p-2.5 rounded bg-[#0f0703] border border-[#522b0f] font-code text-xs text-amber-300/80 overflow-x-auto">
                  {this.state.errorMessage}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <FantasyButton
                type="button"
                variant="gold"
                size="md"
                icon={<RotateCcw className="w-4 h-4" />}
                onClick={this.handleRetry}
              >
                Retry Challenge
              </FantasyButton>

              <FantasyButton
                type="button"
                variant="wood"
                size="md"
                icon={<Compass className="w-4 h-4" />}
                onClick={this.handleReturnToMap}
              >
                Return to World 1
              </FantasyButton>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
