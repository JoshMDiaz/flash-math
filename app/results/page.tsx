'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Suspense } from 'react'

function ResultsContent() {
  const searchParams = useSearchParams()
  const score = searchParams.get('score')
  const time = searchParams.get('time')
  const freePlay = searchParams.get('freePlay') === 'true'

  const minutes = Math.floor(parseInt(time || '0') / 60)
  const seconds = parseInt(time || '0') % 60

  const getEncouragement = () => {
    if (parseInt(score || '0') < 5)
      return "Great effort! Keep practicing and you'll improve in no time!"
    if (parseInt(score || '0') < 10)
      return "Fantastic job! You're making great progress!"
    return "Wow! You're a math superstar! Keep up the amazing work!"
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-600 p-8 flex flex-col items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg text-center'>
        <h1 className='text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text'>
          Great job!
        </h1>
        <p className='text-2xl mb-4'>
          You answered {score} questions correctly
        </p>
        {freePlay ? (
          <p className='text-xl mb-8'>
            in {minutes} minutes and {seconds} seconds of free play!
          </p>
        ) : (
          <p className='text-xl mb-8'>
            in {minutes} minutes and {seconds} seconds!
          </p>
        )}
        <div className='space-y-4 text-center'>
          <p className='text-lg font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text'>
            {getEncouragement()}
          </p>
          <p className='text-md'>
            Remember, every problem you solve makes you smarter and stronger!
          </p>
        </div>
        <Link href='/' passHref>
          <Button className='mt-8 bg-gradient-to-r from-green-400 to-blue-500'>
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function Results() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  )
}
