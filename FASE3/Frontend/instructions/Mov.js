class Mov extends Instruction{
    constructor(destination, source, line, col) {
        super();
        // if (!(destination instanceof Expression)) {
        //     throw new Error('destination must be an instance of Expression');
        // }
        this.destination = destination;

        // if (!(source instanceof Expression)) {
        //     throw new Error('source must be an instance of Expression');
        // }
        this.source = source;
        
        this.line = line;
        this.col = col;
    }

    execute(env, gen, memo) {
        console.log('Executing Mov');
        console.log('destination', this.destination);
        console.log('source', this.source);
        // Implementar lógica de instrucción mov básicamente.
        // 1. Obtener el valor de la variable op1
            // let _d = destion?.execute(env);
            let retornoDestino = this.destination?._InsExpr?.execute(env);
        // 2. Obtener el valor de la variable op2
            // let _s = source?.execute(env);
            let retornoSource = this.source?._InsExpr?.execute(env);
        // 3.1. Realizar la operación de asignación
            // _d = _s;

            const memoryManager = Singleton.getInstance();
            memoryManager.setData('registers', retornoDestino.valor, retornoSource.valor);
        
        // 3.2. Realizar la lógica de generación de Quadruples
        gen.addQuadruple('MOV', retornoSource.valor, '-','-', '-', '-', retornoDestino.valor);
    }
}