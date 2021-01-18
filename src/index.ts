// formatting
export { formatCurrency } from './formatting/format-currency';
export { unformatCurrency } from './formatting/unformat-currency';
export { formatFloat } from './formatting/format-float';
export { formatNumber } from './formatting/format-number';
export { formatDistance } from './formatting/format-distance';
export { formatTime } from './formatting/format-time';
export { formatUppercase } from './formatting/format-uppercase';

// helpers
export { cloneObject } from './helpers/clone-object';
export { dynamicSort } from './helpers/dynamic-sort';
export { globalVarExists } from './helpers/global-exists';
export { dynamicSortMultiple } from './helpers/dynamic-sort-multiple';
export { guid } from './helpers/guid';
export { sortBy } from './helpers/sort-by';
export { filterBy } from './helpers/filter-by';
export { toggleArray } from './helpers/toggle-array';
export { tryParseInt } from './helpers/try-parse-int';
export { tryParseFloat } from './helpers/try-parse-float';
export { slugify } from './helpers/slugify';
export { compareArray } from './helpers/compare-array';
export { hasSubArray } from './helpers/has-sub-array';
export { maxChar } from './helpers/max-char';
export { roundNumber } from './helpers/round-number';
export { enumToSelectList } from './helpers/enum-to-select-list';
export { isMobile } from './helpers/is-mobile';
export { sortCaseInsensitive } from './helpers/sort-case-insensitive';
export { delay } from './helpers/delay';
export { getNumeric } from './helpers/get-numeric';
export { imageFileToBase64 } from './helpers/image-file-to-base64';
export { mod } from './helpers/mod';
export { getShortLocaleCode } from './helpers/get-short-locale-code';
export { nameOf } from './helpers/name-of';
export { minimumDelay } from './helpers/minimum-delay';
export * from './helpers/time';

// date
export { TcDate } from './common/utils/date';

// services
export { LocalStorageService } from './services/local-storage-service';

// html
export {
  getInputValueByName,
  setInputValueByName,
  setInputCheckedByName,
} from './html/get-input-value-by-name';
