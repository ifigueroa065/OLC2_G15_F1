class Primitivos extends Expression{
    constructor(value, type, line, col) {
        super();
        this.value = value;
        this.type = type;
        this.line = line;
        this.col = col;
    }

    execute(env) {
        console.log('Executing Primitivos');
        // validar que tipo de primitivo es según el tipo y devolver ese valor.
        // cuando aplique ya el tema de lógica (memoria) hay que ver bien que se devuelve.
        
        if (this.type === Tipo.NUMBER) {
            return new Retorno(this.value, Tipo.NUMBER, this.type);
        } else if (this.type === Tipo.CARACTER) {
            return new Retorno(this.value, Tipo.CARACTER, this.type);
        } else if (this.type === Tipo.NULL) {
            return new Retorno(this.value, Tipo.NULL, this.type);
        }
    }

}