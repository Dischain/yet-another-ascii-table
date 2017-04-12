'use strict';

const expect = require('chai').expect;

const Cell = require('../../lib/cell.js');

describe('Cell', () => {

	describe('_countSpacing', () => {

		let cell1, cell2, cell3, cell4;

		beforeEach(() => { 
			cell1 = new Cell('some text', -1);
			cell2 = new Cell('some text', 5);
			cell3 = new Cell('some text  ', 20);
			cell4 = new Cell('   some text', 20);
		});

		afterEach(() => { 
			cell1 = cell2 =cell3 = cell4 = null;
		});

		it('Should return length of the white space between end of text in '
			+ 'the cell and the end of cell vertical separator', () => {

			expect(cell1._countSpacing()).to.equal(0);
			expect(cell2._countSpacing()).to.equal(0);
			expect(cell3._countSpacing()).to.equal(9);
			expect(cell4._countSpacing()).to.equal(8);
		});	
	});

	describe('draw', () => {

		let cell1, cell2, cell3, cell4;

		beforeEach(() => { 
			cell1 = new Cell('some text', -1);
			cell2 = new Cell('some text', 5);
			cell3 = new Cell('some text  ', 20);
			cell4 = new Cell('   some text', 20);
		});

		afterEach(() => { 
			cell1 = cell2 =cell3 = cell4 = null;
		});

		it('Should return a simple ascii cell representation', () => {
			expect(cell1.draw()).to.equal('some text|');
			expect(cell2.draw()).to.equal('some text|');
			expect(cell3.draw()).to.equal('some text          |');
			expect(cell4.draw()).to.equal('   some text       |');
		});
	});

	describe('set width', () => {

		let cell1, cell2;

		beforeEach(() => { 
			cell1 = new Cell('some text', -1);
			cell2 = new Cell('some text', 5);
		});

		afterEach(() => { 
			cell1 = cell2 = null;
		});

		it('Should handle cases, when passed width value lesser than text length '
			+ 'and sets cell width to default value, which equals to text length ',
			() => {
				expect(cell1.width).to.equal(cell1.text.length);
				expect(cell2.width).to.equal(cell2.text.length);				
		});
	});
});