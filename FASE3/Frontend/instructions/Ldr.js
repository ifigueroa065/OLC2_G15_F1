class Ldr extends Instruction {
    constructor(destination, sources, line, col) {
        super();
        this.destination = destination;
        this.sources = sources;
        this.line = line;
        this.col = col;
    }

    execute(env, gen) {
        // Obtener los valores de los operandos
        let retornoDestino = this.getRetorno(this.destination, env);
        let retornoSources = this.sources.map(src => this.getRetorno(src, env));

        // Generar el cuádruplo para la instrucción LDR
        if (retornoDestino && retornoSources.every(r => r !== null)) {
            if (retornoSources.length === 1 && retornoSources[0].type === 'LABEL') {
                gen.addQuadruple('LDR', retornoSources[0].valor, null, null, null, null, retornoDestino.valor);
            } else if (retornoSources.length === 2) {
                gen.addQuadruple('LDR', retornoSources[0].valor, retornoSources[1].valor, null, null, null, retornoDestino.valor);
            } else {
                gen.addQuadruple('LDR', retornoSources[0].valor, null, null, null, null, retornoDestino.valor);
            }
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
