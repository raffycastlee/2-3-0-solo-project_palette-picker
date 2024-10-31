/*
LOCAL STORAGE FUNCTIONS
*/
// Params: [String] key, [Any] value
// Returns: [None]
const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}
// Params: [String] key
// Returns: [Array] palettes from data
const getLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.log(`ERROR: JSON.parse() failed on localStorage item.\n${err}`);
  }
}

export {
  setLocalStorageKey,
  getLocalStorage
} 