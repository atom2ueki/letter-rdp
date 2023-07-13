module.exports = test => {
	test(`
	{
		42;

		"Hello";
	}
	`, {
		type: 'Program',
		body: [
			{
				type: 'BlockStatement',
				body: [
					{
						type: 'ExpressionStatement',
						expression: {
							type: 'NumericLiteral',
							value: 42,
						}
					},
					{
						type: 'ExpressionStatement',
						expression: {
							type: 'StringLiteral',
							value: 'Hello',
						}
					}
				]
			}
		]
	}),

	// empty block

	test(`
	{




	}
	`, {
		type: 'Program',
		body: [
			{
				type: 'BlockStatement',
				body: []
			}
		]
	}),

	// nested block

	test(`
	{
		"hello";

		{
			11;


		}
		
	}
	`, {
		type: 'Program',
		body: [
			{
				type: 'BlockStatement',
				body: [
					{
						type: 'ExpressionStatement',
						expression: {
							type: 'StringLiteral',
							value: 'hello'
						}
					},
					{
						type: 'BlockStatement',
						body: [
							{
								type: 'ExpressionStatement',
								expression: {
									type: 'NumericLiteral',
									value: 11
								}
							},
						]
					},
				]
			}
		]
	}),

	// nested empty block

	test(`
	{


		{

		}
		
	}
	`, {
		type: 'Program',
		body: [
			{
				type: 'BlockStatement',
				body: [
					{
						type: 'BlockStatement',
						body: []
					}
				]
			}
		]
	})
}