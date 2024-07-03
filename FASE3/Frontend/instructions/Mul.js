class Mul extends Instruction {
    constructor(destination, source1, source2, line, col) {
        super();
        this.destination = destination;
        this.source1 = source1;
        this.source2 = source2;
        this.line = line;
        this.col = col;
    }

    execute(env, gen) {
        // Obtener los valores de los operandos
        let retornoDestino = this.getRetorno(this.destination, env);
        let retornoSource1 = this.getRetorno(this.source1, env);
        let retornoSource2 = this.getRetorno(this.source2, env);


        //pruebas

        // Validaciones
        if (!retornoDestino || retornoDestino.tipo !== 3) {
            throw new Error(`Error semántico: el destino debe ser un registro, pero se encontró ${retornoDestino?.tipo || 'null'}`);
        }

        if (!retornoSource1 || (retornoSource1.tipo == 4 || retornoSource1.tipo == 1)) {
            throw new Error(`Error semántico: la fuente 1 debe ser un registro, un valor inmediato o una dirección de memoria, pero se encontró ${retornoSource1?.tipo || 'null'}`);
        }

        if (!retornoSource2 && (retornoSource2.tipo !== 4 && retornoSource2.tipo !== 1)) {
            throw new Error(`Error semántico: la fuente 2 debe ser un registro, un valor inmediato o una dirección de memoria, pero se encontró ${retornoSource2?.tipo || 'null'}`);
        }
        const memoryManager = Singleton.getInstance();

        // Obtener valores de memoria si es necesario
        let source1Value = retornoSource1.valor;
        if (retornoSource1.tipo === 3) {
            source1Value = memoryManager.getData('registers', retornoSource1.valor);
            if (source1Value === undefined) {
                throw new Error(`Error semántico: dirección de memoria ${retornoSource1.valor} no existe`);
            }
        }

        let source2Value = retornoSource2.valor;
        if (retornoSource2.tipo === 3) {
            source2Value = memoryManager.getData('registers', retornoSource2.valor);
            if (source2Value === undefined) {
                throw new Error(`Error semántico: dirección de memoria ${retornoSource2.valor} no existe`);
            }
        }

        // Realizar la operación SUB
        let result = parseInt(source1Value) * parseInt(source2Value);

        // Validar resultados según el tipo de registro
        if (retornoDestino.valor.startsWith('w') && (result < 0 || result >parseInt("0xFFFFFFFF", 16))) {
            throw new Error(`Error semántico: el resultado ${result} excede el límite de 32 bits para el registro ${retornoDestino.valor}`);
        }

        if (retornoDestino.valor.startsWith('x') && (result < 0 || result > parseInt("0xFFFFFFFFFFFFFFFF", 16))) {
            throw new Error(`Error semántico: el resultado ${result} excede el límite de 64 bits para el registro ${retornoDestino.valor}`);
        }

        // Actualizar el valor del registro destino

        memoryManager.setData('registers', retornoDestino.valor, result);

        // FLAG LOGIC

        memoryManager.setResetFlags();
        let ZF = false;
        let NF = false;
        let CF = false;
        let VF = false;

        console.log('Resultado mul', result);
        if (result === 0) {
            ZF = true;
        } else if (result < 0) {
            NF = true;
        } else if (result > 0) {
            CF = true;
        }
        
        if (result > 2147483647 || result < -2147483648) {
            VF = true;
        }

        memoryManager.setFlags(ZF, NF, CF, VF);
        console.log('FLAGS mul');
        console.log('Memory Manager Flags', memoryManager.getFlags());

        //pruebas
        // Generar el cuádruplo para la instrucción MUL
        if (retornoDestino && retornoSource1 && retornoSource2) {
            gen.addQuadruple('MUL', retornoSource1.valor, retornoSource2.valor, null, null, null, retornoDestino.valor);
        } else {
            console.error('Error: Uno o más valores de retorno son undefined');
        }
    }

    getRetorno(node, env) {
        if (!node) return null;
        if (node._InsExpr) return node._InsExpr.execute(env);
        if (node.children && node.children.length > 0) {
            let child = node.children[0];
            if (child._InsExpr) return child._InsExpr.execute(env);
            if (child.children && child.children.length > 0) {
                return child.children[0]._InsExpr ? child.children[0]._InsExpr.execute(env) : null;
            }
        }
        return null;
    }
}
