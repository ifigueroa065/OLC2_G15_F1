class Ands extends Instruction {
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
        console.log('Executing ANDS');
        console.log('destination', this.destination);
        console.log('source1', this.source1);
        console.log('source2', this.source2);

        let retornoDestino = this.getRetorno(this.destination, env);
        let retornoSource1 = this.getRetorno(this.source1, env);
        let retornoSource2 = this.getRetorno(this.source2, env);

        console.log('retornoDestino', retornoDestino);
        console.log('retornoSource1', retornoSource1);
        console.log('retornoSource2', retornoSource2);

        // Generar el cuádruplo para la instrucción AND
        if (retornoDestino && retornoSource1 && retornoSource2) {
            gen.addQuadruple('ANDS', retornoSource1.valor, retornoSource2.valor, '-', '-', '-', retornoDestino.valor);
        } else {
            console.error('Error: Uno o más valores de retorno son undefined');
        }
    }

    getRetorno(node, env) {
        if (!node) {
            return null;
        }
        if (node._InsExpr) {
            return node._InsExpr.execute(env);
        }
        if (node.children && node.children.length > 0) {
            let child = node.children[0];
            if (child._InsExpr) {
                return child._InsExpr.execute(env);
            }
            if (child.children && child.children.length > 0) {
                return child.children[0]._InsExpr ? child.children[0]._InsExpr.execute(env) : null;
            }
        }
        return null;
    }
}
