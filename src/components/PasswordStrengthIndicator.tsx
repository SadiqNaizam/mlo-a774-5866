import React, { useState, useEffect } from 'react';

interface PasswordStrengthIndicatorProps {
  password?: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password = '' }) => {
  console.log('PasswordStrengthIndicator loaded');

  const [strengthLevel, setStrengthLevel] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState('');

  useEffect(() => {
    const evaluateStrength = (pass: string): number => {
      if (!pass) return 0;

      let score = 0;
      const hasLowerCase = /[a-z]/.test(pass);
      const hasUpperCase = /[A-Z]/.test(pass);
      const hasNumbers = /\d/.test(pass);
      const hasSymbols = /[^a-zA-Z0-9]/.test(pass);

      if (pass.length >= 8) {
        score++;
      }
      if (hasLowerCase && hasUpperCase) {
        score++;
      }
      if (hasNumbers) {
        score++;
      }
      if (hasSymbols) {
        score++;
      }

      // Override for short passwords
      if (pass.length > 0 && pass.length < 8) {
        return 1;
      }
      
      // Map score to strength level
      if (score <= 1) return 1; // Weak
      if (score === 2) return 2; // Medium
      if (score >= 3) return 3; // Strong
      
      return 0;
    };

    const level = evaluateStrength(password);
    setStrengthLevel(level);

    switch (level) {
      case 1:
        setStrengthLabel('Weak');
        break;
      case 2:
        setStrengthLabel('Medium');
        break;
      case 3:
        setStrengthLabel('Strong');
        break;
      default:
        setStrengthLabel('');
        break;
    }
  }, [password]);

  if (!password) {
    return null;
  }

  const getBarClass = (barIndex: number): string => {
    if (strengthLevel === 0) return 'bg-gray-200 dark:bg-gray-700';
    
    if (barIndex < strengthLevel) {
      if (strengthLevel === 1) return 'bg-red-500';
      if (strengthLevel === 2) return 'bg-yellow-500';
      if (strengthLevel === 3) return 'bg-green-500';
    }
    
    return 'bg-gray-200 dark:bg-gray-700';
  };

  const getLabelClass = (): string => {
    switch (strengthLevel) {
      case 1:
        return 'text-red-500';
      case 2:
        return 'text-yellow-500';
      case 3:
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="w-full mt-2" aria-live="polite">
      <div className="grid grid-cols-3 gap-1.5">
        <div className={`h-1 rounded-full transition-colors duration-300 ${getBarClass(0)}`}></div>
        <div className={`h-1 rounded-full transition-colors duration-300 ${getBarClass(1)}`}></div>
        <div className={`h-1 rounded-full transition-colors duration-300 ${getBarClass(2)}`}></div>
      </div>
      {strengthLabel && (
        <p className={`text-xs mt-1.5 font-medium ${getLabelClass()}`}>
          Password strength: {strengthLabel}
        </p>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;