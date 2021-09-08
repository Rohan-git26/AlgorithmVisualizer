export function quickSort(array){
    const animations = []
    quickSortHelper(array,0,array.length - 1,animations)
    return animations
}

export function quickSortHelper(array,start,end,animations){
    if(start >= end){
        animations.push([-1,start,end])
        animations.push([-1,start,end]) 
        if(end<0) end = 0
        if(start>array.length - 1) start = array.length-1
        animations.push([3,start,end])


    }

    if(start<end){
        const pIndex = partition(array,start,end,animations)
        quickSortHelper(array,start,pIndex-1,animations)
        quickSortHelper(array,pIndex+1,end,animations)
    }
}

function partition(array,start,end,animations){
    let i = start

    for(let j = start; j<=end - 1; j++){
        const pivot = array[end]
        animations.push([0,j,end])
        if(array[j]<=pivot){

            animations.push([])
            animations.push([0,j,end])
            
            swap(array,i,j)
            animations.push([4,i,j])
            animations.push([1,i,j])
            animations.push([4,i,j])
            i++
        }
        else{
            animations.push([-1,i,j])
            animations.push([0,j,end])
        }       
    }
    animations.push([4,i,end])
    animations.push([1,i,end])
    animations.push([2,i,end])

    swap(array,i,end)
    return i
}


function swap(array, i, j){
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
}