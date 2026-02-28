interface BmiInputs {
  height: number,
  weight: number
}

const parseBmiArguments = (args: string[]): BmiInputs => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  const height = Number(args[2])
  const weight = Number(args[3])

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Height and Weight must be numbers')
  }

  if (height <= 0 || weight <= 0) {
    throw new Error('Height and Weight must be positive numbers')
  }

  return {
    height,
    weight
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)

  if (bmi <= 18.5) {
    return 'underweight'
  } else if (bmi < 25) {
    return 'normal range'
  } else if (bmi < 30) {
    return 'overweight range'
  } else {
    return 'obsese range'
  }
}

try {
  const { height, weight } = parseBmiArguments(process.argv)
  const bmiCategory = calculateBmi(height, weight)
  console.log(bmiCategory)
} catch (error: unknown) {
  let errorMessage = 'Error calculating BMI: '
  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.log(errorMessage)
}