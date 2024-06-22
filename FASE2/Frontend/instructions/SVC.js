class SVC extends Instruction{
    constructor(destination, source, line, col) {
        super();
        this.destination = destination;
        this.source = source;
        this.line = line;
        this.col = col;
    }

    execute(env, gen) {
        console.log('Executing SVC');
        console.log('destination', this.destination);
        console.log('source', this.source);
        // Implementar lógica de instrucción SVC básicamente.
        // 1. Obtener el valor de la variable op1
            // let _d = destion?.execute(env);
        let retornoDestino = this.destination?._InsExpr?.execute(env);
        // 2. Obtener el valor de la variable op2
            // let _s = source?.execute(env);
        let retornoSource = this.source?._InsExpr?.execute(env);
        // 3.1. Realizar la operación de asignación
            // _d = _s;
        
        // 3.2. Realizar la lógica de generación de Quadruples
        gen.addQuadruple('SVC', retornoDestino.valor, retornoSource.valor,'-', '-', '-', retornoDestino.valor);
    }
}