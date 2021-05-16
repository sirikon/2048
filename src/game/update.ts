import { getBoard } from './state/board'

export function update(dt: number): void {
	const board = getBoard();
	for(const tile of board) {
		for(const cell of tile) {
			if (cell.transitions) {
				cycleTransition(dt, cell.transitions, 'fromValue', 0.005);
				cycleTransition(dt, cell.transitions, 'fromPosition', 0.005);
				cycleTransition(dt, cell.transitions, 'appear', 0.005);
			}
		}
	}
}

function cycleTransition<T extends { [key: string]: { progress: number } }>(dt: number, transitions: T, key: keyof T, speed: number) {
	if (!transitions[key]) return;
	transitions[key].progress = between(0, transitions[key].progress += (dt * speed), 1);
	if (transitions[key].progress >= 1) {
		delete transitions[key];
	}
}

function between(min: number, input: number, max: number): number {
	return Math.min(max, Math.max(min, input));
}
