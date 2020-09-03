/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
import _ from 'lodash';

/*
  @params source:=> source object
  @params destination:=> destination object
  @params field:=> field array

  return new object with the fields defined in field array
*/
export const intersection = (source, destination, fields) => {
  const result = {};
  fields.forEach((field) => {
    if (destination[field]) {
      result[field] = destination[field];
    } else {
      result[field] = source[field];
    }
  });
  return result;
};

export const compareObjects = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  return _.difference(keys1, keys2);
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const trimString = (s) => {
  let l = 0;
    let r = s.length - 1;
  while (l < s.length && s[l] === ' ') l++;
  while (r > l && s[r] === ' ') r -= 1;
  return s.substring(l, r + 1);
};

const compareItems = (o1, o2) => {
  let k = '';
  for (k in o1) if (o1[k] !== o2[k]) return false;
  for (k in o2) if (o1[k] !== o2[k]) return false;
  return true;
};

const itemExists = (haystack, needle) => {
  for (let i = 0; i < haystack.length; i++) if (compareItems(haystack[i], needle)) return true;
  return false;
};

export const search = (toSearch, objects) => {
  const results = [];
  const term = (trimString(toSearch)).toLowerCase();
  for (let i = 0; i < objects.length; i++) {
    for (const key in objects[i]) {
      if ((objects[i][key]).toLowerCase().indexOf(term) !== -1) {
        if (!itemExists(results, objects[i])) results.push(objects[i]);
      }
    }
  }
  return results;
};
