class Instruction {
    // Abstract method
    execute(env, gen) {
        throw new Error('El método execute() debe ser implementado');
    }
}