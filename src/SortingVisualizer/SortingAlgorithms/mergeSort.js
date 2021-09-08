export function mergeSort(array){
    const animations = []
    if(array.length <= 1) return array;
    const auxillaryArray = []
    for(let i=0; i<array.length; i++) auxillaryArray.push(array[i])
    mergeSortHelper(array,0, array.length-1, auxillaryArray,animations)
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxillaryArray,
    animations
){
    if(startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx)/2)
    mergeSortHelper(auxillaryArray,startIdx,middleIdx,mainArray,animations)
    mergeSortHelper(auxillaryArray,middleIdx+1,endIdx,mainArray,animations)
    doMerge(mainArray, startIdx,middleIdx, endIdx,auxillaryArray,animations)
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxillaryArray,
    animations
){
    let k = startIdx
    let i = startIdx
    let j = middleIdx + 1
    while(i <= middleIdx && j<= endIdx){
        animations.push([i,j])
        if(auxillaryArray[i] <= auxillaryArray[j]){
            animations.push([k,auxillaryArray[i]])
            animations.push([i,j])

            mainArray[k++] = auxillaryArray[i++]
        }else{
            animations.push([k,auxillaryArray[j]])
            animations.push([i,j])

            mainArray[k++] = auxillaryArray[j++]
        }
    }

    while( i <= middleIdx){
        animations.push([i,i])
        animations.push([k,auxillaryArray[i]])
        animations.push([i,i])

        mainArray[k++] = auxillaryArray[i++]
    }

    while(j<= endIdx){
        animations.push([j,j])
        animations.push([k, auxillaryArray[j]])
        animations.push([j,j])

        mainArray[k++] = auxillaryArray[j++]
    }

}