/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

export const hoverOnPlay = function ($card: HTMLDivElement) {

  const $cardVideo: HTMLVideoElement | null = $card.querySelector("[data-video]");
  const $cardBadge: HTMLSpanElement | null = $card.querySelector("[data-card-badge]");

  let isPlaying = false;
  let playTimeout: number;

  $card.addEventListener("pointerover", function () {
    playTimeout = setTimeout(() => {
      if($cardBadge) {
        $cardBadge.style.display = "none";
      }

      $cardVideo?.play().then(() => {
        isPlaying = true;
      }).catch(() => {
        isPlaying = false
      })
    }, 500)
  });

  $card.addEventListener("pointerout", function () {

    playTimeout && clearTimeout(playTimeout); 
    
    if($cardBadge) {
      $cardBadge.style.display = "grid";
    }
    if (isPlaying) $cardVideo?.pause();

  });

}