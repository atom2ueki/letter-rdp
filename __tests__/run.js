/** 
 * Main test runner.
 */

const { Parser } = require('../src/Parser')
const assert = require('assert')

/**
 * List of tests.
 */
const tests = [
    require('./literals-test.js'),
    require('./statement-list-test.js'),
    require('./block-test.js'),
    require('./empty-statement-test.js'),
    require('./math-test.js'),
    require('./assignment-test.js'),
    require('./variable-test.js'),
    require('./if-test.js'),
    require('./relational-test.js')
]

const parser = new Parser()

/**
 * For manual tests.
 */
function exec() {
    const program = `
        let x = 30;
        let y = 42;
        if (x + 5 <= y * 2) {

        }
    `
    const ast = parser.parse(program)

    console.log(JSON.stringify(ast, null, 2))
}

exec()

/**
 * Test function
 */
function test(program, expected) {
    const ast = parser.parse(program)
    assert.deepEqual(ast, expected)
} 

tests.forEach(testRun => testRun(test))

console.log('All assertions passed!')
