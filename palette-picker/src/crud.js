import defaultPalettes from '../public/palettes.json';
import {
  getPalettes,
  setPalettes
} from './data-store';

const initPalettesIfEmpty = () => {
  // on refresh, check if local storage is empty. if it is, replace it
  // with default values from palettes.json
  if (getPalettes() === null) {
    setPalettes(defaultPalettes);
  }
}

const addPalette = (palette) => {
  const currPalettes = getPalettes();
  currPalettes.push(palette);
  setPalettes(currPalettes);
}

const removePalette = (paletteUUID) => {
  const currPalettes = getPalettes();
  const removeIndex = currPalettes.findIndex(palette => palette.uuid === paletteUUID);
  currPalettes.splice(removeIndex, 1);
  setPalettes(currPalettes);
}

export {
  initPalettesIfEmpty,
  addPalette,
  removePalette
}