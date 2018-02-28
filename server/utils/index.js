const jwt = require('jsonwebtoken')

function getUserId(request) {
  const Authorization = request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, secret())
    return userId
  }

  throw new AuthError()
}

function secret() {
  return "msAEvm3OrLIYBkytJViAmRmGdDXX5GY3M8ffw75mQaIc2m7jVt98Mp2lNMF6vngdei2KxhoVIWV2p7ULDC3siBOgI8lS8JGGIAlRBGJF24UCwWf1XydhEdcMcsOfuSpK"
}

class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

module.exports = {
  getUserId,
  secret,
  AuthError
}