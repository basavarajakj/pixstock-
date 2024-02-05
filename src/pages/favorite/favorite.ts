/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";


import { photoCard } from "../../ts/photo_card";
import { segment } from "../../ts/segment_btn";
/**
 * Imports
*/
import { gridInit, updatedGrid } from "../../ts/utils/masonry_grid";
import { videoCard } from "../../ts/video_card";


/**
 * Favorite segment button
 */

const $favGrid: HTMLElement | null = document.querySelector('[data-fav-grid]')!;
const $favoriteSegment: HTMLElement | null = document.querySelector("[data-segment='favorite']");
let favType = "photos";
let favGrid =  gridInit($favGrid);

if ($favoriteSegment) {
  segment($favoriteSegment, (segmentValue: string) => {
    favType = segmentValue;

    $favGrid.innerHTML = "";
    favGrid = gridInit($favGrid);
    loadFav(favType, favGrid);
  });
};

/**
 * Load Favorite items
 */

const favDataString = window.localStorage.getItem("favorite");
const favData = favDataString ? JSON.parse(favDataString) : { photos: {}, videos: {} };

 const loadFav = function (type: string, favGirdItem: any) {

  Object.values(favData[type] || {}).forEach((item: any) => {

    let $card: any;

    switch(type) {
      case "photos":
        $card = photoCard(item);
        break;
      case "videos":
        $card = videoCard(item);
        break;
    }
  
    updatedGrid($card, favGirdItem.columnHeight, favGirdItem.$columns);

  });

}

loadFav(favType, favGrid);