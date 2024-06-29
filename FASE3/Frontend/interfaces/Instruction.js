class Instruction {
    // Abstract method
    execute(env, gen, memo) {
        throw new Error('El método execute() debe ser implementado');
    }
}