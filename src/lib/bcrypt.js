import bcrypt from 'bcrypt'

const saltRounds = 10

function hashPassword (plainText) {
  return bcrypt.hash(plainText, saltRounds)
}
export default {
  ...bcrypt,
  hashPassword
}
