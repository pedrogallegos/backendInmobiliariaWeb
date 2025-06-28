import { Schema, model } from 'mongoose'
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name of the user is required'],
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  active: {
    type: Boolean,
    default: true,
    required: [true, 'The active status of the user is required']
  },
  email: {
    type: String,
    required: [true, 'The email of the user is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'The password of the user is required'],
    minlength: [8, 'The password must be at least 6 characters long'],
    select: false, // Password should not be returned in queries by default
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[1-9][0-9]{10,15}$/, 'Please enter a valid phone number']
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'editor'],
    default: 'user'
  }
}, {
  timestamps: true
})
export const User = model('User', userSchema)
