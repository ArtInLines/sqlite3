export = reduceSet;
/**
 * Reduce method for a set. The first value can be modified via `firstValCB` as well.
 * @param {Set} set
 * @param {Function} reduceCB Takes the total reduced value and the current value as arguments
 * @param {Function} firstValCB Takes only the value of the set as an argument
 */
declare function reduceSet(set: any, reduceCB: Function, firstValCB: Function): undefined;
