class Mov extends Instruction {
    constructor(destination, source, line, col) {
        super();
        // if (!(destination instanceof Expression)) {
        //     throw new Error('destination must be an instance of Expression');
        // }
        this.destination = destination;

        // if (!(source instanceof Expression)) {
        //     throw new Error('source must be an instance of Expression');
        // }
        this.source = source;

        this.line = line;
        this.col = col;
    }

    execute(env, gen) {
        console.log('Executing MOV destination: {', this.destination, '}, source: {', this.source, '}');
        let retornoDestino = this.destination?._InsExpr?.execute(env);
        let retornoSource = this.source?._InsExpr?.execute(env);
        retornoSource.valor = parseInt(retornoSource.valor);
        console.log(retornoDestino);
        console.log(retornoSource);
        

        // Manejo de errores semánticos
        if (!retornoDestino || retornoDestino.tipo !== 3) {
            throw new Error(`Error semántico: el destino debe ser un registro, pero se encontró ${retornoDestino?.tipo || 'null'}`);
        }

        if (!retornoSource || (retornoSource.tipo !== 3 && retornoSource.tipo !== 2)) {
            throw new Error(`Error semántico: la fuente debe ser un registro o un valor inmediato, pero se encontró ${retornoSource?.tipo || 'null'}`);
        }

        // Validación de límites de valores
        if (retornoDestino.valor.startsWith('w') && retornoSource.valor > parseInt("0xFFFFFFFF", 16)) {
            throw new Error(`Error semántico: el valor ${retornoSource.valor} excede el límite de 32 bits para el registro ${retornoDestino.valor}`);
        }

        if (retornoDestino.valor.startsWith('x') && retornoSource.valor> parseInt("0xFFFFFFFFFFFFFFFF", 16)) {
            throw new Error(`Error semántico: el valor ${retornoSource.valor} excede el límite de 64 bits para el registro ${retornoDestino.valor}`);
        }

        // Obtener la instancia del Singleton
        const memoryManager = Singleton.getInstance();

        // Realizar la operación MOV solo si las validaciones son correctas
        memoryManager.setData('registers', retornoDestino.valor, retornoSource.valor);

        // Añadir al generador de cuádruples
        gen.addQuadruple('MOV', retornoSource.valor, '-', '-', '-', '-', retornoDestino.valor);
    }
}