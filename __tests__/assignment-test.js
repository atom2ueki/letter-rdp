module.exports = test => {
	// Simple assignment
	test(`x=2;`, {
		type: 'Program',
		body: [
			{
				type: 'ExpressionStatement',
				expression: {
					type: 'AssignmentExpression',
					operator: '=',
					left: {
						type: 'Identifier',
						name: 'x',
					},
					right: {
						type: 'NumericLiteral',
						value: 2,
					}
				}
			}
		]
	}),

	test(`x = z=2;`, {
		type: 'Program',
		body: [
			{
				type: 'ExpressionStatement',
				expression: {
					type: 'AssignmentExpression',
					operator: '=',
					left: {
						type: 'Identifier',
						name: 'x',
					},
					right: {
						type: 'AssignmentExpression',
						operator: '=',
						left: {
							type: 'Identifier',
							name: 'z',
						},
						right: {
							type: 'NumericLiteral',
							value: 2
						}
					}
				}
			}
		]
	}),

	test(`x += y;`, {
		type: 'Program',
		body: [
			{
				type: 'ExpressionStatement',
				expression: {
					type: 'AssignmentExpression',
					operator: '+=',
					left: {
						type: 'Identifier',
						name: 'x',
					},
					right: {
						type: 'Identifier',
						name: 'y',
					}
				}
			}
		]
	})
}