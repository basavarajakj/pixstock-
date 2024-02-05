/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

/**
 * Imports
*/
import { client } from "../../ts/api_configure";
import { photoCard } from "../../ts/photo_card";
import { CollectionMedia } from "../../ts/types";
import { gridInit, updatedGrid } from "../../ts/utils/masonry_grid";
import { urlDecode } from "../../ts/utils/urlDecode";
import { videoCard } from "../../ts/video_card";


/**
 * Render collection medias
 */

const $collectionGrid: HTMLElement | null = document.querySelector("[data-collection-grid]")!;
const $title = document.querySelector("[data-title]");
let perPage: number = 30;
let currentPage: number = 1;
let totalPage: number = 0;
// const collectionEntries = window.location.search.slice(1).replace(/%20/g, " ").split("&").map(i => i.split("="));
const search = window.location.search
const collectionUrl = search.slice(1);
const collectionObj = collectionUrl && urlDecode(collectionUrl);
const title = collectionObj && `${collectionObj.title} collections`
const collectionGrid = gridInit($collectionGrid)


if($title) {
  $title.textContent = title;
  document.title = title;
}

const loadCollections = function (page: number) {

  client.collections.detail(collectionObj.collectionId, { per_page: perPage, page: page}, (data: CollectionMedia) => {

  totalPage = Math.ceil(data.total_results / perPage);
  
  data.media.forEach((item: any ) => {
    let $card: any;

    switch (item.type.toLowerCase()) {
      case "photo":
        $card = photoCard(item);
        break;
      case "video":
        $card = videoCard(item);
        break;
    }

    updatedGrid($card, collectionGrid.columnHeight, collectionGrid.$columns);

    isLoaded = true;
    if(currentPage >= totalPage && $loader) $loader.style.display = "none";
  });

  });
}

loadCollections(currentPage);


/**
 * Load more media
 */

const $loader: HTMLDivElement | null = document.querySelector("[data-loader]");
let isLoaded = true;

window.addEventListener("scroll", function () {

  if($loader && $loader?.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPage && isLoaded) {

    currentPage++;
    loadCollections(currentPage);
    isLoaded = false;
  }

});