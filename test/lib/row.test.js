'use strict';

const expect = require('chai').expect;

const Cell = require('../../lib/cell.js');
const Row = require('../../lib/row.js');

describe('Row', () => {

	describe('getCellById', () => {
		
		let row;

		beforeEach(() => {
			row = new Row('some text1', 'some text2', 'some text3');
		});

		it('Should return correct cell by id in the row', () => {
			var cell = row.getCellById(0);
			expect(cell.text).to.equal('some text1');
			cell = row.getCellById(1);
			expect(cell.text).to.equal('some text2');
			cell = row.getCellById(2);
			expect(cell.text).to.equal('some text3');
		});
	});

	describe('resizeCell', () => {

		let row;

		beforeEach(() => {
			row = new Row('some text1', 'some text2', 'some text3');
		});

		afterEach(() => {
			row = null;
		});

		it('Should change current cell width to new', () => {
			
			var oldRowWidth = row.width;
			var oldCellWidth = row.cells[0].width;
			var newCellWidth = 12;
			var difference = newCellWidth - oldCellWidth;
			
			row.resizeCell(0, newCellWidth);
			
			expect(row.width).to.equal(oldRowWidth + difference);
		});

		it('Should handle cases when new cell width is lesser then '
			+ 'current cell text length', () => {

			var currentCellWidth = row.getCellById(0).text.length;
			var newCellWidth = currentCellWidth - 1;

			expect(row.resizeCell.bind(row, 0, newCellWidth)).to.throw(
				'New size could not be lesser then current '
				+ 'text length in the cell');
		});
	});

	describe('addCell', () => {

		let cell1, cell2, cell3;
		let row;

		beforeEach(() => {
			cell1 = new Cell('some text1', 1);
			cell2 = new Cell('some text2', 2);

			row = new Row();
		});

		afterEach(() => {
			cell1 = cell2 = null;
			row = null;
		});

		it('Should add cell to the end of cells set in the row', () => {
			row.addCell(cell1);
			expect(row.width - 1).to.equal(cell1.width);

			row.addCell(cell2);
			expect(row.width - 2).to.equal(cell1.width + cell2.width);
		});
	});

	describe('draw', () => {

		let cell1, cell2, cell3;
		let row;

		let resultingRow = '|Hello  |cruel |world    |\n' 
						 + '--------------------------\n';

		beforeEach(() => {
			cell1 = new Cell('Hello', 8);
			cell2 = new Cell('cruel', 7);
			cell3 = new Cell('world', 10);

			row = new Row();
			row.addCell(cell1); row.addCell(cell2); row.addCell(cell3);
		});

		afterEach(() => {
			cell1 = cell2 = cell3 = null;
			row = null;
		});

		it('Should return simle ascii table row', () => {
			expect(row.draw()).to.equal(resultingRow);
		});
	});
});
