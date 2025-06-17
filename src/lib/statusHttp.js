class StatusHttp extends Error {
  constructor (message, status) {
    super(message)
    this.statusCode = status || 505
  }
}
export {
  StatusHttp
}
