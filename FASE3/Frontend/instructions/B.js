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
        console.log('Executing B {', this.destination, '}');
        
        // 1. lógica
        const memoryManager = Singleton.getInstance();
        const label = memoryManager.getLabel(this.destination);
        console.log('label', label);
        if (label) {
            label._InsExpr.execute(env, gen);
        } else {
            console.log('Label not found');
        }
        // Termina de ejecutar salto de etiqueta.
        // entonces se debe obviar el resto de instrucciones desde donde se llamo el salto.
        memoryManager.setJump(true);

        // 2. quadruplo
        gen.addQuadruple('B', '-','-', '-', '-', '-', this.destination.value);
    }
}