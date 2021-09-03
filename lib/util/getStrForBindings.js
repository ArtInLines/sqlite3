const reduceArr = require('./reduceArr');

function getStrForUnnamedBindingsArr(arr) {
	return reduceArr(
		arr,
		() => '?',
		(str) => str + ', ?'
	);
}

function getStrForUnnamedBindingsTable(arr) {
	return reduceArr(
		arr,
		() => '?',
		(str) => str + ', ?'
	);
}

function getStrForNamedBindingsTable(arr) {
	return reduceArr(
		arr,
		(val) => '@' + val[0],
		(str, val) => str + ', @' + val[0]
	);
}

function getStrForNamedBindingsObj(obj) {
	const keys = Object.keys(obj);
	return reduceArr(
		keys,
		(key) => `@${key}`,
		(str, key) => str + ', @' + key
	);
}

function getStrForBindings(val, preferNamed = false) {
	if (Array.isArray(val)) {
		if (Array.isArray(val[0])) {
			if (preferNamed) return getStrForNamedBindingsTable(val);
			else return getStrForUnnamedBindingsTable(val);
		} else return getStrForUnnamedBindingsArr(val);
	} else if (val instanceof Map) return getStrForNamedBindingsTable(val.entries());
	else return getStrForNamedBindingsObj(val);
}

module.exports = {
	arr: getStrForUnnamedBindingsArr,
	table: getStrForUnnamedBindingsTable,
	namedTable: getStrForNamedBindingsTable,
	namedObj: getStrForNamedBindingsObj,
	default: getStrForBindings,
};
