import mongoose from 'mongoose'
const { Schema } = mongoose
const bannerSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: 'Multimedia'
  },
  linkCta: {
    type: String,
    required: true,
    trim: true
  },
  estateId: {
    type: Schema.Types.ObjectId,
    ref: 'Estate',
    required: true
  }
}, {
  timestamps: true
})

const Banner = mongoose.model('Banner', bannerSchema)
export { Banner } // Export the Banner model for use in other parts of the application
