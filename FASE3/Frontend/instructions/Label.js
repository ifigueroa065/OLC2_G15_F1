class Label extends Instruction {
    constructor(value, section, line, col) {
        super();
        this.value = value;
        this.section = section;
        this.line = line;
        this.col = col;
    }

    execute(env, gen) {
        console.log("Executing Label {", this.value, "} in section {", this.section, "}");
        
        const memoryManager = Singleton.getInstance();
        const instruction = this.section?.children??[];
        console.log('instruction label', instruction);
        instruction.forEach(inst => {
            if (inst?.type === 'INSTRUCTION' || inst?.type === 'LABEL_DIRECTIVE'){
                if (memoryManager.getJump()) {return;}
                inst._InsExpr?.execute(env, gen);
            }
        });

        // 3.2. Realizar la lógica de generación de Quadruples
        // gen.addQuadruple('MOV', retornoSource.valor, '-','-', '-', '-', retornoDestino.valor);
    }
}
