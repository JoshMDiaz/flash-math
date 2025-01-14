'use client'

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Plus, Minus, X, Divide } from 'lucide-react'

interface ProblemTypeSelectorProps {
  onTypeChange: (types: string[]) => void
}

export function ProblemTypeSelector({ onTypeChange }: ProblemTypeSelectorProps) {
  return (
    <ToggleGroup type="multiple" onValueChange={onTypeChange} className="justify-center">
      <ToggleGroupItem value="addition" aria-label="Toggle addition">
        <Plus className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="subtraction" aria-label="Toggle subtraction">
        <Minus className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="multiplication" aria-label="Toggle multiplication">
        <X className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="division" aria-label="Toggle division">
        <Divide className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

