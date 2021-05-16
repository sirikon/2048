import config from './config';
import { Cell } from './models/Cell';
import { getBoard, getCoordinateByPosition, getPositionByCoordinate } from './state/board';

const tileGridSize = { border: 10 };

const tileColors: { [key: number]: string } = {
	2: '245, 245, 220',
	4: '245, 245, 220',
	8: '245, 245, 220',
	16: '245, 245, 220',
	32: '245, 245, 220',
	64: '245, 245, 220',
	128: '245, 245, 220',
	256: '245, 245, 220',
	512: '245, 245, 220',
	1024: '245, 245, 220',
	2048: '245, 245, 220'
}

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

export function render(): void {
	
	const tileSize = {
		w: ( (canvas.width - (tileGridSize.border * (config.boardSize.w + 1))) / config.boardSize.w),
		h: ( (canvas.height - (tileGridSize.border * (config.boardSize.h + 1))) / config.boardSize.h),
	};
	const textSize = 38 * window.devicePixelRatio;
	clearCanvas();
	const board = getBoard();
	for(let y = 0; y < config.boardSize.h; y++) {
		for(let x = 0; x < config.boardSize.w; x++) {
			const position = getPositionByCoordinate(x, y);
			const cells = board[position];
			if (cells.length === 0) continue;

			for(let z = cells.length-1; z >= 0; z--) {
				const cell = cells[z];
				const { tileX, tileY } = getCellRenderPosition(cell, x, y);
				
				ctx.fillStyle = getCellBackgroundColor(cell);
				ctx.fillRect(tileX, tileY, tileSize.w, tileSize.h);

				const tileTextX = tileX + (tileSize.w / 2);
				const tileTextY = tileY + (tileSize.h / 2);

				ctx.fillStyle = getCellTextColor(cell);
				ctx.font = `${textSize}px Arial`;
				ctx.textBaseline = 'middle';
				ctx.textAlign = 'center';
				ctx.fillText(cell.value.toString(), tileTextX, tileTextY, tileSize.w);
			}
		}
	}
}

function getCellRenderPosition(cell: Cell, x: number, y: number): { tileX: number, tileY: number } {
	const { tileX, tileY } = getTilePositionByCoordinate(x, y);

	if (cell.transitions?.fromPosition == null) {
		return { tileX, tileY };
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const progress = cell.transitions!.fromPosition!.progress;
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const fromCoordinates = getCoordinateByPosition(cell.transitions!.fromPosition!.position);
	const fromTile = getTilePositionByCoordinate(fromCoordinates.x, fromCoordinates.y);

	return {
		tileX: linear(fromTile.tileX, tileX, progress),
		tileY: linear(fromTile.tileY, tileY, progress),
	}
}

function getCellBackgroundColor(cell: Cell): string {
	const progress = cell.transitions?.appear
		? cell.transitions.appear.progress
		: 1;
	const color = tileColors[Math.min(cell.value, 2048)];
	return `rgba(${color}, ${Math.max(linear(-1, 1, progress), 0)})`;
}

function getCellTextColor(cell: Cell): string {
	const progress = cell.transitions?.appear
		? cell.transitions.appear.progress
		: 1;
	return `rgba(0, 0, 0, ${Math.max(linear(-1, 1, progress), 0)})`;
}

function linear(from: number, to: number, progress: number) {
	return from + ((to-from) * progress);
}

function getTilePositionByCoordinate(x: number, y: number): { tileX: number, tileY: number } {
	const tileSize = getTileSize();
	const tileX = (tileSize.w * x) + (tileGridSize.border * (x+1));
	const tileY = (tileSize.h * y) + (tileGridSize.border * (y+1));
	return { tileX, tileY };
}

function getTileSize() {
	return {
		w: ( (canvas.width - (tileGridSize.border * (config.boardSize.w + 1))) / config.boardSize.w),
		h: ( (canvas.height - (tileGridSize.border * (config.boardSize.h + 1))) / config.boardSize.h),
	};
}

function setupCanvas() {
	const canvasSize = { w: 500, h: 500 };
	canvas = document.getElementById('game') as HTMLCanvasElement;
	canvas.width = canvasSize.w * window.devicePixelRatio;
	canvas.height = canvasSize.h * window.devicePixelRatio;
	canvas.style.width = canvasSize.w + 'px';
	canvas.style.height = canvasSize.h + 'px';
	ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function listenResize() {
	window.addEventListener('resize', () => {
		setupCanvas();
		render();
	});
}

listenResize();
setupCanvas();
