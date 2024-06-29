class Primitivos extends Expression {
    constructor(value, type, line, col) {
        super();
        this.value = value;
        this.type = type;
        this.line = line;
        this.col = col;
    }

    execute(env) {
        console.log('Executing Primitivos with value:', this.value, 'and type:', this.type);
        
        if (this.type === Tipo.NUMBER) {
            return new Retorno(this.value, Tipo.NUMBER, this.type);
        } else if (this.type === Tipo.CARACTER) {
            return new Retorno(this.value, Tipo.CARACTER, this.type);
        } else if (this.type === Tipo.NULL) {
            return new Retorno(this.value, Tipo.NULL, this.type);
        } else if (this.type === Tipo.CONDICION) {
            return new Retorno(this.value, Tipo.CONDICION, this.type);
        }
    }
}
