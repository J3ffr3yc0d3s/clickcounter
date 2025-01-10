'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import SpotlightCard from '@/components/SpotlightCard'
import Waves from '@/components/Waves'

export default function Game() {
  const [clicks, setClicks] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [ripples, setRipples] = useState([])
  const router = useRouter()

  const startGame = useCallback(() => {
    setGameStarted(true)
    setClicks(0)
    setTimeLeft(30)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (gameStarted && !gameEnded) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            if (timer) clearInterval(timer);
            setGameEnded(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStarted, gameEnded]);

  useEffect(() => {
    if (timeLeft === 0 && !gameEnded) {
      setGameEnded(true);
    }
  }, [timeLeft, gameEnded]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameStarted) {
      startGame();
    }
    if (gameStarted && !gameEnded) {
      setClicks((prevClicks) => prevClicks + 1);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRipples((prevRipples) => [
        ...prevRipples,
        { id: Date.now(), x, y }
      ]);
    }
  }, [gameStarted, gameEnded, startGame]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRipples([]);
    }, 1000);
    return () => clearTimeout(timer);
  }, [ripples]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-24 bg-black overflow-hidden">
      <Waves lineColor="rgba(255,255,255,0.2)" backgroundColor="transparent" />
      {!gameEnded ? (
        <SpotlightCard className="text-center bg-gray-800 text-white p-8 rounded-lg shadow-lg z-10">
          <h1 className="text-4xl font-bold mb-8">Click Counter Game</h1>
          <div className="mb-4 text-xl">Time Left: {timeLeft} seconds</div>
          <div className="mb-4 text-xl">Clicks: {clicks}</div>
          <div className="relative w-64 h-64 mx-auto">
            <button
              onClick={handleClick}
              className="w-full h-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full focus:outline-none transition-colors duration-200 overflow-hidden"
            >
              {gameStarted ? 'Click!' : 'Start Game'}
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className="absolute bg-white rounded-full animate-ripple"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: '10px',
                    height: '10px',
                    opacity: 0.7,
                  }}
                />
              ))}
            </button>
          </div>
        </SpotlightCard>
      ) : (
        <SpotlightCard className="text-center bg-gray-800 text-white p-8 rounded-lg shadow-lg z-10">
          <h1 className="text-4xl font-bold mb-8">Game Over!</h1>
          <div className="text-2xl mb-4">Your score: {clicks} clicks</div>
          <button
            onClick={() => router.push('/')}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Back to Home
          </button>
        </SpotlightCard>
      )}
    </main>
  )
}

