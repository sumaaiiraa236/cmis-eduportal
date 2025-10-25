// src/components/ErrorBoundary.jsx
import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-white">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                    <AlertTriangle className="w-10 h-10" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-1">Oops! Something went wrong</h1>
                    <p className="text-red-100">We encountered an unexpected error</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">What happened?</h2>
                  <p className="text-gray-600 leading-relaxed">
                    The application encountered an error and couldn't continue. This has been logged and our team will look into it.
                  </p>
                </div>

                {/* Error details (in development) */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <div className="mb-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Error Details:</h3>
                    <pre className="text-xs text-red-600 overflow-auto max-h-40 font-mono">
                      {this.state.error.toString()}
                    </pre>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={this.handleReset}
                    className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <Home className="w-5 h-5" />
                    Back to Home
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reload Page
                  </button>
                </div>
              </div>
            </div>

            {/* Helper text */}
            <p className="text-center mt-6 text-gray-600 text-sm">
              If this problem persists, please contact support
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;