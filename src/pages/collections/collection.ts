/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

/**
 * Import
 */

import { client } from "../../ts/api_configure";
import { collectionCard } from "../../ts/collection_card";
import { Collection, RootCollectionObject } from "../../ts/types";


/**
 * Render featured collections
 */

const $collectionGrid = document.querySelector("[data-collection-grid]");
const perPage = 36;
let currentPage = 1;
let totalPage = 0;

/**
 * @param page Page number
 */

const loadCollections = function (page: number) {

  client.collections.featured({ per_page: perPage, page }, (data: RootCollectionObject) => {

    totalPage = Math.ceil(data.total_results / perPage);

    data.collections.forEach((collection: Collection) => {

      const $collectionCard = collectionCard(collection);

      $collectionGrid?.appendChild($collectionCard);

    });

    //  when photos loaded
    isLoaded = true;

    // when no more photo found, hide loader

    if(currentPage >= totalPage && $loader) $loader.style.display = "none";
  });

}

loadCollections(currentPage);

/**
 * Load more collections
 */

const $loader: HTMLDivElement | null = document.querySelector("[data-loader]");
let isLoaded = false;
window.addEventListener("scroll", function () {

  if($loader && $loader?.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPage && isLoaded) {

    currentPage++;
    loadCollections(currentPage);
    isLoaded = false;
  }

});