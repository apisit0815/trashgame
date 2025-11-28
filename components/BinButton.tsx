import React from 'react';
import { BinType } from '../types';
import { BIN_CONFIG } from '../constants';

interface BinButtonProps {
  type: BinType;
  onClick: (type: BinType) => void;
  disabled: boolean;
}

export const BinButton: React.FC<BinButtonProps> = ({ type, onClick, disabled }) => {
  const config = BIN_CONFIG[type];

  return (
    <button
      onClick={() => onClick(type)}
      disabled={disabled}
      className={`
        relative overflow-hidden group
        flex flex-col items-center justify-center
        p-4 h-48 w-full rounded-2xl shadow-lg border-b-8 transition-all duration-200
        ${config.colorClass} ${config.borderColor}
        ${!disabled ? `${config.hoverClass} active:border-b-0 active:translate-y-2` : 'opacity-70 cursor-not-allowed'}
      `}
    >
      {/* Icon Background Pattern */}
      <div className="absolute inset-0 opacity-10 text-6xl flex items-center justify-center select-none pointer-events-none">
        {config.icon}
      </div>

      <div className="z-10 text-5xl mb-3 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">
        {config.icon}
      </div>
      
      <h3 className="z-10 text-xl font-bold text-white drop-shadow-md text-center leading-tight">
        {config.label}
      </h3>
      <p className="z-10 text-sm text-white/90 font-light text-center">
        {config.thaiLabel}
      </p>
    </button>
  );
};