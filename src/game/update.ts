import { getBoard } from './state/board'

export function update(deltaTime: number): void {
	const board = getBoard();

	for(const tile of board) {
		for(const cell of tile) {
			if (cell.transitions) {

				if (cell.transitions.fromValue) {
					cell.transitions.fromValue.progress = between(0, cell.transitions.fromValue.progress += (deltaTime * 0.005), 1)
					if (cell.transitions.fromValue.progress === 1) delete cell.transitions.fromValue;
				}

				if (cell.transitions.fromPosition) {
					cell.transitions.fromPosition.progress = between(0, cell.transitions.fromPosition.progress += (deltaTime * 0.005), 1);
					if (cell.transitions.fromPosition.progress === 1) delete cell.transitions.fromPosition;
				}

				if (cell.transitions.appear) {
					cell.transitions.appear.progress = between(0, cell.transitions.appear.progress += (deltaTime * 0.005), 1);
					if (cell.transitions.appear.progress === 1) delete cell.transitions.appear;
				}

			}
		}
	}
}

function between(min: number, input: number, max: number): number {
	return Math.min(max, Math.max(min, input));
}
