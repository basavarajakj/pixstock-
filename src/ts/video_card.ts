/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";


/**
 * Imports
*/

import { ripple } from "./utils/ripple";
import { favorite } from "./favorite";
import { Video } from "./types";
import { FavoriteObject } from "./global";
import { hoverOnPlay } from "./utils/hoverOnPlay";

/**
 * Create video card
 * @param video Video Object
 * @returns Video Card
 */
export const videoCard = (video: Video) => {
  const root: string = window.location.origin;

  const {
    height,
    width,
    id,
    image,
    video_files
  } = video;


  const sdVideo = video_files.find(item => item.quality === "sd" && item.width < 1000);
  
  if (sdVideo) {
    const { file_type, link } = sdVideo;
  
    const favoriteObj: FavoriteObject = JSON.parse(window.localStorage.getItem("favorite") as string);

    const $card = document.createElement("div");
    $card.classList.add("card", "grid-item", "video");

    $card.innerHTML = `   
      <div class="card-banner" style="--width: ${width}; --height: ${height}">
        <video poster=${image} class="img-cover" loading="lazy"  muted loop preload="none" data-video>
          <source src="${link}" type="${file_type}">
        </video>
    </div>

    <div class="card-content">
      <button class="icon-btn small ${favoriteObj.videos[id] ? "active" : ""}" aria-label="Add to favorite" data-ripple data-favorite-btn>
        <span class="material-symbols-outlined" aria-hidden="true">favorite</span>

        <div class="state-layer"></div>
      </button>
    </div>

    <span class="card-badge" data-card-badge>
      <span class="material-symbols-outlined" aria-hidden="true">play_arrow</span>
    </span>

    <a href="${root}/src/pages/videos/video_detail.html?id=${id}" class="state-layer"></a>
    `;
    /**
     * Add ripple effect
     */

    // @ts-ignore: Suppressing the error for the next line
    const $rippleElements: NodeListOf<Element> | null = [$card, $card?.querySelector("[data-ripple]")]

    $rippleElements?.forEach($rippleElement => ripple($rippleElement as HTMLElement));


    const $favoriteBtn: HTMLButtonElement | null = $card?.querySelector("[data-favorite-btn]");
  
    if($favoriteBtn) {
      favorite($favoriteBtn, "videos", id);
    }

    hoverOnPlay($card)

    return $card;

  } else {
  console.log("Error in API data");
  
}
  
  
}