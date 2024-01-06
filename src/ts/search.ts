/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

/**
 * Import
 */

import { ripple } from "./utils/ripple";
import { addEventOnElements } from "./utils/event";
import { segment } from "./segment_btn";
import { updateUrl } from "./utils/updateUrl";
import { urlDecode } from "./utils/urlDecode";

/**
 * Search view toggle in small device
 */

const /** {NodeList} */ $searchToggler: NodeListOf<HTMLElement> = document.querySelectorAll("[data-search-toggler]");
const /** {NodeElement} */ $searchView: HTMLElement | null = document.querySelector("[data-search-view]");

addEventOnElements($searchToggler, "click" , () => {
  if($searchView) {
    $searchView.classList.toggle("show")
  }
});


/**
 * Search clear
 */

const $searchField: HTMLInputElement | null = document.querySelector("[data-search-field]");
const $searchClearBtn = document.querySelector("[data-search-clear-btn]");

$searchClearBtn?.addEventListener("click", () => {
  if ($searchField) {
    $searchField.value = "";
  }
});

/**
 * Search type
 */

declare global {
  interface Window {
    searchType?: string;
  }
}

const $searchSegment = document.querySelector<HTMLElement>("[data-segment='search']");

if ($searchSegment) {
  const $activeSegmentBtn = document.querySelector<HTMLElement>("[data-segment-btn].selected");

  if ($activeSegmentBtn !== null) {
    window.searchType = $activeSegmentBtn.dataset.segmentValue || "";
  }

  segment($searchSegment, (segmentValue: string) => {
    window.searchType = segmentValue;    
  });
}


/**
 * Search submit
 */

const $searchBtn: HTMLButtonElement | null= document.querySelector("[data-search-btn]");

$searchBtn?.addEventListener("click", function () {
  const searchValue: string | undefined = $searchField?.value.trim();

  if(searchValue !== undefined && searchValue !== "" && window.searchType !== undefined) {
    updateSearchHistory(searchValue);
    (window as any).filterObj.query = searchValue;
    updateUrl((window as any).filterObj, window.searchType);
  } else {
    $searchField?.focus();
    $searchView?.classList.add("show");
  }

});

/**
 * Submit search when press on "Enter" key
 */

$searchField?.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && $searchField.value.trim()) $searchBtn?.click()
})

/**
 * Search history
 */

// Initial search history
let searchHistory: {items: string[]} = { items: []};

const storedSearchHistory = window.localStorage.getItem("search_history");

if(storedSearchHistory) {
  searchHistory = JSON.parse(storedSearchHistory);
} else {
  window.localStorage.setItem("search_history", JSON.stringify(searchHistory));
}

// update search history

const updateSearchHistory = (searchValue: string) => {

  /**
   * If the searched value is already present in search list
   * then remove that one add the search value at the beginning of the search list
   * This ensures that the most recent search is at top if the history
   */

  if(searchHistory.items.includes(searchValue)) {
    searchHistory.items.splice(searchHistory.items.indexOf(searchValue), 1);
  } 

  searchHistory.items.unshift(searchValue);

  window.localStorage.setItem("search_history", JSON.stringify(searchHistory));
}

/**
 * render search history items in search list
 */

const $searchList = document.querySelector("[ data-search-list]");
const historyLen: number = searchHistory.items.length;

for(let i = 0; i<historyLen && i <= 5; i++) {
  const $listItem = document.createElement("button");
  $listItem?.classList.add("list-item");

  $listItem.innerHTML = `
    <span class="material-symbols-outlined leading-icon" aria-hidden="true">history</span>

    <span class="body-large text">${searchHistory.items[i]}</span>

    <div class="state-layer"></div>
  `;

  ripple($listItem);

  $listItem.addEventListener("click", function () {
    if($searchField && this.children[1]) {
      const textContent = this.children[1]?.textContent;
      
      if(textContent !== null && textContent !== undefined) {
        $searchField.value = textContent;
        $searchBtn?.click();
      }
    }
  })

  $searchList?.appendChild($listItem)

}


/**
 * Show searched value in search field after reload
 */

const search = urlDecode(window.location.search.slice(1));

if(search.query && $searchField) $searchField.value = search.query
