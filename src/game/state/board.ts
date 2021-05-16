import config from '../config';
import { Cell } from '../models/Cell';

const board: Cell[][] = [];

export function getBoard(): Cell[][] {
	return board;
}

export function getPositionByCoordinate(x: number, y: number): number {
	return x + (y * config.boardSize.w);
}

export function getCoordinateByPosition(position: number): { x: number, y: number } {
	if (position === 0) { return { x: 0, y: 0 } }
	const x = position % config.boardSize.w;
	const y = Math.floor(position / config.boardSize.w);
	return { x, y };
}

export function getAvailablePositions(): number[] {
	return board
		.reduce((positions, cells, position) => {
			if (cells.length === 0) return positions.concat([position]);
			return positions;
		}, new Array<number>());
}

export function getPossiblePositions(): number[] {
	return board
		.map((_, position) => position);
}

export function getMaxPosition(): number {
	return board.length-1;
}

export function resetBoard(): void {
	board.splice(0, board.length);
	board.push(...Array(config.boardSize.h * config.boardSize.w)
		.fill(() => [])
		.map(f => f()));
}

resetBoard();
