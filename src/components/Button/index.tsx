import React, { ReactNode } from 'react';
import './styles.scss';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, icon, disabled }) => {
  return (
    <button className={`custom-button ${disabled ? 'disabled' : ''}`} onClick={onClick} disabled={disabled}>
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;