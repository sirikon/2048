import { expect } from 'chai'

import config from '../../../src/game/config';
import {
	getBoard,
	getPositionByCoordinate,
	getMaxPosition,
	getAvailablePositions,
	getPossiblePositions,
	resetBoard,
	getCoordinateByPosition
} from '../../../src/game/state/board';

describe('State', () => {
	
	it('#getPositionByCoordinate', () => {
		expect(getPositionByCoordinate(0, 0)).to.equal(0);
		expect(getPositionByCoordinate(3, 0)).to.equal(3);
		expect(getPositionByCoordinate(0, 1)).to.equal(4);
		expect(getPositionByCoordinate(1, 2)).to.equal(9);
		expect(getPositionByCoordinate(3, 3)).to.equal(15);
	});

	it('#getCoordinateByPosition', () => {
		expect(getCoordinateByPosition(0)).to.deep.equal({ x: 0, y: 0 });
		expect(getCoordinateByPosition(3)).to.deep.equal({ x: 3, y: 0 });
		expect(getCoordinateByPosition(4)).to.deep.equal({ x: 0, y: 1 });
		expect(getCoordinateByPosition(9)).to.deep.equal({ x: 1, y: 2 });
		expect(getCoordinateByPosition(15)).to.deep.equal({ x: 3, y: 3 });
	})

	it('#getMaxPosition', () => {
		expect(getMaxPosition()).to.equal( (config.boardSize.h * config.boardSize.w)-1 );
	});

	it('#getPossiblePositions', () => {
		expect(getPossiblePositions()).to.deep.equal([
			0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15
		]);
	});
	
	it('#getAvailablePositions', () => {
		expect(getAvailablePositions())
			.to.deep.equal([
				0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15
			]);
		getBoard()[0].push({ value: 2, transitions: {} });
		getBoard()[15].push({ value: 2, transitions: {} });
		expect(getAvailablePositions())
			.to.deep.equal([
				1,2,3,4,5,6,7,8,9,10,11,12,13,14
			]);
		resetBoard();
		expect(getAvailablePositions())
			.to.deep.equal([
				0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15
			]);
	});
})
