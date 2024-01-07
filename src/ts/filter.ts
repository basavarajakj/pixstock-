/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

/**
 * Imports
 */

import { menu } from "./menu";

/**
 * Add filter functionality
 * @param $filterWrapper Filter wrapper
 * @param filterObj Filter Object
 * @param callback Callback function
 */

export const filter = ($filterWrapper: HTMLDivElement, filterObj: object, callback: Function) => {

  const $filterClearBtn = $filterWrapper.querySelector("[data-filter-clear");
  const $filterValue: HTMLSpanElement | null = $filterWrapper.querySelector("[data-filter-value]");
  const $filterChip = $filterWrapper.querySelector("[data-filter-chip]");
  const $filterColorField = $filterWrapper.querySelector("[data-color-field]");

  const filterKey: string | undefined= $filterWrapper.dataset.filter;
  const newObj: {[key: string]: any } = filterObj;

  menu($filterWrapper, (filterValue: string) => {
    $filterValue!.innerText = filterValue;
    $filterChip?.classList.add("selected");
    
    if (filterKey !== undefined) {
      newObj[filterKey] = filterValue;
      callback(newObj);
    }
  });

  $filterClearBtn?.addEventListener("click", () => {
    $filterChip?.classList.remove("selected");
    if($filterValue) $filterValue.innerText = $filterValue?.dataset.filterValue || " ";

    if(filterKey) delete newObj[filterKey];
    callback(newObj);
  });

  $filterColorField?.addEventListener("change", function(this: HTMLInputElement) {
    const filterValue = this.value.toLowerCase();

    if($filterValue) $filterValue.innerText = filterValue;
    $filterChip?.classList.add("selected");

    if(filterKey)newObj[filterKey] = filterValue;
    callback(newObj)
  })

}