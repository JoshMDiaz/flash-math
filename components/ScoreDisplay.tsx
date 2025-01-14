interface ScoreDisplayProps {
  score: number
  timeElapsed: number
}

export function ScoreDisplay({ score, timeElapsed }: ScoreDisplayProps) {
  const scorePerMinute = timeElapsed > 0 ? (score / timeElapsed) * 60 : 0

  const getEncouragement = () => {
    if (score === 0) return "You've got this! Keep trying!"
    if (score < 5) return "Great start! You're making progress!"
    if (score < 10) return "Wow, you're on a roll! Keep it up!"
    return "Amazing job! You're a math superstar!"
  }

  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg text-white">
      <p className="text-lg font-semibold">Score: {score}</p>
      <p className="text-lg font-semibold">
        Score per minute: {scorePerMinute.toFixed(2)}
      </p>
      <p className="text-md mt-2 font-medium">{getEncouragement()}</p>
    </div>
  )
}

