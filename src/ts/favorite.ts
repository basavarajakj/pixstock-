/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";

/**
 * Imports
 */

import { client } from "./api_configure";
import { Photo } from "./types";

/**
 * Add to favorite or remove from favorite
 * @param $element HTMLButtonELement
 * @param type - item type eg. "photo", "video"
 * @param id - Id of photo to save
 */



export const favorite = ($element: HTMLButtonElement, type: string, id: number) => {
  $element.addEventListener("click", () => {

    $element.setAttribute("disabled", "");
    const favoriteObj = JSON.parse(window.localStorage.getItem("favorite") as string);
    
    if(favoriteObj[type][id]) {
      $element.classList.toggle("active");
      $element.removeAttribute("disabled");

      delete favoriteObj[type][id];

      window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
    } else {
      client[type]?.detail(id, (data: Photo) => {
        $element.classList.toggle("active");
        $element.removeAttribute("disabled");

        favoriteObj[type][id] = data;

        window.localStorage.setItem("favorite", JSON.stringify(favoriteObj))
      })
    }


  });
}