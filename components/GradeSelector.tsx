'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface GradeSelectorProps {
  onGradeChange: (grade: number) => void
}

export function GradeSelector({ onGradeChange }: GradeSelectorProps) {
  return (
    <Select onValueChange={(value) => onGradeChange(parseInt(value))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a grade" />
      </SelectTrigger>
      <SelectContent>
        {[0, 1, 2, 3, 4, 5, 6].map((grade) => (
          <SelectItem key={grade} value={grade.toString()}>
            {grade === 0 ? 'Kindergarten' : `Grade ${grade}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

