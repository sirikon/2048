import { Cell } from './models/Cell';
import { getBoard } from './state/board'

export function update(dt: number): void {
	eachCell((cell) => {
		cycleTransition(dt, cell.transitions, 'fromValue', 0.005);
		cycleTransition(dt, cell.transitions, 'fromPosition', 0.005);
		cycleTransition(dt, cell.transitions, 'appear', 0.005);
	})
}

function eachCell(cb: (c: Cell) => void) {
	for(const tile of getBoard()) {
		for(const cell of tile) { cb(cell) }
	}
}

function cycleTransition<T extends { [key: string]: { progress: number } }>(dt: number, transitions: T, key: keyof T, speed: number) {
	if (!transitions[key]) return;
	const transition = transitions[key];
	transition.progress = between(0, transition.progress += (dt * speed), 1);
	if (transition.progress >= 1) {
		delete transitions[key];
	}
}

function between(min: number, input: number, max: number): number {
	return Math.min(max, Math.max(min, input));
}
