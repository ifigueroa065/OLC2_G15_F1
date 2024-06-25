## Pasos para instalar Peggy

```
npm install -g peggy
```

## Comandos para ejecutar

```sh
peggy -o parser.js grammarIsai.pegjs
```

### Última parte del parser

```JS
window.parser = {
  SyntaxError: peg$SyntaxError,
  parse: peg$parse
};
```

y eliminar 

```JS
module.exports = {
  StartRules: ["start"],
  SyntaxError: peg$SyntaxError,
  parse: peg$parse
};
```