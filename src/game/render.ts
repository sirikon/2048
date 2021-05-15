import config from './config';
import { getBoard, getPositionByCoordinate } from './state/board';

export function render(): void {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const gameElement = document.getElementById('game')!;
	gameElement.innerHTML = '';
	const board = getBoard();

	for(let y = 0; y < config.boardSize.h; y++) {
		const row = document.createElement('div');
		for(let x = 0; x < config.boardSize.w; x++) {
			const i = getPositionByCoordinate(x, y);
			const cell = document.createElement('div');
			cell.classList.add('cell');

			cell.textContent = board[i] && board[i].length > 0
				? board[i][0].value.toString()
				: '';

			row.appendChild(cell);
		}
		gameElement.appendChild(row);
	}
}
