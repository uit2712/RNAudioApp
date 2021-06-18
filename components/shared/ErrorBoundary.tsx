import React, { ErrorInfo, ReactNode } from 'react';

import { Text } from 'react-native';

interface Props {
    children: ReactNode;
    message: string;
}

interface State {
    hasError: boolean;
    defaultMessage?: string;
}
class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            defaultMessage: 'Something went wrong.',
        };
    }

    static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return {
            hasError: true,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
    }

    render() {
        const error = this.props.message ?? this.state.defaultMessage ?? 'Error';
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <Text>{error}</Text>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;