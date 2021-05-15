import Cell from '../models/Cell'

export function columnCollapse(column: Cell[][]): Cell[][] {
	const result: Cell[][] = [];

	for(let i = 0; i < column.length; i++) {
		const topCell = getTopCell(column, i);
		if (topCell == null) continue;
		const nextTopCell = getNextTopCell(column, i);

		if (nextTopCell != null && nextTopCell.cell.value === topCell.value) {
			result.push([{ ...topCell, value: topCell.value*2 }])
			i += nextTopCell.distance;
		} else {
			result.push([topCell]);
		}
	}

	const remaining = generateEmptyColumn(column.length - result.length);
	return result.concat(remaining);
}

function getTopCell(column: Cell[][], position: number): Cell | null {
	const cells = column[position];
	if (cells.length === 0) return null;
	return cells[0];
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

function generateEmptyColumn(size: number) {
	return  Array(size)
		.fill(() => [])
		.map(f => f());
}
