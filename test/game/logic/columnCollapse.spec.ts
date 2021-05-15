import { expect } from 'chai'

import { collapseColumn } from '../../../src/game/logic/collapseColumn'
import Cell from '../../../src/game/models/Cell';

describe('Column Collapse', () => {
	
	it('should work with empty columns', () => {
		assertColumnCollapse([], [])
		assertColumnCollapse([
			[], [], [], []
		], [
			[], [], [], []
		])
	});

	it('should work with cells', () => {
		assertColumnCollapse([
			[{ value: 2 }], [], [], []
		], [
			[{ value: 2 }], [], [], []
		])
	});

	it('should work with moving single cells', () => {
		assertColumnCollapse([
			[{ value: 2 }], [], [], []
		], [
			[{ value: 2 }], [], [], []
		])

		assertColumnCollapse([
			[], [{ value: 2 }], [], []
		], [
			[{ value: 2 }], [], [], []
		])

		assertColumnCollapse([
			[], [], [], [{ value: 2 }]
		], [
			[{ value: 2 }], [], [], []
		])
	});

	it('should work with moving multiple cells', () => {
		assertColumnCollapse([
			[{ value: 2 }], [{ value: 4 }], [], []
		], [
			[{ value: 2 }], [{ value: 4 }], [], []
		])

		assertColumnCollapse([
			[{ value: 2 }], [], [], [{ value: 4 }]
		], [
			[{ value: 2 }], [{ value: 4 }], [], []
		])

		assertColumnCollapse([
			[], [{ value: 2 }], [], [{ value: 4 }]
		], [
			[{ value: 2 }], [{ value: 4 }], [], []
		])

		assertColumnCollapse([
			[], [], [{ value: 2 }], [{ value: 4 }]
		], [
			[{ value: 2 }], [{ value: 4 }], [], []
		])
	});

	it('shold work with combining cells', () => {
		assertColumnCollapse([
			[{ value: 2 }], [{ value: 2 }], [], []
		], [
			[{ value: 4 }], [], [], []
		])

		assertColumnCollapse([
			[], [], [{ value: 2 }], [{ value: 2 }]
		], [
			[{ value: 4 }], [], [], []
		])

		assertColumnCollapse([
			[{ value: 2 }], [], [], [{ value: 2 }]
		], [
			[{ value: 4 }], [], [], []
		])

		assertColumnCollapse([
			[{ value: 2 }], [], [{ value: 4 }], [{ value: 2 }]
		], [
			[{ value: 2 }], [{ value: 4 }], [{ value: 2 }], []
		])
	});

	it('shold work with combining multiple cells', () => {
		assertColumnCollapse([
			[{ value: 2 }], [{ value: 2 }], [{ value: 2 }], [{ value: 2 }]
		], [
			[{ value: 4 }], [{ value: 4 }], [], []
		])
	});

	it('shold work with combining and moving cells', () => {
		assertColumnCollapse([
			[], [{ value: 4 }], [{ value: 2 }], [{ value: 2 }]
		], [
			[{ value: 4 }], [{ value: 4 }], [], []
		])

		assertColumnCollapse([
			[], [{ value: 2 }], [{ value: 2 }], [{ value: 4 }]
		], [
			[{ value: 4 }], [{ value: 4 }], [], []
		])
	});

})

function assertColumnCollapse(input: Cell[][], output: Cell[][]) {
	expect(collapseColumn(input)).to.deep.equal(output);
}
