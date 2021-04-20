import config from './config';
import { getCells, getPositionByCoordinate } from './state';

export function render() {
    const gameElement = document.getElementById('game');
    gameElement.innerHTML = '';
    const cells = getCells();

    for(let y = 0; y < config.BOARD_SIZE.h; y++) {
        const row = document.createElement('div');
        for(let x = 0; x < config.BOARD_SIZE.w; x++) {
            const i = getPositionByCoordinate(x, y);
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = cells[i] ? cells[i].value : '';
            row.appendChild(cell);
        }
        gameElement.appendChild(row);
    }
}
