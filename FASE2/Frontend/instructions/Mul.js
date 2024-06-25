class Mul extends Instruction {
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
        let retornoDestino = this.destination?.execute(env);
        let retornoSource1 = this.source1?.execute(env);
        let retornoSource2 = this.source2?.execute(env);

        // Generar el cuádruplo para la instrucción MUL
        gen.addQuadruple('MUL', retornoSource1.valor, retornoSource2.valor, null, null, null, retornoDestino.valor);
    }
}