class Stp extends Instruction{
    constructor(destination, source1, source2) {
        super();
        // if (!(destination instanceof Expression)) {
        //     throw new Error('destination must be an instance of Expression');
        // }
        this.destination = destination;

        // if (!(source instanceof Expression)) {
        //     throw new Error('source must be an instance of Expression');
        // }
        this.source1 = source1;
        this.source2 = source2;
        
    }

    execute(env, gen) {
        console.log('Executing Stp');
        console.log('destination', this.destination);
        console.log('source 1', this.source1);
        console.log('source 2', this.source2);
        // Implementar lógica de instrucción mov básicamente.
        // 1. Obtener el valor de la variable op1
            // let _d = destion?.execute(env);
            

            let nodos = [];
        this.destination.forEach((destino) => {
            let resultado = destino?._InsExpr?.execute(env);
            if (resultado !== undefined) {
                nodos.push(resultado.valor);
            }
        });
        // 2. Obtener el valor de la variable op2
            // let _s = source?.execute(env);
            //console.log(this.source1);
            let retornoSource1 = this.source1?._InsExpr?.execute(env);
            let retornoSource2 = this.source2?._InsExpr?.execute(env);
        
            //let retornoSource2 = this.source2?._InsExpr?.execute(env);
        // 3.1. Realizar la operación de asignación
            // _d = _s;
        
        // 3.2. Realizar la lógica de generación de Quadruples
        gen.addQuadruple('STP',retornoSource1.valor,retornoSource2.valor,'-','-','-',nodos.join(','));
    }
}