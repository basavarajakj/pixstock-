/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

/**
 * Imports
 */
import { client } from "../../ts/api_configure";
import { favorite } from "../../ts/favorite";
import { menu } from "../../ts/menu";
import { photoCard } from "../../ts/photo_card";
import { Photo, RootObject } from "../../ts/types";
import { gridInit, updatedGrid } from "../../ts/utils/masonry_grid";
import { ripple } from "../../ts/utils/ripple";




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

const favoritePhotos = JSON.parse((window as any).localStorage.getItem("favorite")).photos;
const $favoriteBtn: HTMLButtonElement | null = document.querySelector("[data-add-favorite]");
const photoId: string = window.location.search.split("=")[1];

if ($favoriteBtn) {
  $favoriteBtn.classList[favoritePhotos[photoId] ? "add" : "remove"]("active");
  favorite($favoriteBtn, "photos", photoId);
}

/**
 * Render detail data
 */

const $detailWrapper = document.querySelector("[data-detail-wrapper]");
const $downloadLink: HTMLAnchorElement | null = document.querySelector("[data-download-link]");
const $downloadMenu = document.querySelector("[data-download-menu]");

client.photos.detail(photoId, (data: Photo) => {

  const {
    avg_color,
    height,
    width,
    photographer,
    alt,
    src
  } = data;

  if($downloadLink) $downloadLink.href = src.original;

  Object.entries(src).forEach(item => {
    const [key, value] = item;

    $downloadMenu!.innerHTML += `
      <a href="${value}" class="menu-item" data-ripple data-menu-item>
        <span class="label-large text">${key}</span>

        <div class="state-layer"></div>
      </a>
    `
  });


  if($detailWrapper) $detailWrapper.innerHTML = `
    <figure class="detail-banner img-holder" style="aspect-ratio: ${width} / ${height}; background-color: ${avg_color}">
      <img src="${src.large2x}" width="${width}" height="${height}" alt="${alt}" class="img-cover">
    </figure>

    <p class="title-small">Photograph by <span class="color-primary">${photographer}</span></p>
  `

  const $detailImg = $detailWrapper?.querySelector("img");

  $detailImg?.addEventListener("load", function () {

    this.animate({
      opacity: 1
    }, { duration: 400, fill: "forwards"});
  
  });

  if(alt) {
    client.photos.search({query: alt, page: 1, per_page: 30}, (data: RootObject) => {
      loadSimilar(data);
    });
  }else {
    if($loader && $photoGrid) {
      $loader.style.display = "none";
      $photoGrid.innerHTML = "<p>No similar photo found.</p>"
    }
  }

  
});

/**
 * Load similar photos
 * @param data photo data
 */

const $photoGrid: HTMLElement | null = document.querySelector("[data-photo-grid]");


const $loader: HTMLDivElement | null = document.querySelector("[data-loader]")

const loadSimilar = function(data: RootObject) {

  if($photoGrid) {
    const photoGrid = gridInit($photoGrid);
    data.photos.forEach(photo => {
      const $card = photoCard(photo);

      updatedGrid($card, photoGrid.columnHeight, photoGrid.$columns);
    })
  } 
}