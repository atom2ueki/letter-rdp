module.exports = test => {
	// NumericLiteral
	test('11;', {
		type: 'Program',
		body: [
			{
				type: 'ExpressionStatement',
				expression: {
					type: 'NumericLiteral',
					value: 11
				}
			}
		]
	})

	// StringLiteral
	test(`"test";`, {
		type: 'Program',
		body: [
			{
				type: 'ExpressionStatement',
				expression: {
					type: 'StringLiteral',
					value: 'test'
				}
			}
		]
	})

	// StringLiteral
	test(`'test';`, {
		type: 'Program',
		body: [
			{
				type: 'ExpressionStatement',
				expression: {
					type: 'StringLiteral',
					value: 'test'
				}
			}
		]
	})
}