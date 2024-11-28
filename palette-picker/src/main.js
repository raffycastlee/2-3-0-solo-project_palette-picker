import {
  displayPalettes,
  handleSubmit
} from './dom-helpers.js'
import { initPalettesIfEmpty } from './crud.js'

const main = () => {
  initPalettesIfEmpty();
  document
    .querySelector('form')
    .addEventListener('submit', handleSubmit);
  displayPalettes();
}

main();