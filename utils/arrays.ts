/**
 * Shuffles the elements of an array.
 * @param {Array} arr - The array to be shuffled.
 * @returns {Array} - The shuffled array.
 */
export function shuffle(arr: any[]) {
    const _arr = arr.slice()
    for (let i = _arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [_arr[i], _arr[j]] = [_arr[j], _arr[i]];
    }
    return _arr
}