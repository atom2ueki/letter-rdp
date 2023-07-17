/**
 * Letter Parser: recursive descent implementation.
 */

const { Tokenizer } = require('./Tokenizer')

// ---------------------
// default ast node factories

const DefaultFactory = {
    Program(body) {
        return {
            type: 'Program',
            body
        }
    },

    EmptyStatement() {
        return {
            type: 'EmptyStatement',
        }
    },

    BlockStatement(body) {
        return {
            type: 'BlockStatement',
            body: body
        }
    },

    ExpressionStatement(expression) {
        return {
            type: 'ExpressionStatement',
            expression
        }
    },

    VariableStatement(declarations) {
        return {
            type: 'VariableStatement',
            declarations: declarations
        }
    },

    VariableDeclarator(id, init) {
        return {
            type: 'VariableDeclarator',
            id: id,
            init: init
        }
    },

    IfStatement(test, consequent, alternate) {
        return {
            type: 'IfStatement',
            test: test,
            consequent: consequent,
            alternate: alternate
        }
    },

    StringLiteral(value) {
        return {
            type: 'StringLiteral',
            value: value
        }
    },

    NumericLiteral(value) {
        return {
            type: 'NumericLiteral',
            value: value
        }
    },

    BooleanLiteral(value) {
        return {
            type: 'BooleanLiteral',
            value: value
        }
    },

    NullLiteral() {
        return {
            type: 'NullLiteral',
            value: null
        }
    },

    Identifier(name) {
        return {
            type: 'Identifier',
            name: name,
        }
    },

    BinaryExpression(operator, left, right) {
        return {
            type: 'BinaryExpression',
            operator: operator,
            left: left,
            right: right
        }
    },

    AssignmentExpression(operator, left, right) {
        return {
            type: 'AssignmentExpression',
            operator: operator,
            left: left,
            right: right
        }
    },

    LogicalExpression(operator, left, right) {
        return {
            type: 'LogicalExpression',
            operator: operator,
            left: left,
            right: right
        }
    }
}

const factory = DefaultFactory

class Parser {

    constructor() {
        this._string = ''
        this._tokenizer = new Tokenizer()
    }

    /**
     * Parses a string into an AST.
     */
    parse(string) {
        this._string = string
        this._tokenizer.init(string)

        // predict the token,
        // Prime the tokenizer to obtain the first token
        // which is our lookahead, the lookahead is used for
        // predictive parsing.

        this._lookahead = this._tokenizer.getNextToken()

        return this.Program()
    }

    /**
     * Main entry point
     * Program
     *      : StatementList
     */
    Program() {
        return factory.Program(this.StatementList())
    }

    /**
     * StatementList
     *      : Statement
     *      | StatementList Statement -> StatementList Statement...
     *      ;
     */
    StatementList() {
        const statementList = [this.Statement()]
        const stopLookahead = "}"

        // until lookahead is null or lookahead is end of block, e.g. }
        while (this._lookahead != null && this._lookahead.type !== stopLookahead) {
            statementList.push(this.Statement())
        }
        return statementList
    }

    /**
     * Statement
     *      : ExpressionStatement
     *      | BlockStatement
     *      | EmptyStatement
     *      | VariableStatement
     *      | IfStatement
     *      ;
     */
    Statement() {
        switch (this._lookahead.type) {
        case ';':
            return this.EmptyStatement()
        case 'if':
            return this.IfStatement()
        case '{': 
            return this.BlockStatement()
        case 'let':
            return this.VariableStatement()
        default:
            return this.ExpressionStatement()
        }
    }

    /**
     * EmptyStatement
     *      ;
     */
    EmptyStatement() {
        this._eat(';')
        return factory.EmptyStatement()
    }

    /**
     * ExpressionStatement
     *      : Expression ';'
     *      ;
     */
    ExpressionStatement() {
        const expression = this.Expression()
        this._eat(';') // end of the expression
        return factory.ExpressionStatement(expression)
    }

    /**
     * Expression
     *      : Literal
     *      ;
     */
    Expression() {
        return this.AssignmentExpression()
    }

    /**
     * AssignmentExpression
     *      : AdditiveExpression
     *      | LeftHandSideExpression AssignmentOperator AssignmentExpression
     *      ;
     */
    AssignmentExpression() {
        // lowest priority
        const left = this.LogicalORExpression()

        if (!this._isAssignmentOperator(this._lookahead.type)) {
            return left
        }

        return factory.AssignmentExpression(
            this.AssignmentOperator().value,
            this._checkValidAssignmentTarget(left),
            this.AssignmentExpression()
        )
    }

