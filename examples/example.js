'use strict'
//Substitute to your path
var Cell = require('../').Cell;
var Row = require('../').Row;
var Header = require('../').Header;
var Table = require('../').Table;

var h = new Header('#', 'Name', 'Lastname', 'Age');
var r1 = new Row('1', 'John', 'vonNeumann', '53');
var r2 = new Row('2', 'Linus', 'Torvalds', '47');
var r3 = new Row('3', 'Dennis', 'Ritchie', '70');
var r3 = new Row('4', 'John', 'McCarthy', '84');

var t = new Table();
t.setHeader(h); t.addRow(r1); t.addRow(r2); t.addRow(r3);
console.log(t.draw());