import defaultPalettes from '../public/palettes.json';
import { v4 as uuidv4 } from 'uuid';
import {
  getLocalStorage,
  setLocalStorageKey
} from './data-store.js'

// data-layer.js
const getPalettes = () => {
  return getLocalStorage('data');
}

const setPalettes = (palettes) => {
  setLocalStorageKey('data', palettes);
}

const initPalettesIfEmpty = () => {
  // on refresh, check if local storage is empty. if it is, replace it
  // with default values from palettes.json
  currPalettes = getPalettes();
  if (currPalettes === null) {
    setPalettes(defaultPalettes);
    currPalettes =  defaultPalettes;
  }
}

const addPalette = (palette) => {
  currPalettes.push(palette);
  setPalettes(currPalettes);
}

const removePalette = (paletteUUID) => {
  const removeIndex = currPalettes.findIndex(palette => palette.uuid === paletteUUID);
  currPalettes.splice(removeIndex, 1);
  setPalettes(currPalettes);
  displayPalettes();
}


// dom-functions.js
// event handlers
const handleSubmit = (event) => {
  // boiler
  event.preventDefault();
  
  const newPalette = {
    uuid: uuidv4(),
    title: event.target.title.value,
    colors: [
      event.target.color1.value,
      event.target.color2.value,
      event.target.color3.value
    ],
    temperature: event.target.temp.value
  }
  addPalette(newPalette);

  // reset forms and redisplay palettes
  displayPalettes();
  event.target.reset();
}

const handleClick = async (event) => {
  console.log('clicked!')
  // only handle click on buttons!
  if (!event.target.matches('button')) return;

  console.log('i made it through1');

  if (event.target.closest('button').classList.contains('delete')) {
    removePalette(event.target.dataset.uuid);
  } else {
    // do the copy to clipboard here
    await copyColor(event.target.closest('button'));
  }
}

const copyColor = async (element) => {
  if (!navigator.clipboard) {
    console.error('Clipboard API is NOT available.');
    return;
  }
  try {
    await navigator.clipboard.writeText(element.dataset.hex);
    const prevText = element.textContent;
    element.textContent = 'Copied hex!';
    setTimeout(() => {
      element.textContent = prevText;
    }, 1000)
  } catch (err) {
    console.error('Failed to copy!', err);
  }
}

// general dom stuff
const displayPalettes = () => {
  // clear ul
  const ul = document.querySelector('ul')
  ul.innerHTML = '';

  currPalettes.forEach(palette => {
    // li overall parent
    const li = document.createElement('li');

    // title h2
    const title = document.createElement('h2');
    title.textContent = palette.title;
    title.classList.add('palette');
    li.append(title); // appending to li parent

    // 3-color menu
    palette.colors.forEach((color, index) => {
      // color rectangle div
      const colorDiv = document.createElement('div');
      colorDiv.innerHTML = '<span style="color:white">Text</span><span style="color:black">Example</span>';
      colorDiv.style.backgroundColor = color;
      colorDiv.classList.add('color-div');
      // color copy button
      const colorButton = document.createElement('button');
      colorButton.id = index;
      colorButton.dataset.hex = color;
      colorButton.textContent = `Copy ${color}`;
      // color container div
      const colorContainer = document.createElement('div');
      colorContainer.append(colorDiv, colorButton);
      colorContainer.classList.add('color-container');
      colorContainer.ariaLabel = `color-${index+1}`;
      li.append(colorContainer); // appending to li parent
    })

    // delete palette button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete') ;
    deleteButton.textContent = 'Delete Palette';
    deleteButton.dataset.uuid = palette.uuid;
    li.append(deleteButton); // appending to li parent

    // temp banner
    const tempBanner = document.createElement('div');
    tempBanner.classList.add('temp-banner');
    switch (palette.temperature) {
      case 'warm':
        tempBanner.style.backgroundColor = "#431212";
        break;
      case 'neutral':
        tempBanner.style.backgroundColor = "#555555";
        break; 
      case 'cool':
        tempBanner.style.backgroundColor = "#121e43";
        break;
    }
    const tempText = document.createElement('p');
    tempText.textContent = palette.temperature;
    tempBanner.append(tempText);
    li.append(tempBanner); // appending to li parent

    // adding event listener to li
    // we'll do delegation with li instead of every button
    li.addEventListener('click', handleClick);

    // appending to ul parent
    ul.append(li);
  })
}

// state vars
let currPalettes;

export {
  initPalettesIfEmpty,
  handleSubmit,
  displayPalettes
}