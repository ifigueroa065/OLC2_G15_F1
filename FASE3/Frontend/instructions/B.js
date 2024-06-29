class B extends Instruction{
    constructor(destination) {
        super();
        // if (!(destination instanceof Expression)) {
        //     throw new Error('destination must be an instance of Expression');
        // }
        this.destination = destination;

        // if (!(source instanceof Expression)) {
        //     throw new Error('source must be an instance of Expression');
        // }
        
    }

    execute(env, gen, memo) {
        console.log('Executing B');
        console.log('destination', this.destination);
        // Implementar lógica de instrucción mov básicamente.
        // 1. Obtener el valor de la variable op1
            // let _d = destion?.execute(env);
            console.log('destination', this.destination);
        // 2. Obtener el valor de la variable op2
            // let _s = source?.execute(env);
            //let retornoSource = this.source?._InsExpr?.execute('-');
        // 3.1. Realizar la operación de asignación
            // _d = _s;
        
        // 3.2. Realizar la lógica de generación de Quadruples
        memo.saludar();
        gen.addQuadruple('B', '-','-', '-', '-', '-', this.destination.value);
    }
}