import { BaseCell } from "../models/Cell"

export interface CollapsedCell extends BaseCell {
	fromIndex: number;
	fromValue?: number;
}

export function collapseColumn(column: BaseCell[][]): { cells: CollapsedCell[][], changed: boolean, points: number } {
  const result: CollapsedCell[][] = [];
  let changed = false;
  let points = 0;

  for(let i = 0; i < column.length; i++) {
    const topCell = getTopCell(column, i);
    if (topCell == null) continue;
    const nextTopCell = getNextTopCell(column, i);

    if (nextTopCell != null && nextTopCell.cell.value === topCell.value) {
      changed = true;
      points += topCell.value*2;
      result.push([
        { value: topCell.value*2, fromIndex: i, fromValue: topCell.value },
        { value: nextTopCell.cell.value, fromIndex: i + nextTopCell.distance }
      ])
      i += nextTopCell.distance;
    } else {
      if (result.length !== i) changed = true;
      result.push([{ value: topCell.value, fromIndex: i }]);
    }
  }

  const remaining = generateEmptyColumn(column.length - result.length);
  return { cells: result.concat(remaining), changed, points }
}

function getTopCell(column: BaseCell[][], position: number): BaseCell | null {
  const cells = column[position];
  if (cells.length === 0) return null;
  return cells[0];
}

function getNextTopCell(column: BaseCell[][], position: number): { cell: BaseCell, distance: number } | null {
  let i = 1;
  while((i+position) < column.length) {
    const cells = column[i+position];
    if (cells.length > 0) return { cell: cells[0], distance: i }
    i++;
  }
  return null;
}

function generateEmptyColumn(size: number) {
  return  Array(size)
    .fill(() => [])
    .map(f => f());
}
