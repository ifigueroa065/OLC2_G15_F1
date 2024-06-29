class Label extends Instruction {
    constructor(value, line, col) {
        super();
        this.value = value;
        this.line = line;
        this.col = col;
    }

    execute(env) {
        // Lógica para manejar la ejecución de la etiqueta
        return { valor: this.value, type: 'LABEL' };
    }
}
