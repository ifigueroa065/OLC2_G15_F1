class Cmp extends Instruction{
    constructor(source1, source2, line, column) {
        super();
        this.source1 = source1;
        this.source2 = source2;
        this.line = line;
        this.column = column;
        
    }

    execute(env, gen) {
        console.log('Executing CMP');
        console.log('Source 1', this.source1);
        console.log('Source 2', this.source2);

        const memoryManager = Singleton.getInstance();
        //flags
        memoryManager.setResetFlags();
        let ZF = false;
        let NF = false;
        let CF = false;
        let VF = false;

        // Implementar lógica de instrucción CMP básicamente.
        let retornoSource1 = this.source1?.execute(env);
        let retornoSource2 = this.source2?.execute(env);
        
        console.log('RETORNOS CMP');
        console.log('retornoSource1', retornoSource1);
        console.log('retornoSource2', retornoSource2);

        // el CMP básicamente hace un resta y dependiendo del resultado se setean los flags.
        // CMP R1, R2
        // R1 - R2
        // Z = 1 si el resultado es 0
        // N = 1 si el resultado es negativo
        // C = 1 si el resultado es positivo
        // V = 1 si el resultado es overflow
        let valueRegister = memoryManager.getData('registers', retornoSource1.valor);
        let result = valueRegister - parseInt(retornoSource2.valor);
        console.log('Resultado CMP', result);
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
        console.log('FLAGS CMP');
        console.log('Memory Manager Flags', memoryManager.getFlags());
        
        // 3.2. Realizar la lógica de generación de Quadruples
        gen.addQuadruple('CMP', retornoSource1.valor, retornoSource2.valor,'-', '-', '-', 'Comparacion');
    }
}