    /**
     * LeftHandSideExpression
     *      : Identifier
     *      ;
     */
    LeftHandSideExpression() {
        return this.Identifier()
    }

    /**
     * Identifier
     *      : IDENTIFIER
     *      ;
     */
    Identifier() {
        return factory.Identifier(this._eat('IDENTIFIER').value)
    }

    _checkValidAssignmentTarget(node) {
        if (node.type === 'Identifier') {
           return node 
        }
        throw new SyntaxError('Invalid left hand side with assignment expression')
    }

    _isAssignmentOperator(tokenType) {
        return tokenType === 'SIMPLE_ASSIGN' || tokenType === 'COMPLEX_ASSIGN'
    }

    /**
     * AssignmentOperator
     *      : SIMPLE_ASSIGN
     *      | COMPLEX_ASSIGN
     *      ;
     */
    AssignmentOperator() {
       if (this._lookahead.type === 'SIMPLE_ASSIGN') {
            return this._eat('SIMPLE_ASSIGN')
       }
       return this._eat('COMPLEX_ASSIGN')
    }

    /**
     * Logical AND Expression
     * 
     *  x && y
     * 
     *  LogicalANDExpression
     *      : EqualityExpression LOGICAL_AND LogicalANDExpression
     *      | EqualityExpression
     *      ;
     */
    LogicalANDExpression() {
        return this._LogicalExpression(
            'EqualityExpression', 
            'LOGICAL_AND')
    }

    /**
     * Logical OR Expression
     * 
     *  x || y
     * 
     *  LogicalANDExpression
     *      : EqualityExpression LOGICAL_OR LogicalORExpression
     *      | EqualityExpression
     *      ;
     */
    LogicalORExpression() {
        return this._LogicalExpression(
            'LogicalANDExpression',
            'LOGICAL_OR')
    }

    /**
     * AdditiveExpression
     *      : Literal
     *      | AdditiveExpression ADDITIVE_OPERATOR Literal
     *      ;
     */
    AdditiveExpression() {
        return this._BinaryExpression(
            'MultiplicativeExpression',
            'ADDITIVE_OPERATOR'
        )
    }

    /**
     * MultiplicativeExpression
     *      : PrimaryExpression
     *      | MultiplicativeExpression MULTIPLICATIVE_OPERATOR Literal
     *      ;
     */
    MultiplicativeExpression() {
        return this._BinaryExpression(
            'PrimaryExpression',
            'MULTIPLICATIVE_OPERATOR'
        )
    }

    /**
     * RELATIONAL_OPERATOR: >, >=, <, <=
     * x > y
     * x >= y
     * x < y
     * x <= y
     * 
     * RelationalExpression
     *      : AdditiveExpression
     *      | MultiplicativeExpression MULTIPLICATIVE_OPERATOR Literal
     *      ;
     */
    RelationalExpression() {
        return this._BinaryExpression(
            'AdditiveExpression',
            'RELATIONAL_OPERATOR'
        )
    }

    /**
     * EQUALITY_OPERATOR: ==, !=
     * x == y
     * x != y
     * 
     * EqualityExpression
     *      : RelationalExpression EQUALITY_OPERATOR EqualityExpression
     *      | RelationalExpression
     *      ;
     */
    EqualityExpression() {
        return this._BinaryExpression(
            'RelationalExpression',
            'EQUALITY_OPERATOR'
        )
    }

    /**
     * Generic logical expression
     */
    _LogicalExpression(builderName, operatorToken) {
        let left = this[builderName]();

        while (this._lookahead.type === operatorToken) {
            const operator = this._eat(operatorToken).value
            const right = this[builderName]()
            left = factory.LogicalExpression(operator, left, right)
        }

        return left
    }

    /**
     * Generic binary expression
     */
    _BinaryExpression(builderName, operatorToken) {
        let left = this[builderName]();

        while (this._lookahead.type === operatorToken) {
            const operator = this._eat(operatorToken).value
            const right = this[builderName]()
            left = factory.BinaryExpression(operator, left, right)
        }

        return left
    }

    /**
     * PrimaryExpression
     *      : Literal
     *      | ParenthesizedExpression
     *      | LeftHandSideExpression
     *      ;
     */
    PrimaryExpression() {
        if (this._isLiteral(this._lookahead.type)) {
            return this.Literal()
        }
        switch (this._lookahead.type) {
            case '(':
                return this.ParenthesizedExpression()
            default:
                return this.LeftHandSideExpression()
        }
    }

