'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface TimerSelectorProps {
  onTimeSelected: (seconds: number | null) => void
}

export function TimerSelector({ onTimeSelected }: TimerSelectorProps) {
  const [selectedOption, setSelectedOption] = useState<string>('1')
  const [customMinutes, setCustomMinutes] = useState('1')
  const [customSeconds, setCustomSeconds] = useState('0')

  const handleTimeSelection = (value: string) => {
    setSelectedOption(value)
    if (value === 'free') {
      onTimeSelected(null)
    } else if (value === 'custom') {
      const totalSeconds = parseInt(customMinutes) * 60 + parseInt(customSeconds)
      onTimeSelected(totalSeconds)
    } else {
      onTimeSelected(parseInt(value) * 60)
    }
  }

  const handleCustomTimeChange = () => {
    const totalSeconds = parseInt(customMinutes) * 60 + parseInt(customSeconds)
    onTimeSelected(totalSeconds)
  }

  const preventScroll = (e: React.WheelEvent<HTMLInputElement>) => {
    e.target.blur()
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Select onValueChange={handleTimeSelection} value={selectedOption}>
        <SelectTrigger className="w-[180px] bg-gradient-to-r from-purple-400 to-pink-500 text-white">
          <SelectValue placeholder="Select time" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="free">Free Play</SelectItem>
          <SelectItem value="1">1 minute</SelectItem>
          <SelectItem value="2">2 minutes</SelectItem>
          <SelectItem value="3">3 minutes</SelectItem>
          <SelectItem value="4">4 minutes</SelectItem>
          <SelectItem value="5">5 minutes</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>
      {selectedOption === 'custom' && (
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            min="0"
            max="59"
            value={customMinutes}
            onChange={(e) => {
              setCustomMinutes(e.target.value)
              handleCustomTimeChange()
            }}
            onWheel={preventScroll}
            className="w-16 bg-gradient-to-r from-blue-400 to-cyan-500 text-white"
          />
          <span>min</span>
          <Input
            type="number"
            min="0"
            max="59"
            value={customSeconds}
            onChange={(e) => {
              setCustomSeconds(e.target.value)
              handleCustomTimeChange()
            }}
            onWheel={preventScroll}
            className="w-16 bg-gradient-to-r from-blue-400 to-cyan-500 text-white"
          />
          <span>sec</span>
        </div>
      )}
    </div>
  )
}

