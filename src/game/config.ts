import Config from './models/Config';

const config: Config = {
	boardSize: { w: 4, h: 4 },
	newCellPossibleValues: [
		{ value: 2, chances: 8 },
		{ value: 4, chances: 2 },
	],
	newCellsAtStart: 2,
}

export default config;
