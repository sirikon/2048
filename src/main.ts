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
    for(let i = 0; i < config.newCellsAtStart; i++) { createRandomNewCell(); }
}

function createRandomNewCell() {
    const randomAvailablePosition = getRandomAvailablePosition();
    if (randomAvailablePosition == null) return;
    getCells()[randomAvailablePosition] = {
        value: getRandomNewCellValue()
    }
}

function getRandomNewCellValue(): number {
    const allChances = config.newCellPossibleValues
        .map(([_, chances]) => chances)
        .reduce((c, v) => c + v, 0);

    let pick = Math.random() * allChances;

    let resultValue = null;
    let i = 0;
    while(resultValue === null) {
        const [value, chances] = config.newCellPossibleValues[i];
        pick = pick - chances;
        if (pick <= 0) {
            resultValue = value;
            break;
        }
        i++;
    }

    return resultValue;
}

function getRandomAvailablePosition(): number | null {
    const availablePositions = getAvailablePositions();
    if (availablePositions.length === 0) return null;
    return availablePositions[Math.floor(Math.random() * availablePositions.length)];
}

main();
