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