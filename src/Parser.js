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

    BinaryExpression(operator, left, right) {
        return {
            type: 'BinaryExpression',
            operator: operator,
            left: left,
            right: right
        }
    },
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
     *      ;
     */
    Statement() {
        switch (this._lookahead.type) {
        case ';':
            return this.EmptyStatement()
        case '{': 
            return this.BlockStatement()
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
        return this.AdditiveExpression()
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
     *      ;
     */
    PrimaryExpression() {
        switch (this._lookahead.type) {
            case '(':
                return this.ParenthesizedExpression()
            default:
                return this.Literal()
        }
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
     * Literal
     *  : NumericLiteral
     *  | StringLiteral
     * ;
     */
    Literal() {
        switch (this._lookahead.type) {
        case 'NUMBER':
            return this.NumericLiteral()
        case 'STRING':
            return this.StringLiteral()
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