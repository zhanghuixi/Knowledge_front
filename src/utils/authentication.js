const AUTHENTICATION_STORAGE_KEY = "token";

export function getAuthenticationToken() {
  return localStorage.getItem(AUTHENTICATION_STORAGE_KEY);
}

export async function setAuthenticationToken(token) {
  return localStorage.setItem(AUTHENTICATION_STORAGE_KEY, token);
}

export async function clearAuthenticationToken() {
  return localStorage.removeItem(AUTHENTICATION_STORAGE_KEY);
}
