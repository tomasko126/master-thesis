/**
 * Promise, which resolves after approximately |ms|
 * @param {Number} ms
 * @returns {Promise<void>}
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
