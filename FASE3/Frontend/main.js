let activeTabId = 1; // Variable para almacenar la pestaña activa
let tabCount = 1; // Contador de pestañas
let nextTabId = 2; // Siguiente ID único para pestañas
Singleton.getInstance();


let startTime, endTime;

function startTimer() {
    startTime = new Date().getTime();
    document.getElementById('executionTimer').innerText = "0";
}

function stopTimer() {
    endTime = new Date().getTime();
    const timeDiff = endTime - startTime;
    document.getElementById('executionTimer').innerText = timeDiff;
}

function startAnalysis() {
    startTimer();
    analysis();
}

// Agregado para FASE 2
let quadTable, symbolTable, consoleResult;

function activarTab(unTab) {
    try {
        var id = unTab.id;
        if (id) {
            var numTab = parseInt(id.split("tabck-")[1]);
            activeTabId = numTab; // Actualiza la pestaña activa
            var esteTabDiv = document.getElementById("tabdiv-" + numTab);
            for (var i = 1; i < nextTabId; i++) {
                var tabdiv = document.getElementById("tabdiv-" + i);
                if (tabdiv) {
                    var tabck = document.getElementById("tabck-" + i);
                    if (tabdiv.id == esteTabDiv.id) {
                        tabdiv.style.display = "block";
                        tabck.style.color = "slategrey";
                        tabck.style.backgroundColor = "rgb(235, 235, 225)";
                        tabck.style.borderBottomColor = "rgb(235, 235, 225)";
                    } else {
                        tabdiv.style.display = "none";
                        tabck.style.color = "white";
                        tabck.style.backgroundColor = "gray";
                        tabck.style.borderBottomColor = "gray";
                    }
                }
            }
        }
    } catch (e) {
        alert("Error al activar una pestaña. " + e.message);
    }
}

function addTab() {
    const tabsHeader = document.getElementById('tabs-header');
    const tabsContent = document.getElementById('tabs-content');

    // Crear nueva pestaña
    const newTab = document.createElement('th');
    newTab.classList.add('tabck');
    newTab.id = `tabck-${nextTabId}`;
    newTab.onclick = function () { activarTab(this); };
    newTab.innerHTML = `Code ${tabCount + 1} <span onclick="event.stopPropagation(); closeTab(${nextTabId})" style="cursor: pointer;">&times;</span>`;
    tabsHeader.insertBefore(newTab, tabsHeader.lastElementChild);

    // Crear nuevo contenido de pestaña
    const newTabRow = document.createElement('tr');
    newTabRow.classList.add('filadiv');
    newTabRow.id = `tabrow-${nextTabId}`;
    newTabRow.innerHTML = `
        <td colspan="12">
            <div class="tabdiv col-lg-12 content" id="tabdiv-${nextTabId}" data-aos="fade-up" data-aos-delay="100">
                <div class="editor-container">
                    <div class="line-numbers" id="lineNumbers${nextTabId}"></div>
                    <textarea class="form-control tab-content" id="inputArea${nextTabId}" rows="10"></textarea>
                </div>
            </div>
        </td>
    `;
    tabsContent.parentNode.insertBefore(newTabRow, tabsContent.nextSibling);

    tabCount++;
    nextTabId++;
    activarTab(newTab);
    initializeEditor(`inputArea${nextTabId - 1}`);
}

function closeTab(index) {
    const tabToClose = document.getElementById(`tabck-${index}`);
    const tabContentToClose = document.getElementById(`tabrow-${index}`);

    if (tabToClose && tabContentToClose) {
        tabToClose.remove();
        tabContentToClose.remove();
    }

    // Activar una pestaña menor a la que se cerró o la primera pestaña si no existe una menor
    if (index <= activeTabId && tabCount > 1) {
        let newActiveTab = Math.max(1, index - 1);
        if (!document.getElementById(`tabck-${newActiveTab}`)) {
            newActiveTab = 1;
        }
        activarTab(document.getElementById(`tabck-${newActiveTab}`));
    } else if (tabCount > 1) {
        activarTab(document.getElementById(`tabck-1`));
    }
}

function initializeEditor(textareaId) {
    const textarea = document.getElementById(textareaId);
    const editorContainer = textarea.closest('.editor-container');
    const lineNumbers = editorContainer.querySelector('.line-numbers');

    function updateLineNumbers() {
        const lines = textarea.value.split('\n').length;
        let lineNumbersHTML = '';
        for (let i = 1; i <= lines; i++) {
            lineNumbersHTML += `<div>${i}</div>`;
        }
        lineNumbers.innerHTML = lineNumbersHTML;
    }

    function applySyntaxHighlighting() {
        const code = textarea.value;
        const highlightedCode = code.replace(/(const|let|var|function|return|if|else|for|while)/g, '<span class="keyword">$1</span>');
        const highlightContainer = document.createElement('div');
        highlightContainer.innerHTML = `<pre>${highlightedCode}</pre>`;
        highlightContainer.style.position = 'absolute';
        highlightContainer.style.top = '0';
        highlightContainer.style.left = '0';
        highlightContainer.style.pointerEvents = 'none';
        highlightContainer.style.width = '100%';
        highlightContainer.style.height = '100%';
        highlightContainer.style.whiteSpace = 'pre-wrap';
        highlightContainer.style.zIndex = '-1';
        editorContainer.insertBefore(highlightContainer, textarea);
    }

    textarea.addEventListener('input', function () {
        updateLineNumbers();
        applySyntaxHighlighting();
    });

    updateLineNumbers();
}

