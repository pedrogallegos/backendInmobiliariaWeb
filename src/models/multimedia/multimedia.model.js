import mongoose from 'mongoose'
const { Schema } = mongoose

const multimediaSchema = new Schema({
  type: {
    type: String,
    required: [true,
      'The type of multimedia is required']
  },
  url: {
    type: String,
    required: [true,
      'The url of multimedia is required'],
    trim: true
  },
  key: {
    type: String,
    required: [true,
      'The key of multimedia is required'],
    trim: true
  },
  name: {
    type: String,
    required: [true,
      'The name of multimedia is required'],
    trim: true
  },
  description: {
    type: String
  },
  entityId: {
    model: {
      type: Schema.Types.ObjectId,
      refPath: 'entityType'
    }
  }
},
{
  timestamps: true
})
const Multimedia = mongoose.model('Multimedia', multimediaSchema)
export { Multimedia } // Export the Multimedia model for use in other parts of the application
