/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

/**
 * imports
 */
import { addEventOnElements } from "./utils/event";


/**
 * 
 */
export const segment = function($segment: HTMLElement, callback: any) {

  const $segmentBtns = $segment.querySelectorAll("[data-segment-btn");
  let $lastSelectedSegmentBtn = $segment.querySelector("[data-segment-btn].selected");

  addEventOnElements($segmentBtns, "click", function (this: HTMLElement) {
    $lastSelectedSegmentBtn?.classList.remove("selected");
    this.classList.add("selected");
    $lastSelectedSegmentBtn = this;

    if(callback instanceof Function) {
      callback(this.dataset.segmentValue)
    }
  })
  
}
