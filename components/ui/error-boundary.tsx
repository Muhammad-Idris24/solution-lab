'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('LMS UI Error Boundary', { error, info });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] grid place-items-center p-8">
          <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <h2 className="text-xl font-bold text-red-700">Something went wrong.</h2>
            <p className="mt-2 text-sm text-red-600">Please refresh the page or contact support.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
