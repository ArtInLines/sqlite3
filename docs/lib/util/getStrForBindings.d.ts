declare function getStrForUnnamedBindingsArr(arr: any): any;
declare function getStrForUnnamedBindingsTable(arr: any): any;
declare function getStrForNamedBindingsTable(arr: any): any;
declare function getStrForNamedBindingsObj(obj: any): any;
declare function getStrForBindings(val: any, preferNamed?: boolean): any;
export { getStrForUnnamedBindingsArr as arr, getStrForUnnamedBindingsTable as table, getStrForNamedBindingsTable as namedTable, getStrForNamedBindingsObj as namedObj, getStrForBindings as default };
