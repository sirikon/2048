import { expect } from 'chai'

import { collapseColumn, CollapsedCell } from '../../../src/game/logic/collapseColumn'
import { BaseCell } from '../../../src/game/models/Cell';

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
			[{ value: 2, fromIndex: 0 }], [], [], []
		])
	});

	it('should work with moving single cells', () => {
		assertColumnCollapse([
			[{ value: 2 }], [], [], []
		], [
			[{ value: 2, fromIndex: 0 }], [], [], []
		])

		assertColumnCollapse([
			[], [{ value: 2 }], [], []
		], [
			[{ value: 2, fromIndex: 1 }], [], [], []
		])

		assertColumnCollapse([
			[], [], [], [{ value: 2 }]
		], [
			[{ value: 2, fromIndex: 3 }], [], [], []
		])
	});

	it('should work with moving multiple cells', () => {
		assertColumnCollapse([
			[{ value: 2 }], [{ value: 4 }], [], []
		], [
			[{ value: 2, fromIndex: 0 }], [{ value: 4, fromIndex: 1 }], [], []
		])

		assertColumnCollapse([
			[{ value: 2 }], [], [], [{ value: 4 }]
		], [
			[{ value: 2, fromIndex: 0 }], [{ value: 4, fromIndex: 3 }], [], []
		])

		assertColumnCollapse([
			[], [{ value: 2 }], [], [{ value: 4 }]
		], [
			[{ value: 2, fromIndex: 1 }], [{ value: 4, fromIndex: 3 }], [], []
		])

		assertColumnCollapse([
			[], [], [{ value: 2 }], [{ value: 4 }]
		], [
			[{ value: 2, fromIndex: 2 }], [{ value: 4, fromIndex: 3 }], [], []
		])
	});

	it('shold work with combining cells', () => {
		assertColumnCollapse([
			[{ value: 2 }], [{ value: 2 }], [], []
		], [
			[{ value: 4, fromIndex: 0, fromValue: 2 }, { value: 2, fromIndex: 1 }], [], [], []
		])

		assertColumnCollapse([
			[], [], [{ value: 2 }], [{ value: 2 }]
		], [
			[{ value: 4, fromIndex: 2, fromValue: 2 }, { value: 2, fromIndex: 3 }], [], [], []
		])

		assertColumnCollapse([
			[{ value: 2 }], [], [], [{ value: 2 }]
		], [
			[{ value: 4, fromIndex: 0, fromValue: 2 }, { value: 2, fromIndex: 3 }], [], [], []
		])

		assertColumnCollapse([
			[{ value: 2 }], [], [{ value: 4 }], [{ value: 2 }]
		], [
			[{ value: 2, fromIndex: 0 }], [{ value: 4, fromIndex: 2 }], [{ value: 2, fromIndex: 3 }], []
		])
	});

	it('shold work with combining multiple cells', () => {
		assertColumnCollapse([
			[{ value: 2 }], [{ value: 2 }], [{ value: 2 }], [{ value: 2 }]
		], [
			[{ value: 4, fromIndex: 0, fromValue: 2 }, { value: 2, fromIndex: 1 }], [{ value: 4, fromIndex: 2, fromValue: 2 }, { value: 2, fromIndex: 3 }], [], []
		])
	});

	it('shold work with combining and moving cells', () => {
		assertColumnCollapse([
			[], [{ value: 4 }], [{ value: 2 }], [{ value: 2 }]
		], [
			[{ value: 4, fromIndex: 1 }], [{ value: 4, fromIndex: 2, fromValue: 2 }, { value: 2, fromIndex: 3 }], [], []
		])

		assertColumnCollapse([
			[], [{ value: 2 }], [{ value: 2 }], [{ value: 4 }]
		], [
			[{ value: 4, fromIndex: 1, fromValue: 2 }, { value: 2, fromIndex: 2 }], [{ value: 4, fromIndex: 3 }], [], []
		])
	});

})

function assertColumnCollapse(input: BaseCell[][], output: CollapsedCell[][]) {
	expect(collapseColumn(input)).to.deep.equal(output);
}
