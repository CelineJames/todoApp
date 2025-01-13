// src/components/ErrorBoundary.js
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service or console
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <div className="container-error">
          <h1>Something went wrong...</h1>
          <p>There was a problem proccessing the request, please try again.</p>
          <button className="reload" onClick={() => window.location.reload()}>
            Reload Page
          </button>
          <button className="home">
            <a href="/">Go to Home</a>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}


export default ErrorBoundary;
