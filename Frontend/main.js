
let activeTabId = 0;//Pestaña activa

function Analizar() {
    const code = document.getElementById(`inputArea${activeTabId}`).value;
    try {
        let resultado = parser.parse(code);
        document.getElementById("outputArea").innerText = JSON.stringify(resultado, null, 2);
    } catch (error) {
        document.getElementById("outputArea").innerText = "Error: " + error.message;
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



/**
 * Multiple pestaña
 */


function activarTab(unTab) {
    try {
        var id = unTab.id;
        if (id){
            var tr = unTab.parentNode || unTab.parentElement;
            var tbody = tr.parentNode || tr.parentElement;
            var table = tbody.parentNode || tbody.parentElement;
            // Pestañas en varias filas
            if (table.getAttribute("data-filas") != null){
                var filas = tbody.getElementsByTagName("tr");
                var filaDiv = filas[filas.length - 1];
                tbody.insertBefore(tr, filaDiv);
            }

            var desde = table.getAttribute("data-min");
            if (desde == null) desde = 0;
            var hasta = table.getAttribute("data-max");
            if (hasta == null) hasta = 2; 

            var idTab = id.split("tabck-");
            var numTab = parseInt(idTab[1]);
            activeTabId = numTab;
            var esteTabDiv = document.getElementById("tabdiv-" + numTab);
            for (var i = desde; i <= hasta; i++) {
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

window.onload = function() {
    activarTab(document.getElementById('tabck-0'));
};
