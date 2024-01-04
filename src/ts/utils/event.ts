/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

/**
 * Add event on multiple element
 * 
 * @param $elements NodeList
 * @param eventType event type eg. "click"
 * @param callback callback function
 */
export const addEventOnElements = function ($elements: NodeListOf<Element>, eventType: string, callback:EventListenerOrEventListenerObject) {
  $elements.forEach($element => $element.addEventListener(eventType, callback));
} 