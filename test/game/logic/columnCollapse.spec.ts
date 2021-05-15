import { expect } from 'chai'

import { columnCollapse } from '../../../src/game/logic/columnCollapse'

describe('Collumn Collapse', () => {
	
	it('should work', () => {
		expect(columnCollapse([])).to.deep.equal([]);
	});

})
