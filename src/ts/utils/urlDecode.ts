/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

/**
 * Convert Url to object
 * @param urlString - url string
 * @returns url object
 */

export const urlDecode = (urlString: string) => {
  return Object.fromEntries(urlString.replace(/%23/g, "#").replace(/%20/g, " ").split("&").map(i => i.split("=")));
}