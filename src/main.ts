'use strict';

import config from './game/config';
import { loop } from './game/loop'
import { collapseColumn } from './game/logic/collapseColumn';
import { Cell } from './game/models/Cell';
import { increaseScore } from './game/state/game';
import { getBoard, resetBoard, getAvailablePositions, getPositionByCoordinate } from './game/state/board';

function main() {
	loop();
	restartBoard();

	window.addEventListener('keydown', (e) => {
		if (keyHandlers[e.key]) {
			keyHandlers[e.key]();
		}
	});
}

const keyHandlers: { [key: string]: () => void } = {
	ArrowUp: () => {
		const columns: {x: number, y: number}[][] = [];
		for(let x = 0; x < config.boardSize.w; x++) {
			const column: {x: number, y: number}[] = [];
			for(let y = 0; y < config.boardSize.h; y++) {
				column.push({ x, y })
			}
			columns.push(column);
		}
		collapseColumns(columns);
	},
	ArrowDown: () => {
		const columns: {x: number, y: number}[][] = [];
		for(let x = 0; x < config.boardSize.w; x++) {
			const column: {x: number, y: number}[] = [];
			for(let y = config.boardSize.h-1; y >= 0; y--) {
				column.push({ x, y })
			}
			columns.push(column);
		}
		collapseColumns(columns);
	},
	ArrowLeft: () => {
		const columns: {x: number, y: number}[][] = [];
		for(let y = 0; y < config.boardSize.h; y++) {
			const column: {x: number, y: number}[] = [];
			for(let x = 0; x < config.boardSize.w; x++) {
				column.push({ x, y })
			}
			columns.push(column);
		}
		collapseColumns(columns);
	},
	ArrowRight: () => {
		const columns: {x: number, y: number}[][] = [];
		for(let y = 0; y < config.boardSize.h; y++) {
			const column: {x: number, y: number}[] = [];
			for(let x = config.boardSize.w-1; x >= 0; x--) {
				column.push({ x, y })
			}
			columns.push(column);
		}
		collapseColumns(columns);
	}
}

function collapseColumns(columns: {x: number, y: number}[][]) {
	let changed = false;
	for(const column of columns) {
		const positions = column.map(({ x, y }) => getPositionByCoordinate(x, y));
		if (collapsePositions(positions)) changed = true;
	}
	changed && createRandomNewCell();
}

function collapsePositions(positions: number[]): boolean {
	const board = getBoard();
	const { cells: column, changed, points } = collapseColumn(positions.map(p => board[p]));
	increaseScore(points);
	for(let i = 0; i < positions.length; i++) {
		board[positions[i]] = column[i].map(c => {
			const result: Cell = {
				value: c.value,
				transitions: {
					...( c.fromValue != null ? { fromValue: { value: c.fromValue, progress: 0 } } : {} ),
					fromPosition: { position: positions[c.fromIndex], progress: 0 }
				}
			}
			return result;
		});
	}
	return changed;
}

function restartBoard() {
	resetBoard();
	createInitialCells();
}

function createInitialCells() {
	for(let i = 0; i < config.newCellsAtStart; i++) { createRandomNewCell(); }
}

function createRandomNewCell() {
	const randomAvailablePosition = getRandomAvailablePosition();
	if (randomAvailablePosition == null) return;

	getBoard()[randomAvailablePosition].push({
		value: getRandomNewCellValue(),
		transitions: {
			appear: { progress: 0 }
		}
	});
}

function getRandomNewCellValue(): number {
	const allChances = config.newCellPossibleValues
		.map((pv) => pv.chances)
		.reduce((c, v) => c + v, 0);

	let pick = Math.random() * allChances;

	let resultValue = null;
	let i = 0;
	while(resultValue === null) {
		const { value, chances } = config.newCellPossibleValues[i];
		pick = pick - chances;
		if (pick <= 0) {
			resultValue = value;
			break;
		}
		i++;
	}

	return resultValue;
}

function getRandomAvailablePosition(): number | null {
	const availablePositions = getAvailablePositions();
	if (availablePositions.length === 0) return null;
	return availablePositions[Math.floor(Math.random() * availablePositions.length)];
}

main();