document.addEventListener('DOMContentLoaded', function () {
    initializeEditor('inputArea1');
    document.getElementById('fileInputButton').addEventListener('click', loadFile);
});

function Analizar() {
    const input = document.getElementById(`inputArea${activeTabId}`).value;
    const errorTableBody = document.getElementById('TBODY');

    // Remove previous error rows
    while (errorTableBody.firstChild) {
        errorTableBody.removeChild(errorTableBody.firstChild);
    }

    try {
        console.log("hola");
        const result = parser.parse(input);
        console.log(result);
        let dot = result.getDot(result);
        console.log(dot);
        const outputArea = document.getElementById('outputArea');
        outputArea.textContent = "Valid Code";
        outputArea.style.color = "#3cb500";  // Set text color to green for valid code
    } catch (error) {
        const outputArea = document.getElementById('outputArea');
        outputArea.textContent = "Invalid Code";
        outputArea.style.color = "red";  // Set text color to red for invalid code
        console.error(error);
        let errorType = "sintáctico";
        if (error.name === "SyntaxError") {
            errorType = "sintáctico";
        } else if (error.name === "LexicalError") { // assuming you have a LexicalError type defined
            errorType = "léxico";
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>1</td>
            <td>${error.message}</td>
            <td>${error.location ? error.location.start.line : '-'}</td>
            <td>${error.location ? error.location.start.column : '-'}</td>
            <td>${errorType}</td>
        `;
        errorTableBody.appendChild(row);
        document.getElementById('output').textContent = `Error: ${error.message}\n` +
            `Line: ${error.location ? error.location.start.line : '-'}, Column: ${error.location ? error.location.start.column : '-'}\n` +
            `Type: ${errorType}`;
    }
}

function Clear() {
    const inputArea = document.getElementById(`inputArea${activeTabId}`);
    inputArea.value = "";
    inputArea.rows = 3;  // Tamaño inicial de las filas

    document.getElementById("outputArea").innerText = "";
}

function download() {
    const inputArea = document.getElementById(`inputArea${activeTabId}`);
    if (inputArea) {
        const code = inputArea.value;
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Archivo.s";
        a.click();
        URL.revokeObjectURL(url); // Limpieza del objeto URL
    } else {
        console.error("No se pudo encontrar el elemento con id 'inputArea'");
    }
}

function loadFile() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt,.s'; // Limita a archivos .txt y .s
    fileInput.style.display = 'none';

    fileInput.onchange = function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const textarea = document.getElementById(`inputArea${activeTabId}`);
                textarea.value = e.target.result;
                // Actualizar la numeración de líneas y el resaltado de sintaxis
                initializeEditor(`inputArea${activeTabId}`);
            };
            reader.readAsText(file);
        }
    };

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
}

function CargarInfo() {
    const id = sessionStorage.ID;
    const tablita = document.querySelector('#TBODY');
    tablita.innerHTML = '';
    // Supongamos que tienes un array de resultados en sessionStorage
    const res = JSON.parse(sessionStorage.getItem('results')) || [];

    res.forEach((item, index) => {
        tablita.innerHTML += `
            <tr>
                <td><center>${item.usuario}</center></td>
                <td><center>${item.comentario}</center></td>
            </tr>
        `;
    });
}

document.getElementById('fileInputButton').addEventListener('click', loadFile);



function analysis() {
    const input = document.getElementById(`inputArea${activeTabId}`).value;
    const errorTableBody = document.getElementById('TBODY');
    const memoryManager = Singleton.getInstance();
    memoryManager.resetSingleton();
    console.log('memoryManager', memoryManager);

    // Remove previous error rows
    while (errorTableBody.firstChild) {
        errorTableBody.removeChild(errorTableBody.firstChild);
    }

    // quadTable = newDataTable('quadTable',
    //     [{data: "Op"}, {data: "Arg1"}, {data: "Arg2"}, {data: "Arg3"}, {data: "Arg4"}, {data: "Arg5"}, {data: "Result"}],
    //     []);
    // const text = document.getElementById(`inputArea${activeTabId}`).value;
    // const errorTableBody = document.getElementById('TBODY');

    // clearRemoveTableError(errorTableBody);
    // clearQuadTable();

    try {
        // Creando entorno global
        let env = new Environment(null, 'Global');
        // Creando generador
        let gen = new Generator();
        // Obteniendo árbol
        let result = parser.parse(input);
        // Ejecutando instrucciones
        RootExecuter(result, env, gen, memoryManager);

        // Generando gráfica
        let astDot = result.getDot(result);

        //console.log("Tabla de símbolos: " + astDot);

        var codigodot = astDot;
        d3.select("#lienzo1").graphviz()
            .renderDot(codigodot)

        console.log("Cuadruplos: ");
        console.log(gen.getQuadruples());

        const quadruples = gen.getQuadruples();

        // Limpiar la tabla antes de agregar nuevos cuádruplos
        const table = document.getElementById('quadTable').getElementsByTagName('tbody')[0];
        table.innerHTML = '';

        // Agregar cada cuádruplo a la tabla
        let rowIndex = 0;

        // Agregar cada cuádruplo a la tabla con su índice
        quadruples.forEach(quad => {
            addQuadToTable(quad, rowIndex);
            rowIndex++;
        });


        // Generando cuádruplos
        //addDataToQuadTable(gen.getQuadruples());

        // Agregando salida válida en consola
        //consoleResult.setValue("VALIDO");
        const outputArea = document.getElementById('outputArea');
        outputArea.textContent = "Valid Code";
        outputArea.style.color = "#3cb500";  // Set text color to green for valid code
    } catch (error) {
        const outputArea = document.getElementById('outputArea');
        outputArea.textContent = "Invalid Code";
        outputArea.style.color = "red";  // Set text color to red for invalid code
        console.error(error);
        let errorType = "Semantico";
        if (isLexicalError(error)) {
            errorType = "léxico";
        } else if (isSintacticError(error.message)) {
            errorType = "sintáctico";
        }
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>1</td>
            <td>${error.message}</td>
            <td>${error.location ? error.location.start.line : '-'}</td>
            <td>${error.location ? error.location.start.column : '-'}</td>
            <td>${errorType}</td>
        `;
        errorTableBody.appendChild(row);
        document.getElementById('output').textContent = `Error: ${error.message}\n` +
            `Line: ${error.location ? error.location.start.line : '-'}, Column: ${error.location ? error.location.start.column : '-'}\n` +
            `Type: ${errorType}`;
    }
    finally {
        stopTimer();
    }
}

function clearQuadTable() {
    quadTable.clear().draw();
}

function clearRemoveTableError(errorTableBody) {
    while (errorTableBody.firstChild) {
        errorTableBody.removeChild(errorTableBody.firstChild);
    }
}

function newDataTable(id, columns, data) {
    let result = document.getElementById(id).DataTable({
        responsive: true,
        lengthMenu: [[15, 25, 50, -1], [15, 25, 50, "All"]],
        "lengthChange": true,
        data,
        columns
    });
    $('select').formSelect();
    return result;
}

// try {
//     const result =
//     const outputArea = document.getElementById('outputArea');
//     outputArea.textContent = "Valid Code";
//     outputArea.style.color = "#3cb500";  // Set text color to green for valid code
// } catch (error) {
//     const outputArea = document.getElementById('outputArea');
//     outputArea.textContent = "Invalid Code";
//     outputArea.style.color = "red";  // Set text color to red for invalid code
//     console.error(error);
//     let errorType = "sintáctico";
//     if (error.name === "SyntaxError") {
//         errorType = "sintáctico";
//     } else if (error.name === "LexicalError") { // assuming you have a LexicalError type defined
//         errorType = "léxico";
//     }

//     const row = document.createElement('tr');
//     row.innerHTML = `
//         <td>1</td>
//         <td>${error.message}</td>
//         <td>${error.location ? error.location.start.line : '-'}</td>
//         <td>${error.location ? error.location.start.column : '-'}</td>
//         <td>${errorType}</td>
//     `;
//     errorTableBody.appendChild(row);
//     document.getElementById('output').textContent = `Error: ${error.message}\n` +
//         `Line: ${error.location ? error.location.start.line : '-'}, Column: ${error.location ? error.location.start.column : '-'}\n` +
//         `Type: ${errorType}`;
// }



function isLexicalError(e) {
    const validIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
    const validInteger = /^[0-9]+$/;
    const validRegister = /^[a-zA-Z][0-9]+$/;
    const validCharacter = /^[a-zA-Z0-9_$,\[\]#"]$/;
    if (e.found) {
        if (!validIdentifier.test(e.found) &&
            !validInteger.test(e.found) &&
            !validRegister.test(e.found) &&
            !validCharacter.test(e.found)) {
            return true; // Error léxico
        }
    }
    return false; // Error sintáctico
}


function isSintacticError(texto) {
    const cadenaBuscada = "Expected \":\" or Ignorado but";
    return texto.startsWith(cadenaBuscada);
}