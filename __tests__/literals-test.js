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

	// NumericLiteral with float point
	test('3.14;', {
		type: 'Program',
		body: [
			{
				type: 'ExpressionStatement',
				expression: {
					type: 'NumericLiteral',
					value: 3.14
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