class Global extends Instruction {
    constructor(value, line, col) {
        super();
        this.value = value;
        this.line = line;
        this.col = col;
    }

    execute(env, gen) {
        console.log("Executing Global {", this.value, "}");
        const memoryManager = Singleton.getInstance();
        const label = memoryManager.getLabel(this.value);
        console.log('label', label);
        if (label) {
            label._InsExpr.execute(env, gen);
        }
    }
}
