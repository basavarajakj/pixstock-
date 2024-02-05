/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

import { Collection } from "./types";
/**
 * Import
 */

import { ripple } from "./utils/ripple";

/**
 * Create collection card
 * @param collection - Collection Objec
 * @returns Collection card
 */

export const collectionCard = (collection: Collection) => {

  const root: string = window.location.origin;

  const {
    id,
    title,
    media_count
  } = collection;

  const $card = document.createElement("div");
  $card.classList.add("grid-card", "two-line", "list-item");
  $card.setAttribute("title", title);

  $card.innerHTML = `
    <div>
      <h3 class="body-large">${title}</h3>

      <p class="body-medium label">${media_count}</p>
    </div>

    <a href="${root}/src/pages/collections/collection_detail.html?collectionId=${id}&title=${title}" class="state-layer"></a>
  `;

  ripple($card);

  return $card;
}