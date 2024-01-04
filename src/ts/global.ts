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