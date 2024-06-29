class Expression {
    // Abstract method retorna clase Retorno
    execute(env) {
        throw new Error('El método execute() debe ser implementado');
    }
}
