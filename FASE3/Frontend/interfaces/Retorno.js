class Retorno {
    /**
     * Retorno de una expresion
     */
    constructor(valor = null, tipo = null, tipoVariable = null) {
        this.valor = valor;
        this.tipo = tipo;
        this.tipoVariable = tipoVariable;
    }
}

const Tipo = {
    /**
     * Enum de tipos de datos que se pueden manejar en el lenguaje
     */
    NULL: 1,
    NUMBER: 2,
    DIRECCION_MEMORIA: 3,
    CARACTER: 4,
};