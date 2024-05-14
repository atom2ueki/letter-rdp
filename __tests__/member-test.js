module.exports = test => {
    test(
        `
        x.y;
        
        `,
        {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "MemberExpression",
                        computed: false,
                        object: {
                            type: "Identifier",
                            name: "x"
                        },
                        property: {
                            type: "Identifier",
                            name: "y"
                        }
                    }
                }
            ]
        }
    );

    test(

        `
        x.y = 10;
        `,
        {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "Identifier",
                                name: "x"
                            },
                            property: {
                                type: "Identifier",
                                name: "y"
                            }
                        },
                        right: {
                            type: "NumericLiteral",
                            value: 10
                        }
                    }
                }
            ]
        }

    );

    test (
        `
        x[0] = 10;
        `,
        {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "MemberExpression",
                            computed: true,
                            object: {
                                type: "Identifier",
                                name: "x"
                            },
                            property: {
                                type: "NumericLiteral",
                                value: 0
                            }
                        },
                        right: {
                            type: "NumericLiteral",
                            value: 10
                        }
                    }
                }
            ]
        }
    );

    test (
        `
        a.b.c[d];
        `,
        {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "MemberExpression",
                        computed: true,
                        object: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "MemberExpression",
                                computed: false,
                                object: {
                                    type: "Identifier",
                                    name: "a"
                                },
                                property: {
                                    type: "Identifier",
                                    name: "b"
                                }
                            },
                            property: {
                                type: "Identifier",
                                name: "c"
                            }
                        },
                        property: {
                            type: "Identifier",
                            name: "d"
                        }
                    }
                }
            ]
        }
    );
}