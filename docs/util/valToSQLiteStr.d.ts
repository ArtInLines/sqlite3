export = valToStr;
/**
 * Transform a JS value into a string for a SQLite Query
 * @param {?(String | Number | Date)} val Value to convert
 * @param {Boolean} [quoteStr] Indicates whether to put quotes around string values. Defaults to `false`
 * @returns {String} Stringified version of the value, that SQLite understands
 */
declare function valToStr(val: (string | number | Date) | null, quoteStr?: boolean): string;
