import mongoose from 'mongoose'
const { Schema } = mongoose

const amenitiesSchema = new Schema({
  name: {
    type: String,
    required: [true,
      'The amenitie is required'
    ],
    trim: true
  },
  description: {
    type: String,
    required: [true,
      'The description of the amenitie is required'
    ],
    trim: true
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: 'Multimedia'
  }
},
{
  timestamps: true // Automatically manage createdAt and updatedAt fields
})
const Amenitie = mongoose.model('Amenitie', amenitiesSchema)
export { Amenitie }
