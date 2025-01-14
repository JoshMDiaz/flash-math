'use client'

import { useRef, useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Settings } from 'lucide-react'

const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF']
const strokeWidths = [2, 4, 6, 8]

export function Whiteboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [strokeWidth, setStrokeWidth] = useState(2)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    context.strokeStyle = color
    context.lineWidth = strokeWidth
    context.lineCap = 'round'
    context.lineJoin = 'round'
  }, [color, strokeWidth])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const context = canvasRef.current?.getContext('2d')
    if (context) {
      context.beginPath()
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const rect = canvas.getBoundingClientRect()
    let x, y

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    context.lineTo(x, y)
    context.stroke()
    context.beginPath()
    context.moveTo(x, y)
  }

  const clearWhiteboard = () => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Whiteboard</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Color:</Label>
                <div className="flex space-x-2 mt-1">
                  {colors.map((c) => (
                    <button
                      key={c}
                      className={`w-8 h-8 rounded-full ${color === c ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Stroke Width:</Label>
                <RadioGroup value={strokeWidth.toString()} onValueChange={(value) => setStrokeWidth(parseInt(value))}>
                  <div className="flex space-x-2 mt-1">
                    {strokeWidths.map((width) => (
                      <div key={width} className="flex items-center">
                        <RadioGroupItem value={width.toString()} id={`width-${width}`} />
                        <Label htmlFor={`width-${width}`} className="ml-1">{width}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={400} 
        className="border border-gray-300 mb-2 cursor-crosshair touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <Button onClick={clearWhiteboard}>Clear Whiteboard</Button>
    </div>
  )
}

