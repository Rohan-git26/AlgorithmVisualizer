import { selectionSort } from "../SortingAlgorithms/selectionSort";
const temp = (array,ANIMATION_SPEED_MS) => {
  const animations = selectionSort(array);
  let i = 0
  for (; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName("arraybar");
    const element = animations[i];
    const isColorChange = i % 3 !== 1;
    if (isColorChange) {
      if (element[0] === 0) {
        const [, barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const colorOne = i % 3 === 0 ? "red" : "green";
        const colorTwo = i % 3 === 0 ? "red" : "turquoise";
        setTimeout(() => {
          barOneStyle.backgroundColor = colorOne;
          barTwoStyle.backgroundColor = colorTwo;
        }, i * ANIMATION_SPEED_MS);
      }
      
      else if(element[0] === 3){
        const [, barOneIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const color = "yellow"
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
    }

    else if (element[0] === 2) {
            const [, barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const colorOne = i % 3 === 0 ? "yellow" : "purple";
            const colorTwo = i % 3 === 0 ? "yellow" : "turquoise"
            let barThreeStyle;
            if(i === (animations.length -1)){
                const barThreeIdx = barTwoIdx + 1
                barThreeStyle = arrayBars[barThreeIdx].style
            }

            setTimeout(() => {
              barOneStyle.backgroundColor = colorOne;
              barTwoStyle.backgroundColor = colorTwo;
              if(i === (animations.length -1)) barThreeStyle.backgroundColor = "purple"
            }, i * ANIMATION_SPEED_MS);
    }
    else if (element[0] === -1) {
        const [, barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const colorOne = "green"
        const colorTwo = "turquoise"
        setTimeout(() => {
          barOneStyle.backgroundColor = colorTwo;
          barTwoStyle.backgroundColor = colorOne;
        }, i * ANIMATION_SPEED_MS);
    }
    else if (element[0] === -2) {
        const [, barOneIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const colorOne = "purple"
        setTimeout(() => {
          barOneStyle.backgroundColor = colorOne;
        }, i * ANIMATION_SPEED_MS);
    }
    }
    else{
       if(element[0] === 1){
           const [,barOneIdx,barTwoIdx] = animations[i]
           const barOneStyle = arrayBars[barOneIdx].style
           const barTwoStyle = arrayBars[barTwoIdx].style
           setTimeout(() =>{
                let temp = barOneStyle.height
                barOneStyle.height = barTwoStyle.height
                barTwoStyle.height = temp
           }, i* ANIMATION_SPEED_MS)
       }
        
    }
}

};

export default temp;
