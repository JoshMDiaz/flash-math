'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MathProblem } from '../components/MathProblem'
import { Whiteboard } from '../components/Whiteboard'
import { GradeSelector } from '../components/GradeSelector'
import { ProblemTypeSelector } from '../components/ProblemTypeSelector'
import { Timer } from '../components/Timer'
import { ScoreDisplay } from '../components/ScoreDisplay'
import { TimerSelector } from '../components/TimerSelector'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import { Label } from '@/components/ui/label'

export default function FlashMath() {
  const [grade, setGrade] = useState(0)
  const [problemTypes, setProblemTypes] = useState<string[]>(['addition'])
  const [score, setScore] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [totalTime, setTotalTime] = useState<number | null>(60)
  const [isStarted, setIsStarted] = useState(false)
  const [isFreePlay, setIsFreePlay] = useState(false)
  const router = useRouter()

  const handleGradeChange = (selectedGrade: number) => {
    setGrade(selectedGrade)
  }

  const handleProblemTypeChange = (types: string[]) => {
    setProblemTypes(types)
  }

  const handleTimeSelection = (seconds: number | null) => {
    setTotalTime(seconds)
    setIsFreePlay(seconds === null)
  }

  const handleCorrectAnswer = () => {
    setScore((prevScore) => prevScore + 1)
  }

  const handleStart = () => {
    if (problemTypes.length === 0) {
      alert('Please select at least one problem type!')
      return
    }
    setIsStarted(true)
    setScore(0)
    setTimeElapsed(0)
  }

  const handleTimeUp = () => {
    router.push(
      `/results?score=${score}&time=${totalTime}&freePlay=${isFreePlay}`
    )
  }

  const handleFinishFreePlay = () => {
    router.push(
      `/results?score=${score}&time=${timeElapsed}&freePlay=${isFreePlay}`
    )
  }

  if (!isStarted) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-600 p-8 flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold mb-6 text-center text-white'>
          Welcome to Flash Math!
        </h1>
        <p className='text-xl mb-8 text-center text-white'>
          Get ready to have fun and improve your math skills!
        </p>
        <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm'>
          <div className='space-y-6'>
            <div>
              <Label
                htmlFor='grade-selector'
                className='text-lg font-semibold block mb-2'
              >
                Select Your Grade:
              </Label>
              <GradeSelector onGradeChange={handleGradeChange} />
            </div>
            <div>
              <Label
                htmlFor='problem-type-selector'
                className='text-lg font-semibold block mb-2'
              >
                Select Problem Types:
              </Label>
              <ProblemTypeSelector onTypeChange={handleProblemTypeChange} />
            </div>
            <div>
              <Label
                htmlFor='timer-selector'
                className='text-lg font-semibold block mb-2'
              >
                Select Time:
              </Label>
              <TimerSelector onTimeSelected={handleTimeSelection} />
            </div>
            <Button
              onClick={handleStart}
              className='w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white'
            >
              Start
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-600 p-8'>
      <h1 className='text-3xl font-bold mb-6 text-center text-white'>
        Flash Math
      </h1>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg'>
          <MathProblem
            grade={grade}
            problemTypes={problemTypes}
            onCorrectAnswer={handleCorrectAnswer}
          />
          {isFreePlay ? (
            <Button
              onClick={handleFinishFreePlay}
              className='mt-4 w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white'
            >
              I'm Finished!
            </Button>
          ) : (
            <Timer
              onTimeUpdate={setTimeElapsed}
              totalTime={totalTime!}
              onTimeUp={handleTimeUp}
            />
          )}
          <ScoreDisplay score={score} timeElapsed={timeElapsed} />
        </div>
        <div className='w-full md:w-1/2'>
          <Whiteboard />
        </div>
      </div>
      <Toaster />
    </div>
  )
}
