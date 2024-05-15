const { type } = require("os");

module.exports = test => {
    test(
        `
        class Point {
            def constructor(x, y) {
                this.x = x;
                this.y = y;
            }

            def move(x, y) {
                this.x = x;
                this.y = y;
            }
        }
        `,
        {
            type: 'Program',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'Point'
                    },
                    superClass: null,
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'FunctionDeclaration',
                                name: {
                                    type: 'Identifier',
                                    name: 'constructor'
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'x'
                                    },
                                    {
                                        type: 'Identifier',
                                        name: 'y'
                                    }
                                ],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AssignmentExpression',
                                                operator: '=',
                                                left: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'ThisExpression'
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'x'
                                                    }
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'x'
                                                }
                                            }
                                        },
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AssignmentExpression',
                                                operator: '=',
                                                left: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'ThisExpression'
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'y'
                                                    }
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'y'
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                type: 'FunctionDeclaration',
                                name: {
                                    type: 'Identifier',
                                    name: 'move'
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'x'
                                    },
                                    {
                                        type: 'Identifier',
                                        name: 'y'
                                    }
                                ],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AssignmentExpression',
                                                operator: '=',
                                                left: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'ThisExpression'
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'x'
                                                    }
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'x'
                                                }
                                            }
                                        },
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AssignmentExpression',
                                                operator: '=',
                                                left: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'ThisExpression'
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'y'
                                                    }
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'y'
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        }
    );
    test(
      `
        class Circle extends Point {
            def constructor(x, y, radius) {
                super(x, y);
                this.radius = radius;
            }

            def area() {
                return 3.14 * this.radius * this.radius;
            }
        }
      `,
      {
        type: 'Program',
        body: [
            {
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'Circle'
                },
                superClass: {
                    type: 'Identifier',
                    name: 'Point'
                },
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'FunctionDeclaration',
                            name: {
                                type: 'Identifier',
                                name: 'constructor'
                            },
                            params: [
                                {
                                    type: 'Identifier',
                                    name: 'x'
                                },
                                {
                                    type: 'Identifier',
                                    name: 'y'
                                },
                                {
                                    type: 'Identifier',
                                    name: 'radius'
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                body: [
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'Super'
                                            },
                                            arguments: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'x'
                                                },
                                                {
                                                    type: 'Identifier',
                                                    name: 'y'
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'AssignmentExpression',
                                            operator: '=',
                                            left: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'ThisExpression'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'radius'
                                                }
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'radius'
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            type: 'FunctionDeclaration',
                            name: {
                                type: 'Identifier',
                                name: 'area'
                            },
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [
                                    {
                                        type: 'ReturnStatement',
                                        argument: {
                                            type: 'BinaryExpression',
                                            operator: '*',
                                            left: {
                                                type: 'BinaryExpression',
                                                operator: '*',
                                                left: {
                                                    type: 'NumericLiteral',
                                                    value: 3.14
                                                },
                                                right: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'ThisExpression'
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'radius'
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'ThisExpression'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'radius'
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]
      }
    );
    test(
        `
        new Circle(0, 0, 10);
        `,
        {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'NewExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'Circle'
                        },
                        arguments: [
                            {
                                type: 'NumericLiteral',
                                value: 0
                            },
                            {
                                type: 'NumericLiteral',
                                value: 0
                            },
                            {
                                type: 'NumericLiteral',
                                value: 10
                            }
                        ]
                    }
                }
            ]
        }
    );
}