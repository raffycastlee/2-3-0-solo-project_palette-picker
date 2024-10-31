/*
HELPER FUNCTIONS
*/
// used for animating ellipses in guessingGame
const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export {
  delay
}