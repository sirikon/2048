import config from './config';
import { getBoard, getPositionByCoordinate } from './state/board';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

export function render(): void {
	const tileGridSize = { border: 10 };
	const tileSize = {
		w: ( (canvas.width - (tileGridSize.border * (config.boardSize.w + 1))) / config.boardSize.w),
		h: ( (canvas.height - (tileGridSize.border * (config.boardSize.h + 1))) / config.boardSize.h),
	};
	clearCanvas();
	const board = getBoard();
	for(let y = 0; y < config.boardSize.h; y++) {
		for(let x = 0; x < config.boardSize.w; x++) {
			const position = getPositionByCoordinate(x, y);
			const cells = board[position];
			if (cells.length === 0) continue;

			const value = cells[0].value;

			const tileX = (tileSize.w * x) + (tileGridSize.border * (x+1));
			const tileY = (tileSize.h * y) + (tileGridSize.border * (y+1));
			
			ctx.fillStyle = 'beige';
			ctx.fillRect(tileX, tileY, tileSize.w, tileSize.h);

			const tileTextX = tileX + (tileSize.w / 2);
			const tileTextY = tileY + (tileSize.h / 2);

			ctx.fillStyle = 'black';
			ctx.font = '38px Arial';
			ctx.textBaseline = 'middle';
			ctx.textAlign = 'center';
			ctx.fillText(value.toString(), tileTextX, tileTextY, tileSize.w);
		}
	}
}

function setupCanvas() {
	const canvasSize = { w: 500, h: 500 };
	canvas = document.getElementById('game') as HTMLCanvasElement;
	canvas.width = canvasSize.w;
	canvas.height = canvasSize.h;
	ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

setupCanvas();
