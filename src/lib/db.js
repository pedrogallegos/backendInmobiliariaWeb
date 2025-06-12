import mongoose from 'mongoose'
import { config } from '../../config.js'

const URL = config.MONGODB_URI

function connect () {
  return mongoose.connect(URL)
}

export default {
  connect
}
