export = myReduce;
/**
 * @callback firstElCB
 * @param {*} val Equal to `arr[0]`
 * @param {Number} index The index of the first element. Equal to `0`.
 * @param {Array} arr The array to reduce.
 */
/**
 * @callback reduceCB
 * @param {*} Previous The reduced result of the previous values.
 * @param {*} Current The current value of the array equal to `arr[i]`.
 * @param {Number} index The index of the current value in the array.
 * @param {Array} arr The array that is being reduced.
 */
/**
 * Reduces an Array to a single value, but letting you modify the first element as well, unlike the default `Array.reduce()`.
 * @param {Array} arr The Array to reduce. The Array is not modified.
 * @param {firstElCB} firstElCB A function that sets the value of the first element for the reduce function.
 * @param {Function} cb A function to call on each value (exept `arr[0]`) to produce the reduced result.
 */
declare function myReduce(arr: any[], firstElCB: firstElCB, cb: Function): any;
declare namespace myReduce {
    export { firstElCB, reduceCB };
}
type firstElCB = (val: any, index: number, arr: any[]) => any;
type reduceCB = (Previous: any, Current: any, index: number, arr: any[]) => any;
