import {
  displayPalettes,
  handleSubmit
} from './src/dom-helpers.js'
import { initPalettesIfEmpty } from './src/crud.js'

const main = () => {
  initPalettesIfEmpty();
  document
    .querySelector('form')
    .addEventListener('submit', handleSubmit);
  displayPalettes();
}

main();