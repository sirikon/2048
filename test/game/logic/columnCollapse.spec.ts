import { expect } from 'chai'

import { collapseColumn, CollapsedCell } from '../../../src/game/logic/collapseColumn'
import { BaseCell } from '../../../src/game/models/Cell';

describe('Column Collapse', () => {
	
	it('should work with empty columns', () => {
		assertColumnCollapse([], [], false)
		assertColumnCollapse([
			[], [], [], []
		], [
			[], [], [], []
		], false)
	});

	it('should work with cells', () => {
		assertColumnCollapse([
			[{ value: 2 }], [], [], []
		], [
			[{ value: 2, fromIndex: 0 }], [], [], []
		], false)
	});

	it('should work with moving single cells', () => {
		assertColumnCollapse([
			[{ value: 2 }], [], [], []
		], [
			[{ value: 2, fromIndex: 0 }], [], [], []
		], false)

		assertColumnCollapse([
			[], [{ value: 2 }], [], []
		], [
			[{ value: 2, fromIndex: 1 }], [], [], []
		], true)

		assertColumnCollapse([
			[], [], [], [{ value: 2 }]
		], [
			[{ value: 2, fromIndex: 3 }], [], [], []
		], true)
	});

	it('should work with moving multiple cells', () => {
		assertColumnCollapse([
			[{ value: 2 }], [{ value: 4 }], [], []
		], [
			[{ value: 2, fromIndex: 0 }], [{ value: 4, fromIndex: 1 }], [], []
		], false)

		assertColumnCollapse([
			[{ value: 2 }], [], [], [{ value: 4 }]
		], [
			[{ value: 2, fromIndex: 0 }], [{ value: 4, fromIndex: 3 }], [], []
		], true)

		assertColumnCollapse([
			[], [{ value: 2 }], [], [{ value: 4 }]
		], [
			[{ value: 2, fromIndex: 1 }], [{ value: 4, fromIndex: 3 }], [], []
		], true)

		assertColumnCollapse([
			[], [], [{ value: 2 }], [{ value: 4 }]
		], [
			[{ value: 2, fromIndex: 2 }], [{ value: 4, fromIndex: 3 }], [], []
		], true)
	});

	it('shold work with combining cells', () => {
		assertColumnCollapse([
			[{ value: 2 }], [{ value: 2 }], [], []
		], [
			[{ value: 4, fromIndex: 0, fromValue: 2 }, { value: 2, fromIndex: 1 }], [], [], []
		], true)

		assertColumnCollapse([
			[], [], [{ value: 2 }], [{ value: 2 }]
		], [
			[{ value: 4, fromIndex: 2, fromValue: 2 }, { value: 2, fromIndex: 3 }], [], [], []
		], true)

		assertColumnCollapse([
			[{ value: 2 }], [], [], [{ value: 2 }]
		], [
			[{ value: 4, fromIndex: 0, fromValue: 2 }, { value: 2, fromIndex: 3 }], [], [], []
		], true)

		assertColumnCollapse([
			[{ value: 2 }], [], [{ value: 4 }], [{ value: 2 }]
		], [
			[{ value: 2, fromIndex: 0 }], [{ value: 4, fromIndex: 2 }], [{ value: 2, fromIndex: 3 }], []
		], true)
	});

	it('shold work with combining multiple cells', () => {
		assertColumnCollapse([
			[{ value: 2 }], [{ value: 2 }], [{ value: 2 }], [{ value: 2 }]
		], [
			[{ value: 4, fromIndex: 0, fromValue: 2 }, { value: 2, fromIndex: 1 }], [{ value: 4, fromIndex: 2, fromValue: 2 }, { value: 2, fromIndex: 3 }], [], []
		], true)
	});

	it('shold work with combining and moving cells', () => {
		assertColumnCollapse([
			[], [{ value: 4 }], [{ value: 2 }], [{ value: 2 }]
		], [
			[{ value: 4, fromIndex: 1 }], [{ value: 4, fromIndex: 2, fromValue: 2 }, { value: 2, fromIndex: 3 }], [], []
		], true)

		assertColumnCollapse([
			[], [{ value: 2 }], [{ value: 2 }], [{ value: 4 }]
		], [
			[{ value: 4, fromIndex: 1, fromValue: 2 }, { value: 2, fromIndex: 2 }], [{ value: 4, fromIndex: 3 }], [], []
		], true)
	});

})

function assertColumnCollapse(input: BaseCell[][], output: CollapsedCell[][], shouldChange: boolean) {
	const { cells, changed } = collapseColumn(input);
	expect(cells).to.deep.equal(output);
	expect(changed).to.equal(shouldChange, 'Column should change');
}
