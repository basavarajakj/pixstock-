/**
* @copyright codewithsadee 2023
* @author sadee <codewithsadee@gmail.com>
*/

"use strict";

/**
 * Convert Object to URL
 * @param {Object} urlObj - url object
 * @returns - url String
 */

export const urlEncode = (urlObj:object) => {
  const params = new URLSearchParams;

  for (const [key, value] of Object.entries(urlObj) ) {
    params.append(key, value);
  }

  return params.toString();
  
}