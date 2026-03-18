import React from "react";
import { FaClock, FaMousePointer, FaCheck, FaSyncAlt, FaRedo } from "react-icons/fa";

function ScoreBoard({ seconds, moves, matchedCount, totalPairs, isComplete, onReset }) {
  return (
    <div className="text-center mb-5 w-full max-w-sm">
      {/* Stats */}
      <div className="flex justify-center gap-3 mb-4">
        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl flex flex-col items-center min-w-[80px]">
          <p className="text-xs text-indigo-300 flex items-center gap-1 mb-1">
            <FaClock /> WAKTU
          </p>
          <p className="text-xl font-bold text-white">{seconds}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl flex flex-col items-center min-w-[80px]">
          <p className="text-xs text-indigo-300 flex items-center gap-1 mb-1">
            <FaMousePointer /> PERCOBAAN
          </p>
          <p className="text-xl font-bold text-white">{moves}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl flex flex-col items-center min-w-[80px]">
          <p className="text-xs text-indigo-300 flex items-center gap-1 mb-1">
            <FaCheck className="text-green-400" /> DITEMUKAN
          </p>
          <p className="text-xl font-bold text-white">{matchedCount}/{totalPairs}</p>
        </div>
      </div>

      {/* Pesan menang */}
      {isComplete && (
        <div className="bg-yellow-400/20 border border-yellow-400/40 rounded-xl px-4 py-2 mb-3">
          <p className="text-yellow-300 font-bold text-sm">
            🎉 Selamat! Selesai dalam waktu {seconds} dengan {moves} percobaan!
          </p>
        </div>
      )}

      {/* Tombol reset */}
      <button
        onClick={onReset}
        className="px-6 py-2 bg-yellow-400 text-indigo-900 font-bold rounded-full hover:bg-yellow-300 transition-colors shadow-lg flex items-center gap-2 mx-auto"
      >
        {isComplete ? <FaRedo /> : <FaSyncAlt />}
        {isComplete ? "Main Lagi!" : "Acak Ulang"}
      </button>
    </div>
  );
}

export default ScoreBoard;