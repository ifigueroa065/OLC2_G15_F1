class Beq extends Instruction{
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

    execute(env, gen) {
        console.log('Executing BEQ {', this.destination, '}');
        
        // 1. lógica
        const memoryManager = Singleton.getInstance();
        const flags = memoryManager.getFlags();
        const label = memoryManager.getLabel(this.destination);
        console.log('label', label);
        if (label) {
            if (flags.ZF === true){
                label._InsExpr.execute(env, gen);
                // Termina de ejecutar salto de etiqueta.
                // entonces se debe obviar el resto de instrucciones desde donde se llamo el salto.
                memoryManager.setJump(true);
            }
        } else {
            console.log('Label not found');
        }
        
        // 3.2. Realizar la lógica de generación de Quadruples
        gen.addQuadruple('BEQ',  '-','-', '-', '-', '-',this.destination.value);
    }
}