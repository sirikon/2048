'use strict';

import config from './game/config';
import { collapseColumn } from './game/logic/collapseColumn';
import { render } from './game/render';
import { getBoard, resetBoard, getAvailablePositions, getPositionByCoordinate } from './game/state/board';

function main() {
	restartBoard();
	render();

	window.addEventListener('keydown', (e) => {
		if (keyHandlers[e.key]) {
			keyHandlers[e.key]();
		}
	});
}

const keyHandlers: { [key: string]: () => void } = {
	ArrowUp: () => {
		for(let x = 0; x < config.boardSize.w; x++) {
			const positions = [];
			for(let y = 0; y < config.boardSize.h; y++) {
				positions.push(getPositionByCoordinate(x, y))
			}
			collapsePositions(positions);
		}
		createRandomNewCell();
		render();
	},
	ArrowDown: () => {
		for(let x = 0; x < config.boardSize.w; x++) {
			const positions = [];
			for(let y = config.boardSize.h-1; y >= 0; y--) {
				positions.push(getPositionByCoordinate(x, y))
			}
			collapsePositions(positions);
		}
		createRandomNewCell();
		render();
	},
	ArrowLeft: () => {
		for(let y = 0; y < config.boardSize.h; y++) {
			const positions = [];
			for(let x = 0; x < config.boardSize.w; x++) {
				positions.push(getPositionByCoordinate(x, y))
			}
			collapsePositions(positions);
		}
		createRandomNewCell();
		render();
	},
	ArrowRight: () => {
		for(let y = 0; y < config.boardSize.h; y++) {
			const positions = [];
			for(let x = config.boardSize.w-1; x >= 0; x--) {
				positions.push(getPositionByCoordinate(x, y))
			}
			collapsePositions(positions);
		}
		createRandomNewCell();
		render();
	}
}

function collapsePositions(positions: number[]) {
	const board = getBoard();
	const column = collapseColumn(positions.map(p => board[p]));
	for(let i = 0; i < positions.length; i++) {
		board[positions[i]] = column[i];
	}
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
		value: getRandomNewCellValue()
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
