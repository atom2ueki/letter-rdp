/**
 * Tokenizer class.
 *
 * Lazily pulls a token from a string.
 */

const Spec = [

	// comments
	[/^\/\/.*/, null],
	// multi-line comments, \** ... *\
	[/^\/\*[\s\S]*?\*\//, null],

	// Whitespace
	[/^\s+/, null],

	// Symbols, delimiters
	[/^;/, ';'],
	[/^\{/, '{'],
	[/^\}/, '}'],
	[/^\(/, '('],
	[/^\)/, ')'],

	// Numbers
	[/^\d+/, 'NUMBER'],

	// Identifiers
	[/^\w+/, 'IDENTIFIER'],

	// Assignment operators ->
	// =, *=, /=, +=. -=
	[/^=/, 'SIMPLE_ASSIGN'],
	[/^[\*\/\+\-]=/, 'COMPLEX_ASSIGN'],

	// Strings
	[/^"[^"]*"/, 'STRING'],
	[/^'[^']*'/, 'STRING'],

	// operators +, -, *, /
	[/^[+\-]/, 'ADDITIVE_OPERATOR'],
	[/^[*\/]/, 'MULTIPLICATIVE_OPERATOR'],
]

class Tokenizer {
	init(string) {
		this._string = string
		this._cursor = 0
	}

	isEOF() {
		return this._cursor == this._string.length
	}

	/**
	 * Whether we still has more tokens
	 */
	hasMoreTokens() {
		return this._cursor < this._string.length
	}

	/**
	 * Obtain next token.
	 */
	getNextToken() {
		if (!this.hasMoreTokens()) {
			return null
		}

		const string = this._string.slice(this._cursor)

		for (const [regexp, tokenType] of Spec) {
			const tokenValue = this._match(regexp, string)

			// no match found
			if (tokenValue == null) {
				continue
			}

			// skip whitespace
			if (tokenType == null) {
				return this.getNextToken()
			}

			// finally return the structure.
			return {
				type: tokenType,
				value: tokenValue
			}
		}

		throw new SyntaxError(`Unexpected token: "${string[0]}"`)
	}

	/**
	 * helper function lookup regexp from input
	 */
	_match(regexp, input) {
		let matched = regexp.exec(input)
		if (matched !== null) {
			this._cursor += matched[0].length
			return matched[0]
		}
		return null
	}
}

module.exports = { 
	Tokenizer
}