/**
 * @copyright basavaraj 2024
 * @author bassu <basavarajakj06@gmail.com>
 */

"use strict";


/**
 * Initial columns
 * @param $gridContainer - Grid container
 * @returns {Object} Column & Columns height array
 */

export const gridInit = function ($gridContainer: HTMLElement) {

  const $columns = [];
  const columnHeight = [];

  const columnCount = Number(getComputedStyle($gridContainer).getPropertyValue("--column-count"));

  for ( let i = 0; i < columnCount; i++) {
    const $column = document.createElement("div");
    $column.classList.add("column");
    $gridContainer.appendChild($column);
    $columns.push($column);
    columnHeight.push(0);
  }  

  return { $columns, columnHeight };

}

/**
 * update the masonry grid
 * @param $card Grid Item
 * @param columnHeight Height of all columns
 * @param $columns All columns
 */

export const updatedGrid = function ($card: HTMLElement | HTMLDivElement, columnHeight: number[], $columns: HTMLDivElement[]) {

  const minColumnHeight = Math.min(...columnHeight);
  const minColumnIndex = columnHeight.indexOf(minColumnHeight);

  $columns[minColumnIndex]?.appendChild($card);
  columnHeight[minColumnIndex] = $columns[minColumnIndex].offsetHeight;

}