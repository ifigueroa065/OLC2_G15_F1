class Msub extends Instruction {
    constructor(destination, source1, source2, source3, line, col) {
        super();
        this.destination = destination;
        this.source1 = source1;
        this.source2 = source2;
        this.source3 = source3;
        this.line = line;
        this.col = col;
    }

    execute(env, gen) {
        console.log('Executing Msub');
        console.log('destination', this.destination);
        console.log('source1', this.source1);
        console.log('source2', this.source2);
        console.log('source3', this.source3);

        // Obtener los valores de los operandos
        let retornoDestino = this.destination?._InsExpr?.execute(env);
        let retornoSource1 = this.source1?._InsExpr?.execute(env);
        let retornoSource2 = this.source2?._InsExpr?.execute(env);
        let retornoSource3 = this.source3?._InsExpr?.execute(env);

        // Realizar la lógica de generación de Quadruples
        gen.addQuadruple('MSUB', retornoSource1.valor, retornoSource2.valor, retornoSource3.valor, '-', '-', retornoDestino.valor);
    }
}
