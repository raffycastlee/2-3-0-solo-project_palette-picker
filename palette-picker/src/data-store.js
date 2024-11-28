const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const getLocalStorageKey = (key) => {
  try {
    const fetch = JSON.parse(localStorage.getItem(key));
    return (fetch.length === 0) ? null : fetch;
  } catch (err) {
    console.error('JSON parse error!', err);
    return null;
  }
}

const getPalettes = () => {
  return getLocalStorageKey('palette-picker');
}

const setPalettes = (palettes) => {
  setLocalStorageKey('palette-picker', palettes);
}

export {
  setLocalStorageKey,
  getLocalStorageKey,
  getPalettes,
  setPalettes
}