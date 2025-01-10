import Link from 'next/link'
import SpotlightCard from '@/components/SpotlightCard'
import Waves from '@/components/Waves'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-24 bg-black overflow-hidden">
      <Waves lineColor="rgba(255,255,255,0.2)" backgroundColor="transparent" />
      <SpotlightCard className="bg-gray-800 text-white p-8 rounded-lg shadow-lg z-10">
        <h1 className="text-4xl font-bold mb-8 text-center">Click Counter Game</h1>
        <div className="flex flex-col items-center space-y-4">
          <Link href="/game" className="w-48 text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
            Start Game
          </Link>
        </div>
      </SpotlightCard>
    </main>
  )
}

