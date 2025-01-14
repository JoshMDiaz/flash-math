'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

interface MathProblemProps {
  grade: number
  problemTypes: string[]
  onCorrectAnswer: () => void
}

export function MathProblem({
  grade,
  problemTypes,
  onCorrectAnswer,
}: MathProblemProps) {
  const [problem, setProblem] = useState('')
  const [answer, setAnswer] = useState('')
  const [userAnswer, setUserAnswer] = useState('')
  const { toast } = useToast()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    generateProblem()
  }, [grade, problemTypes])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [problem])

  const generateProblem = () => {
    if (problemTypes.length === 0) {
      setProblem('Please select at least one problem type!')
      setAnswer('')
      return
    }

    const type = problemTypes[Math.floor(Math.random() * problemTypes.length)]
    let num1, num2
    let result = 0 // Initialize result with a default value

    switch (type) {
      case 'addition':
        num1 = Math.floor(Math.random() * (10 * grade)) + 1
        num2 = Math.floor(Math.random() * (10 * grade)) + 1
        result = num1 + num2
        setProblem(`${num1} + ${num2} = ?`)
        break
      case 'subtraction':
        num1 = Math.floor(Math.random() * (10 * grade)) + 1
        num2 = Math.floor(Math.random() * num1) + 1
        result = num1 - num2
        setProblem(`${num1} - ${num2} = ?`)
        break
      case 'multiplication':
        num1 = Math.floor(Math.random() * (5 * grade)) + 1
        num2 = Math.floor(Math.random() * (5 * grade)) + 1
        result = num1 * num2
        setProblem(`${num1} × ${num2} = ?`)
        break
      case 'division':
        num2 = Math.floor(Math.random() * (5 * grade)) + 1
        result = Math.floor(Math.random() * (5 * grade)) + 1
        num1 = num2 * result
        setProblem(`${num1} ÷ ${num2} = ?`)
        break
    }

    setAnswer(result.toString())
    setUserAnswer('')
  }

  const checkAnswer = () => {
    if (userAnswer === answer) {
      onCorrectAnswer()
      generateProblem()
      toast({
        title: 'Great job!',
        description: 'You got it right! Keep up the good work!',
        duration: 3000,
      })
    } else {
      toast({
        title: 'Oops! Not quite right.',
        description: "Don't worry, you've got this! Try again!",
        duration: 3000,
        variant: 'destructive',
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer()
    }
  }

  const preventScroll = (e: React.WheelEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    target.blur()
  }

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-4xl font-bold mb-4 text-center'>{problem}</h2>
      <Input
        type='number'
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyPress={handleKeyPress}
        onWheel={preventScroll}
        placeholder='Your answer'
        className='mb-4 text-2xl'
        ref={inputRef}
      />
      <Button onClick={checkAnswer} className='w-full text-xl'>
        Submit
      </Button>
    </div>
  )
}
