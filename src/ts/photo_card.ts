/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

/**
 * Import
*/
import { Photo } from "./types";
import { ripple } from "./utils/ripple";

/**
 * Crate photo card
 */

export const photoCard = (photo: Photo) => {

  const root: string = window.location.origin;
  

  const {
    alt,
    avg_color: backdropColor,
    width,
    height,
    id,
    src: { large }
  } = photo;

  const $card: HTMLElement | null = document.createElement("div");
  $card.classList.add("card", "grid-item");
  $card.style.backgroundColor = backdropColor;

  $card!.innerHTML = `
    <figure class="card-banner" style="--width: ${width}; --height: ${height};">
      <img src="${large}" width="${width}" height="${height}" loading="lazy" class="img-cover" alt="${alt}">
    </figure>

    <div class="card-content">

      <button class="icon-btn small" aria-label="Add to favorite" data-ripple data-toggle-btn>
        <span class="material-symbols-outlined" aria-hidden="true">favorite</span>

        <div class="state-layer"></div>
      </button>

    </div>

    <a href="${root}/src/pages/photos/photo_detail.html?id=${id}" class="state-layer"></a>
  `;

  const $cardBanner = $card.querySelector("img");
  $cardBanner!.style.opacity = '0';

  $cardBanner?.addEventListener("load", function () {
    this.animate({
      opacity: 1
    }, { duration: 400, fill: "forwards"});
  });

  /**
   * Add ripple effect
   */

  // @ts-ignore: Suppressing the error for the next line
  const $rippleElements: NodeListOf<Element> | null = [$card, $card?.querySelector("[data-ripple]")]

  $rippleElements?.forEach($rippleElement => ripple($rippleElement as HTMLElement));

  return $card;

}