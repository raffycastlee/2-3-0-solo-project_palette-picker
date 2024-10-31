import {
  getLocalStorage,
  setLocalStorageKey
} from './localStorage'

/*
DATA LAYER FUNCTIONS
*/
// Params: [None]
// Returns: [Array] palettes
const getPalettes = () => {
  const palettes = getLocalStorage('data');
  if (palettes.length === 0) { return []; }
  return palettes;
}
// Params: [Array] new palettes
// Returns: [None]
const setPalettes = (newPalettes) => {
  localStorage.clear(); 
  setLocalStorageKey('data', newPalettes);
}
// Params: [None]
// Returns: [None]
const initPalettesIfEmpty = () => {
  if (getPalettes().length === 0) {
    setPalettes(JSON.parse(path.join(__dirname, './public/default.json')));
  }
}
// Params: [Object] palette obj
// Returns: [None]
const addPalette = (newPalette) => {
  const local = getLocalStorage('data');
  local.push(newPalette);
  setLocalStorageKey('data', local);
}
// Params: [String] uuid
// Returns: [None]
const removePalette = (uuid) => {
  const local = getLocalStorage('data');
  local.splice(local.find(palette => palette.uuid === uuid), 1);
  setLocalStorageKey('data', local);
}

export {
  getPalettes,
  setPalettes,
  initPalettesIfEmpty,
  addPalette,
  removePalette
}