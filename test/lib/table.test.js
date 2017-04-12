'use strict'

const expect = require('chai').expect;

const Cell = require('../../lib/cell.js');
const Row = require('../../lib/row.js');
const Table = require('../../lib/table.js');
const Header = require('../../lib/header.js');

describe('Table', () => {

	describe('addRow', () => {

		let cell, cell2, cell3;
		let row, row1, header;
		let table;

		beforeEach(() => {
			cell = new Cell('some data', 0);
			cell2 = new Cell('some data', 0);
			cell3 = new Cell('some data', 0);

			header = new Header();

			row = new Row();
			table = new Table();
		});

		afterEach(() => {
			cell = cell2 = cell3 = null;
			row = row1 = header = null;
			table = null;
		})

		it('Should handle cases when addtable.addRow(row1);ing row countains lesser or '
			+ 'greater amount of cells then header cells amount', () => {

			header.addCell(cell); header.addCell(cell2);
			row.addCell(cell);
			table.setHeader(header);
			expect(table.addRow.bind(table, row)).to.throw('The amount of cells at row must '
				+ 'be equal to header cells amount');
		});

		it('Should handle cases when adding row before header set. '
			+ 'Must throw Error', () => {

			row.addCell(cell);
			expect(table.addRow.bind(table, row)).to.throw('Can not to add row into the table '
				+ 'without header');
		});

		it('Should handle cases when adding row contains any cell with size '
			+ 'lesse or greater then table`s max cells sizes', () => {

			let c1 = new Cell('#', 0);
			let c2 = new Cell('Name', 0);
			let c3 = new Cell('LastName', 0);

			header.addCell(c1); header.addCell(c2); header.addCell(c3); //->[1, 4, 8]

			let row1 = new Row('10', 'Peter', 'Jacks'); //->[2, 5, 5]
			let row2 = new Row('1', 'Peterdffdsf', 'Jon'); //->[1, 11, 3]
			let row3 = new Row('100', 'Peterdffd', 'Jon232323232322323'); //->[3, 9, 18]
			let row4 = new Row('2', 'ada', 'ddd');

			table.setHeader(header);

			table.addRow(row1);
			expect(table.maxCellsWidthes).to.eql([2, 5, 8]);

			table.addRow(row2);
			expect(table.maxCellsWidthes).to.eql([2, 11, 8])
			
			table.addRow(row3);
			expect(table.maxCellsWidthes).to.eql([3, 11, 18]);

			table.addRow(row4);
			expect(table.maxCellsWidthes).to.eql([3, 11, 18]);

			console.log(table.draw());
		});
	});

	describe('setHeader', () => {

		let cell = new Cell('some data', 0);
		let header = new Header(); header.addCell(cell);
		let table = new Table();
		table.setHeader(header);

		it('Should handle cases when adding new header and the header in table exists', () => {
			expect(table.setHeader.bind(table, header)).to.throw(
				'Can not set up new header when it`s exists');
		});
	});

	describe('_calculateMaxCellsWidth', () => {

		let cell1, cell2, cell3, cell4;
		let header, row1, row2, table;

		beforeEach(() => {
			cell1 = new Cell('hello', 0);
			cell2 = new Cell('my', 0);
			cell3 = new Cell('friend', 0);
			cell4 = new Cell('dear', 0);

			header = new Header('hello', 'my', 'friend');
			row1 = new Row('hello', 'my', 'friend');
			row2 = new Row('hello', 'dear', 'friend');

			table = new Table();
			table.setHeader(header);
			table.addRow(row1);
		});

		it('Should handle cases when maximum cells widthes changes after '
			+ 'adding row with bigger sizes of cells', () => {

			let currentMaxCellsWidth = [cell1.width, cell2.width, cell3.width];
			expect(table.maxCellsWidthes).to.eql(currentMaxCellsWidth);

			let newMaxCellsWidth = [cell1.width, cell4.width, cell3.width];
			table.addRow(row2);
			expect(table.maxCellsWidthes).to.eql(newMaxCellsWidth);	
		});
	});

	describe('_calculateMaxRowWidth', () => {

		let cell1, cell2, cell3, cell4;
		let row1, row2, table, header;

		beforeEach(() => {
			cell1 = new Cell('hello', 0);
			cell2 = new Cell('my', 0);
			cell3 = new Cell('friend', 0);
			cell4 = new Cell('dear', 0);

			header = new Header('hello', 'my', 'friend');
			row1 = new Row('hello', 'my', 'friend');
			row2 = new Row('hello', 'dear', 'friend');

			table = new Table();
			table.setHeader(header);
			table.addRow(row1);
		});		

		it('Should handle cases when maximum rows wids changes after '
			+ 'adding row with bigger width', () => {

				expect(table.maxRowWidth).to.equal(row1.width);

				let newMaxRowWidth = row2.width;
				table.addRow(row2);

				expect(table.maxRowWidth).to.equal(row2.width);
			})
	})
})