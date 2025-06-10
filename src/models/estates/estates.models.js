import mongoose from 'mongoose'
const { Schema } = mongoose

const estatesSchema = new Schema({
  name: {
    type: String,
    required: [true,
      'The name of the estate is required'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: [true,
      'The description of the estate is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true,
      'The price of the estate is required'],
    min: 0
  },
  currency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'GBP', 'MXN'], // Example currencies
    default: 'MXN' // Default currency
  },
  type: {
    type: String,
    enum: ['house', 'apartment', 'land', 'commercial'],
    default: 'house'
  },
  location_map: {
    // TODO: Especify the type for location_map
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  postal_code: {
    type: String,
    trim: true
  },
  neighborhood: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'pending'],
    default: 'available'
  },
  show_address: {
    type: Boolean,
    default: true // Default to true, meaning the address will be shown
  },
  amenities: [{
    type: String,
    trim: true // Example: 'Swimming Pool', 'Gym', etc.
  }],
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Categories' // Reference to the Categories model for estate category
  },
  related_estates: {
    type: [Schema.Types.ObjectId],
    ref: 'Estates' // Reference to the Estates model for related estates
  },
  images: [{
    type: [Schema.Types.ObjectId],
    ref: 'Multimedia', // Reference to the Images model for estate images
    required: true // Ensure that at least one image is associated with the estate
  }],
  image_cover: {
    type: Schema.Types.ObjectId,
    ref: 'Multimedia' // Reference to the Multimedia model for the cover image
  }
},
{
  timestamps: true // Automatically manage createdAt and updatedAt fields
})
const Estate = mongoose.model('Estate', estatesSchema)
export { Estate }
