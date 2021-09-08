import { bubbleSort } from '../SortingAlgorithms/bubbleSort'
const PRIMARY_COLOR = 'turquoise'
const SECONDARY_COLOR = 'red'

const bubbleSortAnimation = (array,ANIMATION_SPEED_MS) =>{
    const animations = bubbleSort(array)
        const len = animations.length - 1
        for(let i = 0; i<len + 1; i++){
            const arrayBars = document.getElementsByClassName("arraybar")
            const child = animations[i]
            const isColorChange = i%3 !== 1
            if(isColorChange){
                if(child[0] === 0){
                const barIdx = animations[i]
                const barOneIdx = barIdx[1]
                const barTwoIdx = barIdx[2]
                const barOneStyle = arrayBars[barOneIdx].style
                const barTwoStyle = arrayBars[barTwoIdx].style
                const color =  i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR
                setTimeout(()=>{
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color
                }, i*ANIMATION_SPEED_MS)
            }
            else if(child[0] === 4){
                const barIdx = animations[i]
                const barOneIdx = barIdx[1]
                const barTwoIdx = barIdx[2]
                const barOneStyle = arrayBars[barOneIdx].style
                const barTwoStyle = arrayBars[barTwoIdx].style
                const color =  i % 3 === 0 ? "yellow" : PRIMARY_COLOR

                setTimeout(()=>{
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color
                }, i*ANIMATION_SPEED_MS)
            }
            else if(child[0] === 2){
                const barIdx = animations[i]
                const barOneIdx = barIdx[1]
                const barTwoIdx = barIdx[2]
                const barOneStyle = arrayBars[barOneIdx].style
                const barTwoStyle = arrayBars[barTwoIdx].style
                setTimeout(()=>{
                    barOneStyle.backgroundColor = PRIMARY_COLOR
                    barTwoStyle.backgroundColor = "green"
                }, i*ANIMATION_SPEED_MS)
            }
             else if(child[0] === 3){
                const barIdx = animations[i]
                const barOneIdx = barIdx[1]
                const barTwoIdx = barIdx[2]
                const barOneStyle = arrayBars[barOneIdx].style
                const barTwoStyle = arrayBars[barTwoIdx].style
                setTimeout(()=>{
                    barOneStyle.backgroundColor = "green"
                    barTwoStyle.backgroundColor = "green"
                }, i*ANIMATION_SPEED_MS)
            }


            }
            else if(child[0] === 1){
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

export default bubbleSortAnimation