"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useGame } from '@/lib/GameContext';
import { useState } from 'react';

export default function Home() {
  const { gameStarted, savedQuestions, startGame, endGame } = useGame();
  const [showEndScreen, setShowEndScreen] = useState(false);

  const handleEndGame = () => {
    endGame();
    setShowEndScreen(true);
  };

  const handleStartNewGame = () => {
    startGame();
    setShowEndScreen(false);
  };

  if (showEndScreen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-4xl font-bold mb-8">Juego Terminado</h1>
        {savedQuestions.length > 0 && (
          <>
            <h2 className="text-2xl mb-4">Pistas seleccionadas:</h2>
            <ul className="list-disc list-inside mb-8 p-4 rounded-lg shadow-lg">
              {savedQuestions.map((question, index) => (
                <li key={index} className={`text-xl mb-2 p-2 border-b ${index % 2 === 0 ? 'bg-purple-200' : 'bg-orange-200'}`}>{question}</li>
              ))}
            </ul>
          </>
        )}
        <Button onClick={handleStartNewGame} className="w-64 h-16 text-2xl py-4 px-6 m-2 bg-green-700">
          Reiniciar
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-8">Tinta fantasma</h1>
      <div className="space-y-4">
        {!gameStarted ? (
          <Button onClick={startGame} className="w-64 h-16 text-2xl py-4 px-6 m-2">
            Comenzar juego
          </Button>
        ) : (
          <>
            <div className="flex flex-col items-center space-y-4">
              <Link href="/palabras">
                <Button className="w-64 h-16 text-2xl py-4 px-6">Palabras</Button>
              </Link>
              <Link href="/pistas">
                <Button className="w-64 h-16 text-2xl py-4 px-6">Pistas</Button>
              </Link>
              <div style={{ height: '72px' }}></div>
              <Button onClick={handleEndGame} className="w-64 h-16 text-2xl py-4 px-6 bg-red-500">
                Terminar juego
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
