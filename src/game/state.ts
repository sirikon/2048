import config from './config';

export interface Cell {
    value: number
}

const cells = new Array<Cell>();

export function getCells() {
    return cells;
}

export function getPositionByCoordinate(x: number, y: number) {
    return x + (y * config.boardSize.w);
}

export function getAvailablePositions() {
    return getPossiblePositions()
        .filter(p => !cells[p]);
}

export function getPossiblePositions() {
    return Array.from(Array(getMaxPosition()).keys());
}

export function getMaxPosition() {
    return config.boardSize.w * config.boardSize.h;
}

export function emptyCells() {
    cells.splice(0, cells.length);
}
