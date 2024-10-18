"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameContextType {
  gameStarted: boolean;
  savedQuestions: string[];
  startGame: () => void;
  endGame: () => void;
  saveQuestion: (question: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [savedQuestions, setSavedQuestions] = useState<string[]>([]);

  useEffect(() => {
    const storedGameStarted = localStorage.getItem('gameStarted');
    const storedQuestions = localStorage.getItem('savedQuestions');
    
    if (storedGameStarted) {
      setGameStarted(JSON.parse(storedGameStarted));
    }
    if (storedQuestions) {
      setSavedQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setSavedQuestions([]);
    localStorage.setItem('gameStarted', JSON.stringify(true));
    localStorage.setItem('savedQuestions', JSON.stringify([]));
  };

  const endGame = () => {
    setGameStarted(false);
    localStorage.setItem('gameStarted', JSON.stringify(false));
  };

  const saveQuestion = (question: string) => {
    const updatedQuestions = [...savedQuestions, question];
    setSavedQuestions(updatedQuestions);
    localStorage.setItem('savedQuestions', JSON.stringify(updatedQuestions));
  };

  return (
    <GameContext.Provider value={{ gameStarted, savedQuestions, startGame, endGame, saveQuestion }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
