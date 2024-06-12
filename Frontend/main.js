function Analizar() {
    const code = document.getElementById("inputArea").value;
    try {
        let resultado = parser.parse(code);
        document.getElementById("outputArea").innerText = JSON.stringify(resultado, null, 2);
    } catch (error) {
        document.getElementById("outputArea").innerText = "Error: " + error.message;
    }
}


function Clear() {
    document.getElementById("inputArea").value = "";
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
                document.getElementById('inputArea').textContent = e.target.result;
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