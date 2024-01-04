/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

/**
 * Imports
 */
import { ripple } from "./utils/ripple";


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