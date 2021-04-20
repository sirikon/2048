import config from './config';

const cells = [];

export function getCells() {
    return cells;
}

export function getPositionByCoordinate(x, y) {
    return x + (y * config.BOARD_SIZE.w);
}

export function getAvailablePositions() {
    return getPossiblePositions()
        .filter(p => !cells[p]);
}

export function getPossiblePositions() {
    return Array.from(Array(getMaxPosition()).keys());
}

export function getMaxPosition() {
    return config.BOARD_SIZE.w * config.BOARD_SIZE.h;
}

export function emptyCells() {
    cells.splice(0, cells.length);
}
