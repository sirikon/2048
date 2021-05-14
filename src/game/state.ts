import config from './config';
import Cell from './models/Cell';

const cells = new Array<Cell>();

export function getCells(): Cell[] {
	return cells;
}

export function getPositionByCoordinate(x: number, y: number): number {
	return x + (y * config.boardSize.w);
}

export function getAvailablePositions(): number[] {
	return getPossiblePositions()
		.filter(p => !cells[p]);
}

export function getPossiblePositions(): number[] {
	return Array.from(Array(getMaxPosition()).keys());
}

export function getMaxPosition(): number {
	return config.boardSize.w * config.boardSize.h;
}

export function emptyCells(): void {
	cells.splice(0, cells.length);
}
