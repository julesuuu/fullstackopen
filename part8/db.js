const mongoose = require('mongoose')

const connectToDatabase = async (uri) => {
  console.log('connecting to database URI:', uri)
  
  try {
    await mongoose.connect(uri)
    console.log('connected to MongoDb')
  } catch (error) {
    console.log('error connecting to MongoDB:', error.message)
    process.exit()
  }
}

module.exports = connectToDatabase