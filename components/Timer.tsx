'use client'

import { useState, useEffect } from 'react'

interface TimerProps {
  onTimeUpdate: (time: number) => void
  totalTime: number
  onTimeUp: () => void
}

export function Timer({ onTimeUpdate, totalTime, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(totalTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          onTimeUp()
          return 0
        }
        const newTime = prevTime - 1
        onTimeUpdate(totalTime - newTime)
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [totalTime, onTimeUp, onTimeUpdate])

  return (
    <div className="text-lg font-semibold mt-4 p-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg">
      Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
    </div>
  )
}

