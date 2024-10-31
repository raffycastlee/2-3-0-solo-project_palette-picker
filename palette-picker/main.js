import './style.css';
import { v4 as uuidv4 } from 'uuid';
// console.log(uuidv4());
import initPalettes from './public/default.json';
import path from 'path'; 

// local storage imports
import {
  setLocalStorageKey,
  getLocalStorage
} from './src/localStorage';
// init local storage
setLocalStorageKey('data', initPalettes);

// utils imports
import { delay } from './src/utils';

// data functions imports
import {
  getPalettes,
  setPalettes,
  initPalettesIfEmpty,
  addPalette,
  removePalette
} from './src/data.js';

/*
DOM FUNCTIONS
*/
const initCopyClipboard = async (e) => {
  document.querySelectorAll('button[id^=copy]').forEach(button => {
    button.addEventListener('click', async event => {
      if (!navigator.clipboard) {
        // clipboard API not usable
        return;
      }
      try {
        // .code class is placeholder
        const textBlock = document.querySelector('.placeholder').innerText;
        
        await navigator.clipboard.writeText(codeBlock);
        event.target.textContent = 'Copied HEX!'; // feedback on button click
        await delay(1000); // wait 1 sec      event.target.textContent = 'Copy'; // restore original button text
      } catch (err) {
        console.log(`ERROR: failed to initCopyClipboard.\n${err}`);
      }
    })
  })
}

const handleCreate = () => {
  const title = document.querySelector(`#palette-title`);
  const colors = [];
  for (const item of document.querySelectorAll(`input[type='color']`)) {
    colors.push(item.value);
  }
  let temp = document.querySelectorAll(`input[type='radio']`);
  for (const val of temp) {
    if (val.checked) {
      temp = val;
      break;
    }
  }
  const newPalette = {};
  newPalette.uuid = uuidv4();
  newPalette.title = title.value;
  newPalette.colors = colors;
  newPalette.temperature = temp.value.toLowerCase();
  const palettes = getLocalStorage('data');  
  palettes.push(newPalette);
  setLocalStorageKey('data', palettes);
  showPalettes();
}

const handleCopy = async (e) => {
  const hex = e.target.textContent.slice(5);
  try {
    await navigator.clipboard.writeText(hex); 
    e.target.textContent = "COPIED!";
    await delay(1000);
    e.target.textContent = `Copy ${hex}`;
  } catch (err) {
    console.log(`ERROR: navicatorCopy failed: ${err}`);
  }
}

const handleDelete = (e) => {
  const uuidToDelete = e.target.id.slice(14);
  const palettes = getLocalStorage('data');
  palettes.splice(palettes.findIndex(palette => palette.uuid === uuidToDelete),1);
  setLocalStorageKey('data', palettes);
  showPalettes();
}

const showPalettes = () => {
  const palettesBlock = document.querySelector('#palettes-block-content');
  console.log(palettesBlock);
  const palettes = getPalettes();
  palettesBlock.replaceChildren(...palettes.map(item => {
    const children = [];
    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = item.title;
    children.push(title);
    for (let i = 1; i <= 3; i++) {
      // creating the color bg
      const colorBlock = document.createElement("div"); 
      colorBlock.classList.add(`color${i}`);
      colorBlock.style.backgroundColor = item.colors[i-1];
      
      // adding text inside the colored bg
      const whiteText = document.createElement("span");
      whiteText.textContent = "Text ";
      whiteText.style.color = "white";
      const blackText = document.createElement("span");
      blackText.textContent = "Example";
      blackText.style.color = "black";
      colorBlock.replaceChildren(whiteText, blackText);
      // append to parent
      children.push(colorBlock);

      const colorCopy = document.createElement("div"); 
      colorCopy.classList.add(`copy${i}`);
      const colorCopyButton = document.createElement('button');
      colorCopyButton.textContent = `Copy ${item.colors[i-1]}`;
      colorCopyButton.addEventListener("click", handleCopy);
      colorCopy.replaceChildren(colorCopyButton);
      children.push(colorCopy);
    }
    // delete button
    const deleteDiv = document.createElement('div');
    deleteDiv.classList.add('delete');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete Palette";
    deleteButton.id = `delete-button-${item.uuid}`;
    deleteButton.addEventListener("click", handleDelete);
    deleteDiv.appendChild(deleteButton);
    children.push(deleteDiv);
    // banner    
    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('banner');
    switch (item.temperature) {
      case 'neutral':
        bannerDiv.style.backgroundColor = "#555555";
        break;
      case 'cool':
        bannerDiv.style.backgroundColor = "#121e43";
        break;
      case 'warm':
        bannerDiv.style.backgroundColor = "#431112";
        break;
    }
    bannerDiv.style.color = "white";
    bannerDiv.textContent = `${item.temperature}`;
    children.push(bannerDiv);

    // finally return children
    const palette = document.createElement('div');
    palette.classList.add('palette')
    palette.replaceChildren(...children);
    // for (const val of children) {
    //   palette.appendChild(val);
    // }

    return palette; 
  }))
}

/*
  MAIN DRIVER
*/
const main = () => {
  initPalettesIfEmpty();
  showPalettes();
  initCopyClipboard();
  // what the fuck is this thing doing here LMAO
  document.querySelector('#create-button').addEventListener("click", handleCreate);
}

main();

// importing palettes from local
// let palettes = getLocalStorage('data');
