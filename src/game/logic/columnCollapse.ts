import Cell from '../models/Cell'

export function columnCollapse(column: Cell[][]): Cell[][] {
	const result: Cell[][] = [];

	for(let i = 0; i < column.length; i++) {
		const cells = column[i];
		if (cells.length === 0) continue;
		const topCell = cells[0];

		const nextTopCell = getNextTopCell(column, i);

		if (nextTopCell != null && nextTopCell.cell.value === topCell.value) {
			result.push([{ ...topCell, value: topCell.value*2 }])
			i += nextTopCell.distance;
		} else {
			result.push([topCell]);
		}
	}

	return result.concat(Array(column.length - result.length).fill(() => []).map(f => f()));
}

function getNextTopCell(column: Cell[][], position: number): { cell: Cell, distance: number } | null {
	let i = 1;
	while((i+position) < column.length) {
		const cells = column[i+position];
		if (cells.length > 0) return { cell: cells[0], distance: i }
		i++;
	}
	return null;
}
