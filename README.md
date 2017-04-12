# yet-another-ascii-table

[yet-another-ascii-table](https://github.com/Dischain/yet-another-ascii-table) is a simple and small utility for printing ASCII tables.

## Quick start

### Installing

I did not published it with `npm`, so if you want to try, just copy `export/lib/` folder into your project and rename it as you want. 

### Example

Then you can write something like this:

```javascript
var Cell = require('./yet-another-ascii-table').Cell;
var Row = require('./yet-another-ascii-table').Row;
var Header = require('./yet-another-ascii-table').Header;
var Table = require('./yet-another-ascii-table').Table;

var h = new Header('#', 'Sity', 'Population', 'Area, sq km');
var r1 = new Row('1', 'Simeropol', '333 317', '107');
var r2 = new Row('2', 'Saint Petersburg', '5 323 300', '1 439');
var r3 = new Row('3', 'Moscow', '13 197 596', '2 511');
var t = new Table();

t.setHeader(h); t.addRow(r1); t.addRow(r2); t.addRow(r3);

console.log(t.draw());
```
This will output simle ASCII table:

```
-------------------------------------------
|#|Sity            |Population|Area, sq km|
-------------------------------------------
|1|Simeropol       |333 317   |107        |
-------------------------------------------
|2|Saint Petersburg|5 323 300 |1 439      |
-------------------------------------------
|3|Moscow          |13 197 596|2 511      |
-------------------------------------------
```
Also you can find an examples in `examples` directory

## Testing

### Mocha tests

To run automated unit tests, just print in your terminal
```
npm test
```

### Linting

To run code linting with [jshint](https://github.com/jshint/jshint), simple print
```
npm run lint
```
This would invoke `shell` script, which lints all `.js` files in root directory recursively, excepting files, located in the `node_modules` directory.