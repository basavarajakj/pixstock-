/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

/**
 * Import
 */
import { client } from "./api_configure";
import { photoCard } from "./photo_card";
import { RootObject } from "./types";
import { gridInit, updatedGrid } from "./utils/masonry_grid";

/**
 * Render curated photos in home page
 */

const $photoGrid: HTMLElement | null = document.querySelector("[data-photo-grid]");

$photoGrid!.innerHTML = `<div class="skeleton"></div>`.repeat(18);

client.photos.curated( { page: 1, per_page: 20 }, (data: RootObject) => {
  
  if($photoGrid) {
    $photoGrid.innerHTML = "";

    const photoGrid = gridInit($photoGrid);
    
    data.photos.forEach(photo => {
      
      const $photoCard = photoCard(photo);
      
      updatedGrid($photoCard, photoGrid.columnHeight, photoGrid.$columns);
      
    })
  }
});
