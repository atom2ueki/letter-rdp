module.exports = (test) => {
	test(
		`
		x >= 0 && y <= 5;
		`,
		{
			type: 'Program',
			body: [
				{
					type: 'ExpressionStatement',
					expression: {
						type: 'LogicalExpression',
						operator: '&&',
						left: {
							type: 'BinaryExpression',
							operator: '>=',
							left: {
								type: 'Identifier',
								name: 'x'
							},
							right: {
								type: 'NumericLiteral',
								value: 0
							}
						},
						right: {
							type: 'BinaryExpression',
							operator: '<=',
							left: {
								type: 'Identifier',
								name: 'y'
							},
							right: {
								type: 'NumericLiteral',
								value: 5
							}
						}
					}
				}
			]
		}
	),

	test(
		`
		x >= 0 && z == 0 || y <= 5;
		`,
		{
			type: 'Program',
			body: [
				{
					type: 'ExpressionStatement',
					expression: {
						type: 'LogicalExpression',
						operator: '||',
						left: {
							type: 'LogicalExpression',
							operator: '&&',
							left: {
								type: 'BinaryExpression',
								operator: '>=',
								left: {
									type: 'Identifier',
									name: 'x'
								},
								right: {
									type: 'NumericLiteral',
									value: 0
								}
							},
							right: {
								type: 'BinaryExpression',
								operator: '==',
								left: {
									type: 'Identifier',
									name: 'z'
								},
								right: {
									type: 'NumericLiteral',
									value: 0
								}
							}
						},
						right: {
							type: 'BinaryExpression',
							operator: '<=',
							left: {
								type: 'Identifier',
								name: 'y'
							},
							right: {
								type: 'NumericLiteral',
								value: 5
							}
						}
					}
				}
			]
		}
	)
}