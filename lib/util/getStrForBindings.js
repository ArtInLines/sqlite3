function myReduce(arr, firstElCB, cb) {
	let result = firstElCB(arr[0], 0, arr);
	for (let i = 1; i < arr.length; i++) result = cb(result, arr[i], i, arr);
	return result;
}

function getStrForUnnamedBindingsArr(arr) {
	return myReduce(
		arr,
		() => '?',
		(str) => str + ', ?'
	);
}

function getStrForUnnamedBindingsTable(arr) {
	return myReduce(
		arr,
		() => '?',
		(str) => str + ', ?'
	);
}

function getStrForNamedBindingsTable(arr) {
	return myReduce(
		arr,
		(val) => '@' + val[0],
		(str, val) => str + ', @' + val[0]
	);
}

function getStrForNamedBindingsObj(obj) {
	const keys = Object.keys(obj);
	return myReduce(
		keys,
		(key) => `@${key}`,
		(str, key) => str + ', @' + key
	);
}

module.exports = {
	arr: getStrForUnnamedBindingsArr,
	table: getStrForUnnamedBindingsTable,
	namedTable: getStrForNamedBindingsTable,
	namedObj: getStrForNamedBindingsObj,
};
