function render() {
    const gameElement = document.getElementById('game');
    gameElement.innerHTML = '';

    for(let y = 0; y < BOARD_SIZE.h; y++) {
        const row = document.createElement('div');
        for(let x = 0; x < BOARD_SIZE.w; x++) {
            const i = x + (y * BOARD_SIZE.w);
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = cells[i] ? cells[i].value : '';
            row.appendChild(cell);
        }
        gameElement.appendChild(row);
    }
}
