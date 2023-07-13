module.exports = test => {
	test(`let x = 33;`, {
		type: 'Program',
		body: [
			{
				type: 'VariableStatement',
				declarations: [
					{
						type: 'VariableDeclarator',
						id: {
							type: 'Identifier',
							name: 'x',
						},
						init: {
							type: 'NumericLiteral',
							value: 33,
						}
					}
				]
			}
		]
	}),
	// initializer can be optional
	test(`let x;`, {
		type: 'Program',
		body: [
			{
				type: 'VariableStatement',
				declarations: [
					{
						type: 'VariableDeclarator',
						id: {
							type: 'Identifier',
							name: 'x',
						},
						init: null
					}
				]
			}
		]
	}),
	// multiple variable declarations, no init *
	test(`let x, y;`, {
		type: 'Program',
		body: [
			{
				type: 'VariableStatement',
				declarations: [
					{
						type: 'VariableDeclarator',
						id: {
							type: 'Identifier',
							name: 'x',
						},
						init: null
					},
					{
						type: 'VariableDeclarator',
						id: {
							type: 'Identifier',
							name: 'y',
						},
						init: null
					}
				]
			}
		]
	}),

	// multiple variable declarations, no init *
	test(`let x, y = 33;`, {
		type: 'Program',
		body: [
			{
				type: 'VariableStatement',
				declarations: [
					{
						type: 'VariableDeclarator',
						id: {
							type: 'Identifier',
							name: 'x',
						},
						init: null
					},
					{
						type: 'VariableDeclarator',
						id: {
							type: 'Identifier',
							name: 'y',
						},
						init: {
							type: 'NumericLiteral',
							value: 33,
						}
					}
				]
			}
		]
	})
}