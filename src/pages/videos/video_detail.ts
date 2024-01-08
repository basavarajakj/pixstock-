/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

/**
 * Imports
 */
import { client } from "../../ts/api_configure";
import { ripple } from "../../ts/utils/ripple";
import { favorite } from "../../ts/favorite";
import { menu } from "../../ts/menu";
import { Video } from "../../ts/types";




/**
 * Add ripple effect
 */

const /** {NodeListOf<Element>} */ $rippleElements: NodeListOf<Element> | null = document.querySelectorAll("[data-ripple]");

$rippleElements.forEach($rippleElement => ripple($rippleElement as HTMLElement));


/**
 * Page Transition
 */

window.addEventListener("loadstart", function () {
  document.body.style.opacity = "0";
});

window.addEventListener("DOMContentLoaded", function () {
  document.body.style.opacity = "1";
});


/**
 * Menu Toggle
 */

const $menuWrappers: NodeListOf<HTMLDivElement> = document.querySelectorAll("[data-menu-wrapper]");

$menuWrappers.forEach($menuWrapper => {
  menu($menuWrapper);
});


/**
 * Add to favorite
 */

const favoriteVideos = JSON.parse((window as any).localStorage.getItem("favorite")).videos;
const $favoriteBtn: HTMLButtonElement | null = document.querySelector("[data-add-favorite]");
const videoId: string = window.location.search.split("=")[1];

if ($favoriteBtn) {
  $favoriteBtn.classList[favoriteVideos[videoId] ? "add" : "remove"]("active");
  favorite($favoriteBtn, "videos", videoId);
}

/**
 * Render detail data
 */

const $detailWrapper = document.querySelector("[data-detail-wrapper]");
const $downloadLink: HTMLAnchorElement | null = document.querySelector("[data-download-link]");
const $downloadMenu = document.querySelector("[data-download-menu]");

client.videos.detail(videoId, (data: Video) => {

  const {
    width,
    height,
    image,
    user: { name: author },
    video_files
  } = data;

  const hdVideo = video_files.find(item => item.quality === "hd");

  if(hdVideo) {
    const { file_type, link } = hdVideo; 
    if($downloadLink) $downloadLink.href = link;



    video_files.forEach(item => {
      const {
        width,
        height,
        quality,
        link
      } = item;

      if($downloadMenu) $downloadMenu.innerHTML += `
        <a href="${link}" class="menu-item">
          <span class="label-large text">${quality.toUpperCase()}</span>

          <span class="label-large trailing-text">${width}x${height}</span>

          <div class="state-layer"></div>
        </a>
      `
    });

    if($detailWrapper) $detailWrapper.innerHTML = `
      <div class="detail-banner" style="aspect-ratio: ${width} / ${height};">
        <video controls poster="${image}" class="img-cover" data-video>
          <source src="${link}" type="${file_type}">
        </video>
      </div>

      <p class="title-small">Video by <span class="color-primary">${author}</span></p>
    `
  }
  
});


