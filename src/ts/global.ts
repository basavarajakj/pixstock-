/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

/**
 * Imports
 */
import { ripple } from "./utils/ripple";
import { addEventOnElements } from "./utils/event";
import { Photo } from "./types";
import { urlDecode } from "./utils/urlDecode";


/**
 * Header on scroll state
 */

const /** {HTMLElement} */ $header = document.querySelector('[data-header]');

window.addEventListener("scroll", () => {
  $header?.classList[window.scrollY > 50 ? "add": "remove"]("active");
});


/**
 * Add ripple effect
 */

const /** {NodeListOf<Element>} */ $rippleElements: NodeListOf<Element> | null = document.querySelectorAll("[data-ripple]");

$rippleElements.forEach($rippleElement => ripple($rippleElement as HTMLElement));


/**
 * Navbar toggle for mobile screen
 */

const $navToggler = document.querySelectorAll("[data-nav-toggler]");
const $navbar = document.querySelector("[data-navigation]");
const $scrim = document.querySelector("[data-scrim]");

addEventOnElements($navToggler, "click", function () {
  $navbar?.classList.toggle("show");
  $scrim?.classList.toggle("active");
});


/**
 * Filter functionality
 */

(window as any).filterObj = {};


/**
 * Show all filtered option after reload
 */

if (window.location.search.slice(1)) {

  const search = urlDecode(window.location.search.slice(1));
  
  Object.entries(search).forEach(item => {
    const filterKey = item[0];
    const filterValue = item[1];
    (window as any).filterObj[filterKey] = filterValue;

    if (filterKey !== "query" ) {
      const $filterItem = document.querySelector(`[data-filter="${filterKey}"`);
      
      if ($filterItem !== null) {
        const filterChip = $filterItem.querySelector("[data-filter-chip]");
        const filterValueElement = $filterItem.querySelector("[data-filter-value]");

        if (filterChip !== null) {
          filterChip.classList.add("selected");
        }

        if (filterValueElement !== null && filterValueElement instanceof HTMLElement) {
          filterValueElement.innerText = filterValue as string;
        }

      }
    }

  })

}

/**
 * Initial favorite object in local storage
 */
export interface FavoriteObject {
  photos: Record<number, Photo>;
  videos: Record<number, Photo>; 
}

const favoriteString: string | null = window.localStorage.getItem("favorite");

if (!favoriteString) {
  const favoriteObj: FavoriteObject = {
    photos: {},
    videos: {} 
  };

  window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
}

/**
 * Page Transition
 */

window.addEventListener("loadstart", function () {
  document.body.style.opacity = "0";
});

window.addEventListener("DOMContentLoaded", function () {
  document.body.style.opacity = "1";
});

