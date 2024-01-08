/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

import { Client } from "./types";
/**
 * Imports
 */
import { urlEncode } from "./utils/urlEncode";


const /** {Function} */ headers = new Headers();
headers.append("Authorization", import.meta.env.VITE_PEXELS_API_KEY);

const requireOptions = { headers };

/**
 * Fetch data from an API
 * @param url - Fetch Url
 * @param successCallback - Success callback function
 */

const fetchData = async function(url: string, successCallback: Function) {
  const /** {Promise} */ response = await fetch(url, requireOptions);

  if (response.ok) {
    const /** {Object} */ data = await response.json();
    successCallback(data);
  }
};

let requestUrl: string = "";

const root: Record<string, string> = {
  default: "https://api.pexels.com/v1/",
  videos: "https://api.pexels.com/videos/"
}


export const /** {Object} */ client: Client
 = {

  photos: {

    /**
     * Search photos
     * @param parameters Url Object
     * @param callback Callback function
     */
    search(parameters: object, callback: Function) {
      requestUrl = `${root.default}search?${urlEncode(parameters)}`
      fetchData(requestUrl, callback);
    },

    /**
     * Curated photos
     * @param parameters Url Object
     * @param callback Callback function
     */

    curated(parameters: object, callback: Function) {
      fetchData(`${root.default}curated?${urlEncode(parameters)}`, callback)
    },

    /**
     * Get single photo detail
     * @param id - Photo ID
     * @param callback - Callback function
     */
    detail(id:string, callback: Function) {
      fetchData(`${root.default}photos/${id}`, callback);
    }


  },

  
  videos: {

    /**
     * Search videos
     * @param parameters Url Object
     * @param callback Callback function
     */
    search(parameters: object, callback: Function) {
      requestUrl = `${root.videos}search?${urlEncode(parameters)}`
      fetchData(requestUrl, callback);
    },

    /**
     * Get popular videos
     * @param parameters Url Object
     * @param callback Callback function
     */

    popular(parameters: object, callback: Function) {
      fetchData(`${root.videos}popular?${urlEncode(parameters)}`, callback)
    },

    /**
     * Get single video detail
     * @param id - Video ID
     * @param callback - Callback function
     */
    detail(id:string, callback: Function) {
      fetchData(`${root.videos}videos/${id}`, callback);
    }


  },

  
  collections: {

    /**
     * Get Featured Collections
     * @param parameters Url Object
     * @param callback Callback function
     */
    featured(parameters: object, callback: Function) {
      requestUrl = `${root.default}collections/featured?${urlEncode(parameters)}`;
      fetchData(requestUrl, callback);
    },


    /**
     * Get a collection medias  
     * @param id - collection ID
     * @param parameters - Url Object
     * @param callback - Callback function
     */
    detail(id:string, parameters: object, callback: Function) {
      requestUrl = `${root.default}collections/${id}?${urlEncode(parameters)}`
      fetchData(requestUrl, callback);
    }


  },



}