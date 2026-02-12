interface result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const target = Number(process.argv[2])
const dailyHours = process.argv.slice(3).map(h => Number(h))

if (isNaN(target) || dailyHours.some(h => isNaN(h))) {
  console.log('please provide valid numbers')
} else {
  console.log(calculateExercises(dailyHours, target))
}

function calculateExercises(dailyHours: number[], target: number): result {
  const periodLength = dailyHours.length
  const trainingDays = dailyHours.filter(h => h > 0).length
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength
  const success = average >= target

  let rating = 1
  let ratingDescription = 'bad'

  if (average >= target) {
    rating = 3
    ratingDescription = 'amazing job'
  } else if (average >= target * 0.8) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))