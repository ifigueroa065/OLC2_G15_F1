class Svc extends Instruction{
    constructor(destination) {
        super();
        this.destination = destination;
    }

    execute(env, gen) {
        console.log('Executing SVC');
        console.log('destination', this.destination);

        let retornoDestino = this.destination?._InsExpr?.execute(env);
        
        // 3.2. Realizar la lógica de generación de Quadruples
        gen.addQuadruple('SVC', '-','-', '-', '-', '-',retornoDestino.valor);
    }
}