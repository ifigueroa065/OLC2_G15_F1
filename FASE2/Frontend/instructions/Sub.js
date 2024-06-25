class Sub extends Instruction {
    constructor(destination, source1, source2, line, col) {
        super();
        this.destination = destination;
        this.source1 = source1;
        this.source2 = source2;
        this.line = line;
        this.col = col;
    }

    execute(env, gen) {
        // Obtener los valores de los operandos
        let retornoDestino = this.destination?._InsExpr?.execute(env);
        let retornoSource1 = this.source1?._InsExpr?.execute(env);
        let retornoSource2 = this.source2?._InsExpr?.execute(env);

        // Generar el cuádruplo para la instrucción SUB
        gen.addQuadruple('SUB', retornoSource1.valor, retornoSource2.valor, null, null, null, retornoDestino.valor);
    }
}