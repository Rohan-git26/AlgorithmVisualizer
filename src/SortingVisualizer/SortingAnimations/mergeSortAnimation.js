import { mergeSort } from "../SortingAlgorithms/mergeSort";

const PRIMARY_COLOR = "turquoise"
const SECONDARY_COLOR = "red"
const mergeSortAnimation = (array,ANIMATION_SPEED_MS) =>{
    const animations = mergeSort(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("arraybar");
      const isColorChange = i % 3 !== 1;
      if (isColorChange) {
        const barIdx = animations[i];
        const barOneIdx = barIdx[0];
        const barTwoIdx = barIdx[1];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
}

export default mergeSortAnimation