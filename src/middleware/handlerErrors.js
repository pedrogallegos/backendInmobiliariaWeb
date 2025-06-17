function handlerErrors (error, request, response, next) {
  console.error(error) // Log the error for debugging purposes
  response.status(error.status || 505).json({
    sucess: false,
    message: error.message || 'An unexpected error ocurred. Please try again later'
  }) // Repond with a generic error message
}
export default handlerErrors
