import React from "react";

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App Crash:", error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Something went wrong
          </h1>

          <p className="text-gray-600 mb-6 text-center">
            The application crashed unexpectedly.
          </p>

          <button
            onClick={this.handleRefresh}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default AppErrorBoundary;
