export = splitWithIgnoreBlock;
/**
 * Split a string on `splitter` when `splitter` doesn't appear between `ignoreStart` and `ìgnoreEnd`. `ignoreStart` shouldn't be a substring of `ìgnoreEnd`. `ìgnoreStart` and `ignoreEnd` are not removed from the string.
 * @param {String} str
 * @param {String} splitter Substring to split `str` on.
 * @param {String} ignoreStart Don't split when `splitter` appears in between `ignoreStart` and `ignoreEnd`
 * @param {String} ignoreEnd Don't split when `splitter` appears in between `ignoreStart` and `ignoreEnd`. Defaults to `ignoreStart`
 * @param {Boolean} [caseSensitive] Indicates whether `splitter` is case sensitive. Defaults to `true`.
 * @returns {String[]}
 */
declare function splitWithIgnoreBlock(str: string, splitter: string, ignoreStart: string, ignoreEnd?: string, caseSensitive?: boolean): string[];
