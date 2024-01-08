/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

/**
 * Import
*/
import { client } from "../../ts/api_configure";
import { filter } from "../../ts/filter";
import { videoCard } from "../../ts/video_card";
import { RootVideoObject, Video } from "../../ts/types";
import { gridInit, updatedGrid } from "../../ts/utils/masonry_grid";
import { updateUrl } from "../../ts/utils/updateUrl";
import { urlDecode } from "../../ts/utils/urlDecode";


/**
 * Show filter bar if searched anything
 */

const $filterBar: HTMLElement | null = document.querySelector("[data-filter-bar]");

if($filterBar) $filterBar.style.display = window.location.search ? "flex" : "none";


/**
 * Init filter
 */


const $filterWrappers: NodeListOf<HTMLDivElement> = document.querySelectorAll("[data-filter]");

$filterWrappers.forEach(($filterWrapper: HTMLDivElement) => {
  filter($filterWrapper, (window as any).filterObj, (newObj: any) => {
    (window as any).filterObj = newObj;
    updateUrl(newObj, "videos");
  });
});


/**
 * Render popular or searched videos
 * if searched something then render searched videos 
 * otherwise render popular videos
 */

const $videoGrid: HTMLElement | null = document.querySelector("[data-video-grid]")!;
const $title = document.querySelector("[data-title]");


let perPage: number = 30;
let currentPage: number = 1;
let totalPage: number = 0;
const search = window.location.search
const searchUrl = search.slice(1);
let searchObj = searchUrl && urlDecode(searchUrl);
const title = searchObj ? `${searchObj.query} videos` : "Popular videos";
const videoGrid = gridInit($videoGrid);


if($title) {
  $title.textContent = title;
  document.title = title;
}

/**
 * Render all photos
 * @param currentPage current Page number
 */

const renderVideos = function (currentPage: number) {

  client.videos[searchObj ? "search" : "popular"]({ ...searchObj, per_page: perPage, page: currentPage }, (data: RootVideoObject) => {

    
    totalPage = Math.ceil(data.total_results / perPage);


      data.videos.forEach((video: Video) => {
        const $videoGrid = videoCard(video);
        updatedGrid($videoGrid!, videoGrid.columnHeight, videoGrid.$columns);
      })
    
    //  when videos loaded
    isLoaded = true;

    // when no more photo found, hide loader

    if(currentPage >= totalPage && $loader) $loader.style.display = "none";

  })

}

renderVideos(currentPage);


/**
 * Load more photos
 */

const $loader: HTMLDivElement | null = document.querySelector("[data-loader]");
let isLoaded = true;


window.addEventListener("scroll", function () {

  if($loader && $loader?.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPage && isLoaded) {

    currentPage++;
    renderVideos(currentPage);
    isLoaded = false;
  }

})
