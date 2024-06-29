class Csel extends Instruction {
    constructor(destination, source1, source2, cond, line, col) {
        super();
        this.destination = destination;
        this.source1 = source1;
        this.source2 = source2;
        this.cond = cond;
        this.line = line;
        this.col = col;
    }

    execute(env, gen) {
        console.log('Executing Csel');
        console.log('destination', this.destination);
        console.log('source1', this.source1);
        console.log('source2', this.source2);
        console.log('cond', this.cond);

        // Obtener los valores de los operandos
        let retornoDestino = this.destination?._InsExpr?.execute(env);
        let retornoSource1 = this.source1?._InsExpr?.execute(env);
        let retornoSource2 = this.source2?._InsExpr?.execute(env);
        let retornoCond = this.cond?._InsExpr?.execute(env);

        // Asegurarse de que los valores de retorno no sean undefined
        let valorDestino = retornoDestino ? retornoDestino.valor : null;
        let valorSource1 = retornoSource1 ? retornoSource1.valor : null;
        let valorSource2 = retornoSource2 ? retornoSource2.valor : null;
        let valorCond = retornoCond ? retornoCond.valor : null;

        // Realizar la lógica de generación de cuádruplos
        if (valorDestino && valorSource1 && valorSource2 && valorCond) {
            gen.addQuadruple('CSEL', valorSource1, valorSource2, valorCond, '-', '-', valorDestino);
        } else {
            console.error('Error generating quadruple: Missing operand values');
        }
    }
}
