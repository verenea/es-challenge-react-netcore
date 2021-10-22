import isString from 'lodash/isString';
import every from 'lodash/every';

const getVersionParts = version => version.split('.');

const isNumericStr = input => isString(input) && input.match(/^[0-9]+$/) != null;

const isValidVersion = ver => {
  try {
    if (ver) {
      // could do a string check here, but fallback to catch
      const segments = getVersionParts(ver);
      // make sure we have only 1-3 total parts and that each part is numeric for comparitive evals
      // if last segment is empty, allow pass through for now
      return segments.length <= 3 && every(segments, x => isNumericStr(x) || x.length === 0);
    } else if (!process.env.DISABLE_EMPTY_SEARCH) {
      //return true;
    }
  } catch (err) {
    console.log('isValidVersion error: ', err);
  }
  return false;
}

export { getVersionParts, isNumericStr, isValidVersion };