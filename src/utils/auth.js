const TokenKey = 'JWT-Token'

export function getToken() {
  return window.localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return window.localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return window.localStorage.removeItem(TokenKey)
}

export function decodeToken(token) {
  if (!token || token.split('.').length !== 3) {
    return undefined
  }
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  const payload = JSON.parse(window.atob(base64))
  return payload
}
