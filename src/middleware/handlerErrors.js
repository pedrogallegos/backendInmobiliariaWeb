function handlerErrors (error, request, response, next) {
  response.status(error.status || 500).json({
    sucess: false,
    message: error.message || 'An unexpected error ocurred. Please try again later'
  }) // Repond with a generic error message
}
export default handlerErrors
