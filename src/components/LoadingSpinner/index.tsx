import React from 'react';
import './styles.scss';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="loading-spinner-container" data-testid="loading-spinner">
            <div className="loading-spinner"></div>
        </div>
    );
};

export default LoadingSpinner;