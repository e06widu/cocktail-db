import React, { useState, useEffect } from 'react';
import './styles.scss'

interface ToastProps {
  message: string;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  if (!visible) {
    return null;
  }

  return (
    <div className="toast">
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;
