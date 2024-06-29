class Registro extends Expression{
    constructor(value, type, line, col) {
        super();
        this.value = value;
        this.type = type;
        this.line = line;
        this.col = col;
    }

    // Retorno de dirección de memoria
    execute(env) {
        console.log('Executing Registro');
        // validar de que tipo de registro es y devolver la dirección de memoria.
        // cuando aplique ya el tema de lógica (memoria) hay que ver bien que se devuelve.
        return new Retorno(this.value, Tipo.DIRECCION_MEMORIA, this.type);
    }

}

const TipoRegistro = {
    /**
     * Enum de tipos de registros que se pueden manejar en el lenguaje
     */
    RG_32_BITS: 1,
    RG_64_BITS: 2
};