# letter rdp
## How to write language parser from scrach.

a tutorial from `Dmitry Soshnikov`

> Parsing, syntax analysis, or syntactic analysis is the process of analyzing a string of symbols, either in natural language, computer languages or data structures, conforming to the rules of a formal grammar.

(from [Wikipedia](https://en.wikipedia.org/wiki/Parsing))

### Get Started
The parser now writen with javascript, but you can rewrite it with any languages.

e.g. swift use c++ write it's own parser under
https://github.com/apple/swift/blob/main/lib/Parse/Parser.cpp

lets run it ->
```
node __tests__/run.js
```

### Unit Test
everything under `./__tests__` folder.

### Expectation
translate your code

```
let x = 30;
let y = 42;
if (x + 5 < y * 2) {

}
```

into

```
{
  "type": "Program",
  "body": [
    {
      "type": "VariableStatement",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "x"
          },
          "init": {
            "type": "NumericLiteral",
            "value": 30
          }
        }
      ]
    },
    {
      "type": "VariableStatement",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "y"
          },
          "init": {
            "type": "NumericLiteral",
            "value": 42
          }
        }
      ]
    },
    {
      "type": "IfStatement",
      "test": {
        "type": "BinaryExpression",
        "operator": "<",
        "left": {
          "type": "BinaryExpression",
          "operator": "+",
          "left": {
            "type": "Identifier",
            "name": "x"
          },
          "right": {
            "type": "NumericLiteral",
            "value": 5
          }
        },
        "right": {
          "type": "BinaryExpression",
          "operator": "*",
          "left": {
            "type": "Identifier",
            "name": "y"
          },
          "right": {
            "type": "NumericLiteral",
            "value": 2
          }
        }
      },
      "consequent": {
        "type": "BlockStatement",
        "body": []
      },
      "alternate": null
    }
  ]
}
```

### Tools used
- [AST Explorer](https://astexplorer.net)