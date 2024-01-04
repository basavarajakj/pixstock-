/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

/**
 * Imports
 */
import { urlEncode } from "./urlEncode";

/**
 * update URL
 * @param filterObj Filter Object
 * @param searchType search type eg. 'videos' or 'photos'
 */
export const updateUrl = (filterObj: object, searchType: string) => {
  setTimeout(() => {
    const root = window.location.origin;
    
    if (filterObj && typeof filterObj === 'object') {
      const searchQuery = urlEncode(filterObj);
      window.location.href = `${root}/pages/${searchType}/${searchType}.html?${searchQuery}`;
    } else {
      console.error('Invalid filterObj:', filterObj);
    }
    
  }, 500);
}