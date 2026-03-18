import React from 'react';
import { FaQuestion } from 'react-icons/fa';

function Card({ card, isFlipped, isMatched, onFlip }) {
  const handleClick = () => {
    if (!isFlipped && !isMatched) onFlip(card.id);
  };

  const isOpen = isFlipped || isMatched;
  const IconComponent = card.icon;

  return (
    <div
      onClick={handleClick}
      style={{ perspective: '600px' }}
      className="w-20 h-24 cursor-pointer select-none"
    >
      <div
        style={{
          transition: 'transform 0.5s ease',
          transformStyle: 'preserve-3d',
          transform: isOpen ? 'rotateY(180deg)' : 'rotateY(0deg)',
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Sisi belakang (tertutup) */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg"
        >
          <FaQuestion className="text-white/60 text-2xl" />
        </div>

        {/* Sisi depan (terbuka) */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className={`absolute inset-0 flex items-center justify-center rounded-xl shadow-md text-3xl
            ${isMatched ? 'bg-green-50 ring-2 ring-green-400' : 'bg-white'}
          `}
        >
          <IconComponent style={{ color: card.color }} />
        </div>
      </div>
    </div>
  );
}

export default Card;