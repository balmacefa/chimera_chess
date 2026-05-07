'use client';

import React, { useState } from 'react';
import SpriteAnimation from '../components/SpriteAnimation';
import GameArena from '../components/GameArena';
import { Swords, Globe, User } from 'lucide-react';

export default function Home() {
  const [nickname, setNickname] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white font-sans flex flex-col p-4 md:p-8">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Batalla Isométrica
          </h1>
          <button
            onClick={() => setIsPlaying(false)}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            Abandonar Arena
          </button>
        </header>
        <GameArena player1Name={nickname || 'Jugador 1'} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans flex flex-col items-center py-16 px-4">
      {/* Welcome Banner */}
      <div className="w-full max-w-4xl bg-neutral-800 border border-neutral-700 rounded-2xl p-8 mb-12 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-orange-900/20 pointer-events-none" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-4 drop-shadow-sm">
          Batalla Isométrica
        </h1>
        <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
          Adéntrate en la arena. Combate táctico 2D en tiempo real.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Play Menu */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-8 flex flex-col justify-center shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-amber-500 flex items-center gap-2">
            <User className="w-6 h-6" />
            Entrar a la Arena
          </h2>

          <div className="mb-8">
            <label htmlFor="nickname" className="block text-sm font-medium text-neutral-400 mb-2">
              Tu Nickname
            </label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Ingresa tu nombre..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
            />
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setIsPlaying(true)}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-lg text-neutral-900 bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:ring-offset-neutral-900 transition-all overflow-hidden"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Swords className="h-6 w-6 text-amber-700 group-hover:text-amber-800 transition-colors" />
              </span>
              Jugar 1vs1 Local
            </button>

            <button
              onClick={() => setIsPlaying(true)}
              className="group relative w-full flex justify-center py-4 px-4 border border-amber-600 text-lg font-medium rounded-lg text-amber-500 bg-transparent hover:bg-amber-600/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:ring-offset-neutral-900 transition-all overflow-hidden"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Globe className="h-6 w-6 text-amber-600 group-hover:text-amber-500 transition-colors" />
              </span>
              Jugar en Línea
            </button>
          </div>
        </div>

        {/* Character Showcase */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-8 flex flex-col shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-neutral-200 text-center">Clases & Animaciones</h2>

          <div className="grid grid-cols-2 gap-4 flex-grow">
            <div className="flex flex-col items-center justify-center p-4 bg-neutral-900 rounded-lg border border-neutral-800">
              <SpriteAnimation state="idle" />
              <span className="mt-3 text-sm text-neutral-400 font-medium">Idle</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-neutral-900 rounded-lg border border-neutral-800">
              <SpriteAnimation state="ataque" />
              <span className="mt-3 text-sm text-neutral-400 font-medium">Ataque</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-neutral-900 rounded-lg border border-neutral-800">
              <SpriteAnimation state="muerte" />
              <span className="mt-3 text-sm text-neutral-400 font-medium">Muerte</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-neutral-900 rounded-lg border border-neutral-800">
              <SpriteAnimation state="victoria" />
              <span className="mt-3 text-sm text-neutral-400 font-medium">Victoria</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
