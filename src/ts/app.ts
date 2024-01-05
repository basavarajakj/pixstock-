/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

/**
 * Import
 */
import { client } from "./api_configure";
import { collectionCard } from "./collection_card";
import { photoCard } from "./photo_card";
import { RootCollectionObject, RootObject, RootVideoObject, Video } from "./types";
import { gridInit, updatedGrid } from "./utils/masonry_grid";
import { videoCard } from "./video_card";

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


/**
 * Render popular videos in home page
 */

const $videoGrid: HTMLElement | null = document.querySelector("[data-video-grid");

if ($videoGrid) {
  $videoGrid!.innerHTML = `<div class="skeleton"></div>`.repeat(18);

  client.videos.popular({per_page: 20}, (data: RootVideoObject) => {

  $videoGrid!.innerHTML = "";
  const videoGrid = gridInit($videoGrid);


  data.videos.forEach((video: Video) => {

    const $videoCard = videoCard(video);

    if($videoCard != undefined) {
      updatedGrid($videoCard, videoGrid.columnHeight, videoGrid.$columns);
    }

  });

});
}


/**
 * Render collection in home page
 */

const $collectionGrid: HTMLDivElement | null = document.querySelector("[data-collection-grid]");

client.collections.featured({ per_page: 18 }, (data: RootCollectionObject) => {

  data.collections.forEach(collection => {

    const $collectionCard = collectionCard(collection);

    $collectionGrid?.appendChild($collectionCard)

  })

})