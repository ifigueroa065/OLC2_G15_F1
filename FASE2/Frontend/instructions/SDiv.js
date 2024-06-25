class SDiv extends Instruction {
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
        let retornoDestino = this.getRetorno(this.destination, env);
        let retornoSource1 = this.getRetorno(this.source1, env);
        let retornoSource2 = this.getRetorno(this.source2, env);

        // Generar el cuádruplo para la instrucción SDIV
        if (retornoDestino && retornoSource1 && retornoSource2) {
            gen.addQuadruple('SDIV', retornoSource1.valor, retornoSource2.valor, null, null, null, retornoDestino.valor);
        } else {
            console.error('Error: Uno o más valores de retorno son undefined');
        }
    }

    getRetorno(node, env) {
        if (!node) return null;
        if (node._InsExpr) return node._InsExpr.execute(env);
        if (node.children && node.children.length > 0) {
            let child = node.children[0];
            if (child._InsExpr) return child._InsExpr.execute(env);
            if (child.children && child.children.length > 0) {
                return child.children[0]._InsExpr ? child.children[0]._InsExpr.execute(env) : null;
            }
        }
        return null;
    }
}
