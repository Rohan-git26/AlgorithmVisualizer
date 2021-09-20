import { insertionSort } from "../SortingAlgorithms/insertionSort";

const insertionSortAnimation = (array,ANIMATION_SPEED_MS) => {
  const animations = insertionSort(array);
  
  let keyHeight = 0;// eslint-disable-next-line
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName("arraybar");
    const element = animations[i];
    const isColorChange = i % 3 !== 1;
    if (isColorChange) {
      if (element[0] === 4) {
        const [, barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "red" : "turquoise";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else if (element[0] === -4) {
        const [, barOneIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const color = i % 3 === 0 ? "yellow" : "turquoise";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else if (element[0] === -5) {
        const [, , x] = animations[i];
        setTimeout(() => {
          for (let k = 0; k <= x; k++) {
            const barStyle = arrayBars[k].style;
            barStyle.backgroundColor = "purple";
          }
        }, i * ANIMATION_SPEED_MS);
      }
    } else {
      if (element[0] === 3) {
        const [, barIdx] = animations[i];
        const barStyle = arrayBars[barIdx].style;
        setTimeout(() => {
          keyHeight = barStyle.height;// eslint-disable-next-line
        }, i * ANIMATION_SPEED_MS);
      } else if (element[0] === 1) {
        const [, barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.height = barTwoStyle.height;
        }, i * ANIMATION_SPEED_MS);
      } else if (element[0] === -1) {
        const [, barOneIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        setTimeout(() => {
          barOneStyle.height = keyHeight;// eslint-disable-next-line
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
};

export default insertionSortAnimation;
