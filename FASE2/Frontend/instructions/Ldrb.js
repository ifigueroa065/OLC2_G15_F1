class Ldrb extends Instruction {
    constructor(destination, source, line, col) {
        super();
        this.destination = destination;
        this.source = source;
        this.line = line;
        this.col = col;
    }

    execute(env, gen) {
        // Obtener los valores de los operandos
        let retornoDestino = this.destination?._InsExpr?.execute(env);
        let retornoSource = this.source?.map(src => src.execute(env));

        // Generar el cuádruplo para la instrucción LDRB
        gen.addQuadruple('LDRB', retornoSource.map(r => r.valor).join(', '), null, null, null, null, retornoDestino.valor);
    }
}