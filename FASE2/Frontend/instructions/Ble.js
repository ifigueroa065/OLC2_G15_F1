class Ble extends Instruction {
    constructor(label, line, col) {
        super();
        this.label = label;
        this.line = line;
        this.col = col;
    }

    execute(env, gen) {
        console.log('Executing Ble');
        console.log('label', this.label);

        // Obtener el valor de la etiqueta
        let retornoLabel = this.label._InsExpr?.execute(env);

        // Asegurarse de que el valor de retorno no sea undefined
        let valorLabel = retornoLabel ? retornoLabel.valor : null;

        console.log('valorLabel', valorLabel);

        // Realizar la lógica de generación de cuádruplos
        if (valorLabel) {
            gen.addQuadruple('BLE', '-', '-', '-', '-', '-', valorLabel);
        } else {
            console.error('Error generating quadruple: Missing label value');
        }
    }
}
