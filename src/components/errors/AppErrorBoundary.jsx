import React from 'react';
import Error500 from './Error500';

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, requestId: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Example: generate a simple correlation id
    const requestId = Math.random().toString(36).slice(2, 10).toUpperCase();
    // TODO: log to your monitoring service with { error, info, requestId }
    this.setState({ requestId });
    // console.error('AppErrorBoundary caught:', { error, info, requestId });
  }

  handleRetry = () => {
    // Reset and let children re-render
    this.setState({ hasError: false, error: null, requestId: null });
    // Or hard reload:
    // window.location.reload();
  };

  render() {
    const { hasError, requestId } = this.state;
    if (hasError) {
      return (
        <Error500
          onRetry={this.handleRetry}
          requestId={requestId}
        />
      );
    }
    return this.props.children;
  }
}

export default AppErrorBoundary;
