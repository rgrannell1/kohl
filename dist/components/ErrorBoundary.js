import React from 'react';
import ink from 'ink';
const { Box, Text, Newline, } = ink;
const writeError = (err, errInfo) => {
};
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        writeError(error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return React.createElement(Text, null, "Something went wrong.");
        }
        return this.props.children;
    }
}
//# sourceMappingURL=ErrorBoundary.js.map