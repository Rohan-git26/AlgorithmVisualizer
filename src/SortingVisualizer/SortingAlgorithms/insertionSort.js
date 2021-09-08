
export function insertionSort(array){
    let i, key, j;
    const animations = []
    for (i = 1; i < array.length; i++)
    {
        key = array[i];
        j = i - 1;
        animations.push([])
        animations.push([3,i])
        animations.push([])
 
        /* Move elements of array[0..i-1], that are
        greater than key, to one position ahead
        of their current position */
        while (j >= 0 && array[j] > key)
        {
            animations.push([4,j+1,j])
            animations.push([1,j+1,j])
            array[j + 1] = array[j];
            animations.push([4,j+1,j])
            j = j - 1;
        }
        animations.push([-4,j+1,i])
        animations.push([-1,j+1,i])
        array[j + 1] = key;
        animations.push([-5,j+1,i])

    }
    return animations
}