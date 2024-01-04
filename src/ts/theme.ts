/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

const /** {NodeElement} */ $HTML = document.documentElement;
const /** {Boolean} */ userPreferTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

let themeFromStorage = sessionStorage.getItem('theme') || (userPreferTheme? "light" : "dark");

$HTML.dataset.theme = themeFromStorage;

const changeTheme = function () {
  
 themeFromStorage = themeFromStorage === "light" ? "dark" : "light";
 sessionStorage.setItem("theme", themeFromStorage);
  
  
  if($HTML instanceof HTMLElement) {
    $HTML.dataset.theme = themeFromStorage
  }
}

window.addEventListener('load', () => {
  const /** {element} */ $themBtn = document.querySelector("[data-theme-toggler]");
  $themBtn?.addEventListener('click', changeTheme);

})