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
        let retornoDestino = this.getRetorno(this.destination, env);
        let retornoDestino2 = this.getRetorno(this.destination2, env);
        let retornoSource = this.source.map(src => this.getRetorno(src, env));

        // Generar el cuádruplo para la instrucción LDP
        if (retornoDestino && retornoDestino2 && retornoSource.every(r => r !== null)) {
            gen.addQuadruple('LDP', retornoSource.map(r => r.valor).join(', '), null, null, null, `${retornoDestino.valor}, ${retornoDestino2.valor}`);
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
