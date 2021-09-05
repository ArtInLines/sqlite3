/**
 * Reduce method for a set. The first value can be modified via `firstValCB` as well.
 * @param {Set} set
 * @param {Function} reduceCB Takes the total reduced value and the current value as arguments
 * @param {Function} firstValCB Takes only the value of the set as an argument
 */
function reduceSet(set, reduceCB, firstValCB) {
	let i = 0,
		result;
	set.forEach((val) => {
		if (i === 0) result = typeof firstValCB === 'function' ? firstValCB(val) : val;
		else result = reduceCB(result, val);
		i++;
	});
	return result;
}

module.exports = reduceSet;
