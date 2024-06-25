class Ldp extends Instruction {
    constructor(destination, destination2, source, line, col) {
        super();
        this.destination = destination;
        this.destination2 = destination2;
        this.source = source;
        this.line = line;
        this.col = col;
    }

    execute(env, gen) {
        // Obtener los valores de los operandos
        let retornoDestino = this.destination?._InsExpr?.execute(env);
        let retornoDestino2 = this.destination2?._InsExpr?.execute(env);
        let retornoSource = this.source?.map(src => src.execute(env));

        // Generar el cuádruplo para la instrucción LDP
        gen.addQuadruple('LDP', retornoSource.map(r => r.valor).join(', '), null, null, null, null, `${retornoDestino.valor}, ${retornoDestino2.valor}`);
    }
}