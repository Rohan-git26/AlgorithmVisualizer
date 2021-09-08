export function selectionSort(array){
    let animations = [];
    console.log(array)
    let i = 0;
    for(; i<array.length-1; i++){
        let minIdx = i;
        animations.push([3,i])
        animations.push([])
        animations.push([])
        for(let j=i+1;j<array.length; j++){
            animations.push([0,j,minIdx]);
            if(array[j]<array[minIdx]){
                animations.push([4,minIdx,j]);
                animations.push([-1,minIdx,j]);
                minIdx = j;
            }
            else{
                animations.push([])
                animations.push([0,minIdx,j]);
            }
        }
        animations.push([2,i,minIdx]);


        let temp = array[i];
        array[i] = array[minIdx];
        array[minIdx] = temp;
        animations.push([1,i,minIdx]);
        if(i === minIdx){
            animations.push([-2,i]);
        }
        else{
            animations.push([2,i,minIdx]);
        }
    }
    animations.push([-2,array.length - 1]);
    return animations;
}

