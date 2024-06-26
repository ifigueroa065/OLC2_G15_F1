class Str extends Instruction{
    constructor(destination, source) {
        super();
        // if (!(destination instanceof Expression)) {
        //     throw new Error('destination must be an instance of Expression');
        // }
        this.destination = destination;

        // if (!(source instanceof Expression)) {
        //     throw new Error('source must be an instance of Expression');
        // }
        this.source = source;
        
    }

    execute(env, gen) {
        console.log('Executing STR');
        console.log('destination', this.destination);
        console.log('source', this.source);
        // Implementar lógica de instrucción mov básicamente.
        // 1. Obtener el valor de la variable op1
            // let _d = destion?.execute(env);
            //let retornoDestino = this.destination?._InsExpr?.execute(env);

            let nodos = [];
        this.destination.forEach((destino) => {
            let resultado = destino?._InsExpr?.execute(env);
            if (resultado !== undefined) {
                nodos.push(resultado.valor);
            }
        });
        // 2. Obtener el valor de la variable op2
            // let _s = source?.execute(env);
            //let retornoSource = this.source?._InsExpr?.execute(env);
            //console.log('retornoSource', retornoSource);
        // 3.1. Realizar la operación de asignación
            // _d = _s;
        
        // 3.2. Realizar la lógica de generación de Quadruples
        gen.addQuadruple('STR', this.source.value,'-','-', '-', '-', nodos.join(','));
    }
}