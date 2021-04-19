'use strict';

const BOARD_SIZE = { w: 4, h: 4 };
const NEW_CELL_POSSIBLE_VALUES = [
    // [value, chances]
    [2, 8],
    [4, 2]
];
const NEW_CELLS_AT_START = 2;

const cells = [];


function main() {
    restartBoard();
    render();
}

function restartBoard() {
    emptyCells();
    createInitialCells();
}

function createInitialCells() {
    for(let i = 0; i < NEW_CELLS_AT_START; i++) { createRandomNewCell(); }
}

function createRandomNewCell() {
    cells[getRandomAvailablePosition()] = {
        value: getRandomNewCellValue(),
        transitionTo: null,
        evolveTo: null
    }
}

function getRandomNewCellValue() {
    const allChances = NEW_CELL_POSSIBLE_VALUES
        .map(([_, chances]) => chances)
        .reduce((c, v) => c + v, 0);

    let pick = Math.random() * allChances;

    let resultValue = null;
    let i = 0;
    while(resultValue === null) {
        const [value, chances] = NEW_CELL_POSSIBLE_VALUES[i];
        pick = pick - chances;
        if (pick <= 0) {
            resultValue = value;
            break;
        }
        i++;
    }

    return resultValue;
}

function getRandomAvailablePosition() {
    const availablePositions = getAvailablePositions();
    if (availablePositions.length === 0) return null;
    return availablePositions[Math.floor(Math.random() * availablePositions.length)];
}

function getAvailablePositions() {
    return getPossiblePositions()
        .filter(p => !cells[p]);
}

function getPossiblePositions() {
    return Array.from(Array(getMaxPosition()).keys());
}

function getMaxPosition() {
    return BOARD_SIZE.w * BOARD_SIZE.h;
}

function emptyCells() {
    cells.splice(0, cells.length);
}

main();
