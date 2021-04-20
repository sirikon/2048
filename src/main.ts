'use strict';

import config from './game/config'
import { render } from './game/render';
import { getCells, emptyCells, getAvailablePositions } from './game/state';


function main() {
    restartBoard();
    render();
}

function restartBoard() {
    emptyCells();
    createInitialCells();
}

function createInitialCells() {
    for(let i = 0; i < config.NEW_CELLS_AT_START; i++) { createRandomNewCell(); }
}

function createRandomNewCell() {
    getCells()[getRandomAvailablePosition()] = {
        value: getRandomNewCellValue(),
        transitionTo: null,
        evolveTo: null
    }
}

function getRandomNewCellValue() {
    const allChances = config.NEW_CELL_POSSIBLE_VALUES
        .map(([_, chances]) => chances)
        .reduce((c, v) => c + v, 0);

    let pick = Math.random() * allChances;

    let resultValue = null;
    let i = 0;
    while(resultValue === null) {
        const [value, chances] = config.NEW_CELL_POSSIBLE_VALUES[i];
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

main();