    /**
     * Whether the token is a valid literal
     */
    _isLiteral(tokenType) {
        return (
            tokenType === 'NUMBER' ||
            tokenType === 'STRING' ||
            tokenType === 'true' ||
            tokenType === 'false' ||
            tokenType === 'null'
        )
    }

    /**
     * ParenthesizedExpression
     *      : '(' Expression ')'
     *      ;
     */
    ParenthesizedExpression() {
        this._eat('(')
        const expression = this.Expression()
        this._eat(')')
        return expression
    }

    /**
     * BlockStatement
     *      : Block '{ optional statement list }' // can be empty block.
     *      ;
     */
    BlockStatement() {
        this._eat('{')

        const body = this._lookahead.type !== '}' ? this.StatementList() : []

        this._eat('}')

        return factory.BlockStatement(body)
    }

    /**
     * IfStatement
     *      : 'if' '(' Expression ')' Statement
     *      | 'if' '(' Expression ')' Statement 'else' Statement
     *      ; 
     */
    IfStatement() {
        this._eat('if')
        this._eat('(')
        const test = this.Expression()
        this._eat(')')

        // get consequent from block
        const consequent = this.Statement()
        // this is an opt statement=
        const alternate = this._lookahead != null && this._lookahead.type === 'else'
            ? this._eat('else') && this.Statement() : null
        return factory.IfStatement(test, consequent, alternate)
    }

    /**
     * VariableStatement
     *      : 'let' VariableDeclarationList ';'
     *      ;
     */
    VariableStatement() {
        this._eat('let')
        const declarations = this.VariableDeclarationList()
        this._eat(';')
        return factory.VariableStatement(declarations)
    }

    /**
     * VariableDeclarationList
     * VariableDeclarationList ',' VariableDeclaration
     */
    VariableDeclarationList() {
        const declarations = []

        do {
            declarations.push(this.VariableDeclaration())
        } while (this._lookahead.type === ',' && this._eat(','))

        return declarations
    }

    /**
     * VariableDeclaration
     * : Identifier OptVariableInitializer
     * ;
     */
    VariableDeclaration() {
        const id = this.Identifier()

        const init = this._lookahead.type != ',' && this._lookahead.type != ';'
            ? this.VariableInitializer() : null

        return factory.VariableDeclarator(id, init)
    }

    /**
     * VariableInitializer
     * : SIMPLE_ASSIGN AssignmentExpression
     * ;
     */
    VariableInitializer() {
        this._eat('SIMPLE_ASSIGN')
        return this.AssignmentExpression()
    }

    /**
     * Literal
     *  : NumericLiteral
     *  | StringLiteral
     *  | BooleanLiteral
     *  | NullLiteral
     * ;
     */
    Literal() {
        switch (this._lookahead.type) {
        case 'NUMBER':
            return this.NumericLiteral()
        case 'STRING':
            return this.StringLiteral()
        case 'true':
            return this.BooleanLiteral(true)
        case 'false':
            return this.BooleanLiteral(false)
        case 'null':
            return this.NullLiteral(false)
        }

        throw new SyntaxError(`Literal: Unexpected literal production`)
    }

    /**
     * StringLiteral
     *     : STRING
     *     ;
     */
    StringLiteral() {
        const token = this._eat('STRING')
        return factory.StringLiteral(token.value.slice(1, -1))
    }


    /**
     * NumericLiteral
     *     : NUMBER
     *     ;
     */
    NumericLiteral() {
        const token = this._eat('NUMBER')
        return factory.NumericLiteral(Number(token.value))
    }

    /**
     * BooleanLiteral
     *     : BOOLEAN
     *     ;
     */
    BooleanLiteral(value) {
        this._eat(value ? 'true' : 'false')
        return factory.BooleanLiteral(value)
    }

    /**
     * NullLiteral
     *     : Null
     *     ;
     */
    NullLiteral() {
        this._eat('null')
        return factory.NullLiteral()
    }

    _eat(tokenType) {
        const token = this._lookahead

        if (token == null) {
            throw new SyntaxError (
                `Unexpected end of the input, expected: "${tokenType}"`
            )
        }

        if (token.type != tokenType) {
            throw new SyntaxError(
                `Unexpected token: "${token.value}", expected: "${tokenType}"`
            )
        }

        // adv to next token.
        this._lookahead = this._tokenizer.getNextToken()

        return token
    }
}

module.exports = {
    Parser
};