class Text extends Instruction {
    constructor(value, line, col) {
        super();
        this.value = value;
        this.line = line;
        this.col = col;
    }

    execute(env, gen) {
        console.log("Executing Text {", this.value, "}");
    }
}
