interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface ExerciseInputs {
  target: number,
  dailyHours: number[]
}

const parseExerciseArguments = (args: string[]): ExerciseInputs => {
  if (args.length < 3) throw new Error('Not enough arguments')
  
  const [targetStr, ...dailyHoursStr] = args.slice(2)

  const target = Number(targetStr)
  const dailyHours = dailyHoursStr.map(Number)

  if (isNaN(target) || dailyHours.some(isNaN)) {
    throw new Error('All arguments must be numbers')
  }

  if (target <= 0) {
    throw new Error('Target must be a positive number')
  }

  if (dailyHours.some(hour => hour < 0)) {
    throw new Error('Daily hours cannot be negative')
  }

  return {
    target,
    dailyHours
  }
}

function calculateExercises(target: number, dailyHours: number[]): ExerciseResult {
  const periodLength = dailyHours.length
  const trainingDays = dailyHours.filter(hours => hours > 0).length
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0)
  const average = periodLength > 0
    ? totalHours / periodLength
    : 0

  let rating: number
  let ratingDescription: string

  if (average < target * 0.75) {
    rating = 1
    ratingDescription = 'needs improvement'
  } else if (average < target) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 3
    ratingDescription = 'excellent'
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  const { target, dailyHours } = parseExerciseArguments(process.argv)
  console.log(calculateExercises(target, dailyHours))
} catch (error: unknown) {
  let errorMessage = 'Error calculating exercises: '
  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.log(errorMessage)
}