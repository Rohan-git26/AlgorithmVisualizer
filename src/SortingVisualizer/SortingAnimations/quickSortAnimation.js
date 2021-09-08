import { quickSort } from "../SortingAlgorithms/quickSort";

const PRIMARY_COLOR = 'turquoise'
const SECONDARY_COLOR = 'red'
const COMPARING_COLOR = 'yellow'
const FINAL_COLOR = 'purple'
const quickSortAnimation = (array,ANIMATION_SPEED_MS) =>{
        const animations = quickSort(array)        
        for(let i = 0 ; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName("arraybar")
            const isColorChange = i % 3 !== 1;
            const element = animations[i]
            if(isColorChange){
                if(element[0] === 4){
                    const [,barOneIdx,barTwoIdx] = animations[i]
                    const barOneStyle = arrayBars[barOneIdx].style
                    const barTwoStyle = arrayBars[barTwoIdx].style
                    const color =  i % 3 === 0 ? COMPARING_COLOR : PRIMARY_COLOR
                    setTimeout(()=>{
                        barOneStyle.backgroundColor = color
                        barTwoStyle.backgroundColor = color
                    }, i*ANIMATION_SPEED_MS)
                }
                if(element[0]  === 3){
                    const [,barOneIdx,barTwoIdx] = animations[i]
                    const barOneStyle = arrayBars[barOneIdx].style
                    const barTwoStyle = arrayBars[barTwoIdx].style
                    setTimeout(()=>{
                        barOneStyle.backgroundColor = FINAL_COLOR
                        barTwoStyle.backgroundColor = FINAL_COLOR
                    }, i*ANIMATION_SPEED_MS)
                }
                else if(element[0] === 2){
                    setTimeout(()=>{
                        const [,barOneIdx, barTwoIdx] = animations[i]
                        const barTwoStyle = arrayBars[barTwoIdx].style
                        const barOneStyle = arrayBars[barOneIdx].style
                        barOneStyle.backgroundColor = FINAL_COLOR
                        barTwoStyle.backgroundColor = PRIMARY_COLOR
                        },i*ANIMATION_SPEED_MS)
                }
                else if(element[0] === 0){
                    const [,barOneIdx,barTwoIdx] = animations[i]
    
    
                    const barOneStyle = arrayBars[barOneIdx].style
                    const barTwoStyle = arrayBars[barTwoIdx].style
                    const color =  i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR
                    setTimeout(()=>{
                        barOneStyle.backgroundColor = color
                        barTwoStyle.backgroundColor = color
                    }, i*ANIMATION_SPEED_MS)
                }
               
                
            }
            else if(element[0] === 1){
                setTimeout(() =>{
                    const [,barOneIdx, barTwoIdx] = animations[i]
                    const barOneStyle = arrayBars[barOneIdx].style
                    const barTwoStyle = arrayBars[barTwoIdx].style
                    let temp = barOneStyle.height
                    barOneStyle.height = barTwoStyle.height
                    barTwoStyle.height = temp

                },i*ANIMATION_SPEED_MS)
            }
        }
    }
    
export default quickSortAnimation