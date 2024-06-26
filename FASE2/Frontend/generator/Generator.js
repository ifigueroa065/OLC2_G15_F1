class Generator {

    constructor() {
        this.code = '';
        this.temporal = 0;
        this.quadruples = [];
    }

    newTemp(){
        let temp = this.temporal;
        this.temporal++;
        return `t${temp}`;
    }

    addQuadruple(op, arg1, arg2, arg3, arg4, arg5, res) {
        // Creando cuadruplo
        let quad = new Quadruples();
        // Agregando los valores
        quad.setOperator(op);
        quad.setArg1(arg1);
        quad.setArg2(arg2);
        quad.setArg3(arg3);
        quad.setArg4(arg4);
        quad.setArg5(arg5);
        quad.setResult(res);
        // Guardar registro
        this.quadruples.push(quad);
    }

    getQuadruples(){
        return this.quadruples;
    }


}

function addQuadToTable(quad,rowIndex) {
    const table = document.getElementById('quadTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Inserta las celdas en el orden correcto
    const index = newRow.insertCell(0);
    const cellOp = newRow.insertCell(1);
    const cellArg1 = newRow.insertCell(2);
    const cellArg2 = newRow.insertCell(3);
    const cellArg3 = newRow.insertCell(4);
    const cellArg4 = newRow.insertCell(5);
    const cellArg5 = newRow.insertCell(6);
    const cellResult = newRow.insertCell(7);

    // Asigna los valores a las celdas en el orden correcto
    index.innerHTML = rowIndex+1;
    cellOp.innerHTML = quad.op;
    cellArg1.innerHTML = quad.arg1;
    cellArg2.innerHTML = quad.arg2;
    cellArg3.innerHTML = quad.arg3;
    cellArg4.innerHTML = quad.arg4;
    cellArg5.innerHTML = quad.arg5;
    cellResult.innerHTML = quad.res;
}

