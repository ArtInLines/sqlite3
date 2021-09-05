/**
 * Split a string on `splitter` when `splitter` doesn't appear between `ignoreStart` and `ìgnoreEnd`. `ignoreStart` shouldn't be a substring of `ìgnoreEnd`. `ìgnoreStart` and `ignoreEnd` are not removed from the string.
 * @param {String} str
 * @param {String} splitter Substring to split `str` on.
 * @param {String} ignoreStart Don't split when `splitter` appears in between `ignoreStart` and `ignoreEnd`
 * @param {String} ignoreEnd Don't split when `splitter` appears in between `ignoreStart` and `ignoreEnd`. Defaults to `ignoreStart`
 * @param {Boolean} [caseSensitive] Indicates whether `splitter` is case sensitive. Defaults to `true`.
 * @returns {String}
 */
function splitWithIgnoreBlock(str, splitter, ignoreStart, ignoreEnd = ignoreStart, caseSensitive = true) {
	if (splitter.length === ignoreStart.length && splitter.length === ignoreEnd.length) return fasterSplit(str, splitter, ignoreStart, ignoreEnd, caseSensitive);
	if (!caseSensitive) {
		splitter = splitter.toLowerCase();
		ignoreStart = ignoreStart.toLowerCase();
		ignoreEnd = ignoreEnd.toLowerCase();
	}

	function getSubstr(i, len) {
		let substr = str.slice(i, i + len);
		if (!caseSensitive) substr = substr.toLowerCase();
		return substr;
	}

	const arr = [];
	let startSliceIndex = 0;
	let ignore = false;
	for (let i = 0; i < str.length; i++) {
		if (!ignore && getSubstr(i, splitter.length) === splitter) {
			arr.push(str.slice(startSliceIndex, i));
			i += splitter.length - 1;
			startSliceIndex = i + 1;
		}

		if (ignoreStart === ignoreEnd) {
			if (getSubstr(i, ignoreStart.length) === ignoreStart) ignore = !ignore;
		} else {
			if (getSubstr(i, ignoreStart.length) === ignoreStart) ignore = true;
			else if (getSubstr(i, ignoreEnd.length) === ignoreEnd) ignore = false;
		}

		console.log({ substr: getSubstr(i, ignoreStart.length), ignore });
	}
	arr.push(str.slice(startSliceIndex));
	return arr;
}

/**
 * splitter, ignoreStart & ignoreEnd must have the same length for this method to work properly.
 * This function is basically identical to `splitWithIgnoreBlock`, except that it performs a little faster
 * @param {String} str
 * @param {String} splitter
 * @param {String} ignoreStart
 * @param {String} ignoreEnd
 * @param {Boolean} caseSensitive
 */
function fasterSplit(str, splitter, ignoreStart, ignoreEnd = ignoreStart, caseSensitive = true) {
	if (!caseSensitive) {
		splitter = splitter.toLowerCase();
		ignoreStart = ignoreStart.toLowerCase();
		ignoreEnd = ignoreEnd.toLowerCase();
	}

	const len = splitter.length;

	const arr = [];
	let startSliceIndex = 0;
	let ignore = false;
	for (let i = 0; i < str.length; i++) {
		let substr = str.slice(i, i + len);
		if (!caseSensitive) substr = substr.toLowerCase();

		if (!ignore && substr === splitter) {
			arr.push(str.slice(startSliceIndex, i));
			i += splitter.length - 1;
			startSliceIndex = i + 1;
		}

		if (ignoreStart === ignoreEnd) {
			if (substr === ignoreStart) ignore = !ignore;
		} else {
			if (substr === ignoreStart) ignore = true;
			else if (substr === ignoreEnd) ignore = false;
		}
	}
	arr.push(str.slice(startSliceIndex));
	return arr;
}

module.exports = splitWithIgnoreBlock;
