let activeTabId = 1; // Variable para almacenar la pestaña activa
let tabCount = 1; // Contador de pestañas
let nextTabId = 2; // Siguiente ID único para pestañas

function activarTab(unTab) {
    try {
        var id = unTab.id;
        if (id) {
            var numTab = parseInt(id.split("tabck-")[1]);
            activeTabId = numTab; // Actualiza la pestaña activa
            //alert("Pestaña activa " + activeTabId );
            // Las "tabdiv" son los bloques interiores mientras que los "tabck"
            // son las pestañas.
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
    newTab.onclick = function() { activarTab(this); };
    newTab.innerHTML = `Code ${tabCount + 1} <span onclick="event.stopPropagation(); closeTab(${nextTabId})" style="cursor: pointer;">&times;</span>`;
    tabsHeader.insertBefore(newTab, tabsHeader.lastElementChild);

    // Crear nuevo contenido de pestaña
    const newTabRow = document.createElement('tr');
    newTabRow.classList.add('filadiv');
    newTabRow.id = `tabrow-${nextTabId}`;
    newTabRow.innerHTML = `
        <td colspan="12">
            <div class="tabdiv col-lg-12 content" id="tabdiv-${nextTabId}" data-aos="fade-up" data-aos-delay="100">
              <textarea class="form-control tab-content" id="inputArea${nextTabId}" rows="10"></textarea>
            </div>
        </td>
    `;
    tabsContent.parentNode.insertBefore(newTabRow, tabsContent.nextSibling);

    tabCount++;
    nextTabId++;
    activarTab(newTab);
}

function closeTab(index) {
    const tabToClose = document.getElementById(`tabck-${index}`);
    const tabContentToClose = document.getElementById(`tabrow-${index}`);
    
    if (tabToClose && tabContentToClose) {
        tabToClose.remove();
        tabContentToClose.remove();
    }

    // Reorganizar números de pestañas y contenidos
    /*const tabs = document.querySelectorAll('.tabck');
    const tabContents = document.querySelectorAll('.filadiv');

    let currentTabNum = 1;

    tabs.forEach((tab) => {
        const id = parseInt(tab.id.split("tabck-")[1]);
        tab.innerHTML = `Code ${currentTabNum} <span onclick="event.stopPropagation(); closeTab(${id})" style="cursor: pointer;">&times;</span>`;
        currentTabNum++;
    });

    tabCount = tabs.length; // Actualizar el contador de pestañas*/

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

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar la primera pestaña
    activarTab(document.getElementById('tabck-1'));
});



function Analizar() {
    const input = document.getElementById('inputArea1').value;
    const errorTableBody = document.getElementById('TBODY');
  
    // Remove previous error rows
    while (errorTableBody.firstChild) {
      errorTableBody.removeChild(errorTableBody.firstChild);
    }
  
    try {
      const result = parser.parse(input);
      document.getElementById('outputArea').textContent = "Valid Code";
    } catch (error) {
      document.getElementById('outputArea').textContent = "Invalid Code";
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
    document.getElementById(`inputArea${activeTabId}`).value = "";
    document.getElementById("outputArea").innerText = "";
}

function download() {
    const code = document.getElementById("outputArea").innerText;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.json";
    a.click();
}

function loadFile() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt,.s'; // Limita a archivos .txt y .s
    fileInput.style.display = 'none';
    fileInput.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById(`inputArea${activeTabId}`).textContent = e.target.result;
            };
            reader.readAsText(file);
        }
    };
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
}

function CargarInfo() {
    var id=sessionStorage.ID
    var tablita = document.querySelector('#TBODY')
    tablita.innerHTML= ` `
    tablita.innerHTML +=
                    `
                <tr>
                    <th><center>${res[i].usuario}</center></th>
                    <th><center>${res[i].comentario}</center></th>
                </tr>
                    `
            
}
        

document.getElementById('fileInputButton').addEventListener('click', loadFile);


