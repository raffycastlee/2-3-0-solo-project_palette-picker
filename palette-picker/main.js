import {
  initPalettesIfEmpty,
  handleSubmit,
  displayPalettes
} from './src/dom-controllers.js'

const main = () => {
  initPalettesIfEmpty();
  
  // adding event listener to form
  document
    .querySelector('form')
    .addEventListener('submit', handleSubmit);

  displayPalettes();
}

main();