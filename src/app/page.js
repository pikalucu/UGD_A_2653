"use client";

import React, { useState, useEffect, useCallback } from "react";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";
import { GiCardJoker } from "react-icons/gi";
import {
  FaAppleAlt, FaLemon, FaHeart, FaStar, FaBolt,
  FaGem, FaLeaf, FaSnowflake, FaMoon, FaSun,
} from "react-icons/fa";

const ALL_ICONS = [
  { icon: FaAppleAlt, color: "#ef4444" },
  { icon: FaLemon,    color: "#eab308" },
  { icon: FaHeart,    color: "#ec4899" },
  { icon: FaStar,     color: "#f97316" },
  { icon: FaBolt,     color: "#3b82f6" },
  { icon: FaGem,      color: "#8b5cf6" },
  { icon: FaLeaf,     color: "#22c55e" },
  { icon: FaSnowflake,color: "#06b6d4" },
  { icon: FaMoon,     color: "#a78bfa" },
  { icon: FaSun,      color: "#fbbf24" },
];

const LEVELS = {
  Easy:   { label: "Easy (4)",   pairs: 4  },
  Medium: { label: "Medium (6)", pairs: 6  },
  Hard:   { label: "Hard (8)",   pairs: 8  },
};

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createCards = (pairs) => {
  const selected = ALL_ICONS.slice(0, pairs);
  const paired = selected.flatMap((item, index) => [
    { id: index * 2,     icon: item.icon, color: item.color, pairId: index },
    { id: index * 2 + 1, icon: item.icon, color: item.color, pairId: index },
  ]);
  return shuffleArray(paired);
};

export default function Home() {
  const [level, setLevel]           = useState("Easy");
  const [cards, setCards]           = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves]           = useState(0);
  const [seconds, setSeconds]       = useState(0);
  const [isRunning, setIsRunning]   = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const totalPairs = LEVELS[level].pairs;

  // Init game
  const startGame = useCallback((selectedLevel) => {
    const lvl = selectedLevel || level;
    setCards(createCards(LEVELS[lvl].pairs));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setSeconds(0);
    setIsRunning(false);
    setIsComplete(false);
  }, [level]);

  useEffect(() => { startGame(); }, []);

  // Timer
  useEffect(() => {
    if (!isRunning || isComplete) return;
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning, isComplete]);

  // Cek kecocokan
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [a, b] = flippedCards;
      const cardA = cards.find(c => c.id === a);
      const cardB = cards.find(c => c.id === b);
      setMoves(prev => prev + 1);
      if (cardA.pairId === cardB.pairId) {
        const newMatched = [...matchedCards, a, b];
        setMatchedCards(newMatched);
        setFlippedCards([]);
        if (newMatched.length === totalPairs * 2) {
          setIsComplete(true);
          setIsRunning(false);
        }
      } else {
        const timer = setTimeout(() => setFlippedCards([]), 800);
        return () => clearTimeout(timer);
      }
    }
  }, [flippedCards, cards]);

  const handleFlip = (id) => {
    if (!isRunning) setIsRunning(true);
    if (flippedCards.length < 2 && !flippedCards.includes(id) && !matchedCards.includes(id)) {
      setFlippedCards(prev => [...prev, id]);
    }
  };

  const handleLevelChange = (lvl) => {
    setLevel(lvl);
    startGame(lvl);
    setCards(createCards(LEVELS[lvl].pairs));
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-indigo-900 p-4">
      {/* Judul */}
      <h1 className="text-4xl font-bold mb-5 text-white flex items-center gap-3">
        <GiCardJoker className="text-yellow-300 text-4xl" />
        Memory Card
      </h1>

      {/* Pilih Level */}
      <div className="flex gap-2 mb-5">
        {Object.keys(LEVELS).map(lvl => (
          <button
            key={lvl}
            onClick={() => handleLevelChange(lvl)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              level === lvl
                ? "bg-yellow-400 text-indigo-900"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {LEVELS[lvl].label}
          </button>
        ))}
      </div>

      {/* ScoreBoard */}
      <ScoreBoard
        seconds={formatTime(seconds)}
        moves={moves}
        matchedCount={matchedCards.length / 2}
        totalPairs={totalPairs}
        isComplete={isComplete}
        onReset={() => startGame()}
      />

      {/* GameBoard */}
      <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl shadow-2xl">
        <GameBoard
          cards={cards}
          flippedCards={flippedCards}
          matchedCards={matchedCards}
          onFlip={handleFlip}
          totalPairs={totalPairs}
        />
      </div>
    </div>
  );
}