/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";


/**
 * Import
*/

import { addEventOnElements } from "./utils/event";

/**
 * Add menu functionality 
 * @param $menuWrapper Menu parent element
 * @param callback Callback function
 */

export const menu = function ($menuWrapper: HTMLDivElement, callback: Function) {

  const $menu = $menuWrapper.querySelector("[data-menu]");
  const $menuToggler = $menuWrapper.querySelectorAll("[data-menu-toggler]");
  const $menuItems = $menuWrapper.querySelectorAll("[data-menu-item]");

  addEventOnElements($menuToggler, "click", () => {
    $menu?.classList.toggle("expanded");
  });

  addEventOnElements($menuItems, "click", function (this: HTMLDivElement) {
    $menu?.classList.remove("expanded");
    if(callback) callback(this.dataset.menuItem);
  })

}